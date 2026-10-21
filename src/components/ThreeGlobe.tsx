import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Destination } from '../types/travel';
import { Compass, RotateCw, Sparkles } from 'lucide-react';

interface ThreeGlobeProps {
  destinations: Destination[];
  selectedId: string;
  onSelectDestination: (dest: Destination) => void;
}

export const ThreeGlobe: React.FC<ThreeGlobeProps> = ({
  destinations,
  selectedId,
  onSelectDestination,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const globeGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 2.0;

    // 1. Globe Core Sphere
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x0f172a, // dark slate
      emissive: 0x030712,
      specular: 0x38bdf8,
      shininess: 25,
      transparent: true,
      opacity: 0.96,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globeMesh);

    // 2. Graticule / Wireframe lines for high-tech geospatial look
    const wireframeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.002, 24, 24);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globeGroup.add(wireframeMesh);

    // 3. Glowing Atmosphere Shield
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 48, 48);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 0.8);
    dirLight2.position.set(-5, -3, -5);
    scene.add(dirLight2);

    // Helper: Convert Lat/Lng to Vector3 on Sphere
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 5. Markers for each destination
    const markerMeshes: { mesh: THREE.Mesh; dest: Destination }[] = [];

    destinations.forEach((dest) => {
      const pos = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS);
      const isSelected = dest.id === selectedId;

      // Pin Pillar
      const pinGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.15, 8);
      pinGeom.translate(0, 0.075, 0);
      pinGeom.rotateX(Math.PI / 2);
      const pinMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0xec4899 : 0x38bdf8,
      });
      const pin = new THREE.Mesh(pinGeom, pinMat);
      pin.position.copy(pos);
      pin.lookAt(new THREE.Vector3(0, 0, 0));
      pin.rotateY(Math.PI);
      globeGroup.add(pin);

      // Marker Head
      const markerGeom = new THREE.SphereGeometry(isSelected ? 0.065 : 0.045, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0xf43f5e : 0x06b6d4,
      });
      const marker = new THREE.Mesh(markerGeom, markerMat);
      const elevatedPos = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS + 0.12);
      marker.position.copy(elevatedPos);
      (marker as any).userData = { destination: dest };
      globeGroup.add(marker);

      // Pulse Ring around marker
      const ringGeom = new THREE.RingGeometry(0.05, 0.08, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0xf43f5e : 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isSelected ? 0.9 : 0.4,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.01));
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);

      markerMeshes.push({ mesh: marker, dest });
    });

    // 6. Flight Arcs between major hubs
    const connections = [
      ['tokyo', 'paris'],
      ['paris', 'newyork'],
      ['newyork', 'bali'],
      ['reykjavik', 'paris'],
      ['cairo', 'capetown'],
      ['sydney', 'tokyo'],
    ];

    connections.forEach(([idA, idB]) => {
      const destA = destinations.find((d) => d.id === idA);
      const destB = destinations.find((d) => d.id === idB);
      if (!destA || !destB) return;

      const pA = latLngToVector3(destA.lat, destA.lng, GLOBE_RADIUS);
      const pB = latLngToVector3(destB.lat, destB.lng, GLOBE_RADIUS);

      // Compute mid-point elevated in the air
      const mid = pA.clone().add(pB).multiplyScalar(0.5);
      const distance = pA.distanceTo(pB);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
      const points = curve.getPoints(40);
      const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const curveMaterial = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.35,
      });
      const arc = new THREE.Line(curveGeometry, curveMaterial);
      globeGroup.add(arc);
    });

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast against markers
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markerMeshes.map((m) => m.mesh));
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const dest = (hit.userData as any)?.destination;
        if (dest) {
          setHoveredDest(dest);
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        setHoveredDest(null);
        renderer.domElement.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      }

      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      // Clamp vertical tilt
      globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      renderer.domElement.style.cursor = 'grab';
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markerMeshes.map((m) => m.mesh));
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const dest = (hit.userData as any)?.destination;
        if (dest) {
          onSelectDestination(dest);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domEl.addEventListener('click', handleClick);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isRotating && !isDraggingRef.current) {
        globeGroup.rotation.y += 0.0022;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domEl.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, [destinations, selectedId, isRotating, onSelectDestination]);

  return (
    <div className="relative w-full h-[460px] md:h-[540px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Control HUD */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-medium rounded-full shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          WebGL 3D Earth Experience
        </span>
        <button
          onClick={() => setIsRotating((prev) => !prev)}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-md border border-slate-700 text-slate-200 text-xs rounded-full transition-colors"
          title="Toggle Auto Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          {isRotating ? 'Auto-Orbit On' : 'Paused'}
        </button>
      </div>

      {/* Instruction Badge */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none text-xs text-slate-400 bg-slate-950/70 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800">
        <span className="text-cyan-400 font-semibold">Tip:</span> Drag globe to rotate • Click pin markers to load destination intelligence
      </div>

      {/* Quick Destination Pill Selector */}
      <div className="absolute top-4 right-4 z-10 flex flex-wrap max-w-xs justify-end gap-1.5">
        {destinations.slice(0, 5).map((d) => (
          <button
            key={d.id}
            onClick={() => onSelectDestination(d)}
            className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
              d.id === selectedId
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/30'
                : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-cyan-500/50'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Hover Info Tooltip */}
      {hoveredDest && (
        <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 rounded-xl p-3 shadow-2xl max-w-xs text-left animate-fadeIn">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-slate-100 text-sm">{hoveredDest.name}, {hoveredDest.country}</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700">
              Safety {hoveredDest.safetyScore}/100
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{hoveredDest.description}</p>
          <div className="mt-2 text-[11px] text-cyan-400 font-medium">Click marker to inspect destination</div>
        </div>
      )}
    </div>
  );
};
