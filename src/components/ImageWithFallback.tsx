import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'tokyo' | 'paris' | 'bali' | 'reykjavik' | 'newyork' | 'hero' | 'general';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'general',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (retryCount === 0 && currentSrc) {
      // First retry: swap between /images/ and /src/assets/images/
      setRetryCount(1);
      if (currentSrc.startsWith('/images/')) {
        const filename = currentSrc.split('/').pop() || '';
        // Map to timestamped file in /src/assets/images/ if needed
        const map: Record<string, string> = {
          'tokyo_destination.jpg': '/src/assets/images/tokyo_destination_1792583816197.jpg',
          'paris_destination.jpg': '/src/assets/images/paris_destination_1792583817332.jpg',
          'bali_destination.jpg': '/src/assets/images/bali_destination_1792583817842.jpg',
          'reykjavik_destination.jpg': '/src/assets/images/reykjavik_destination_1792583818339.jpg',
          'travel_hero_banner.jpg': '/src/assets/images/travel_hero_banner_1792583815200.jpg',
        };
        setCurrentSrc(map[filename] || currentSrc.replace('/images/', '/src/assets/images/'));
        return;
      } else if (currentSrc.includes('/src/assets/images/')) {
        const filename = currentSrc.split('/').pop() || '';
        const cleanName = filename.replace(/_\d+\.jpg$/, '.jpg');
        setCurrentSrc(`/images/${cleanName}`);
        return;
      }
    }

    // If both failed, switch to rich stylized vector illustration fallback
    setHasError(true);
  };

  if (hasError || !currentSrc) {
    return <ScenicArtworkFallback type={fallbackType} alt={alt || 'Destination Artwork'} className={className} />;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
};

// High-fidelity SVG & gradient panoramic artwork that renders instantly with 0 external network requests
const ScenicArtworkFallback: React.FC<{ type: string; alt: string; className: string }> = ({
  type,
  alt,
  className,
}) => {
  switch (type) {
    case 'tokyo':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="tokyoSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="60%" stopColor="#4c1d95" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#tokyoSky)" />
            {/* Mt. Fuji Silhouette */}
            <polygon points="120,230 200,120 280,230" fill="#312e81" opacity="0.7" />
            <polygon points="175,155 200,120 225,155 210,165 200,158 190,165" fill="#f8fafc" opacity="0.9" />
            {/* Tokyo Tower & Neon Skyline */}
            <rect x="30" y="190" width="40" height="90" fill="#0f172a" />
            <rect x="90" y="180" width="35" height="100" fill="#0f172a" />
            <rect x="290" y="170" width="45" height="110" fill="#0f172a" />
            <rect x="345" y="195" width="30" height="85" fill="#0f172a" />
            {/* Tokyo Tower Lattice */}
            <polygon points="250,260 258,140 262,140 270,260" fill="#ef4444" />
            <line x1="260" y1="140" x2="260" y2="110" stroke="#ef4444" strokeWidth="2" />
            <circle cx="260" cy="110" r="3" fill="#fbbf24" />
            {/* Neon reflection water line */}
            <rect x="0" y="260" width="400" height="40" fill="#090d16" />
            <line x1="20" y1="275" x2="100" y2="275" stroke="#f43f5e" strokeWidth="1.5" opacity="0.6" />
            <line x1="220" y1="278" x2="300" y2="278" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'paris':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950 via-rose-950 to-slate-950 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="parisSunset" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c2d12" />
                <stop offset="50%" stopColor="#be185d" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#parisSunset)" />
            {/* Eiffel Tower Silhouette */}
            <polygon points="180,240 196,80 204,80 220,240" fill="#18181b" />
            <line x1="200" y1="80" x2="200" y2="40" stroke="#18181b" strokeWidth="3" />
            <rect x="188" y="150" width="24" height="6" fill="#18181b" />
            <rect x="192" y="105" width="16" height="4" fill="#18181b" />
            <path d="M 185,240 Q 200,210 215,240" fill="#fbbf24" opacity="0.4" />
            {/* Seine River with reflections */}
            <path d="M 0,240 Q 200,230 400,245 L 400,300 L 0,300 Z" fill="#0f172a" />
            <circle cx="200" cy="40" r="4" fill="#fef08a" opacity="0.8" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'bali':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="baliMist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="60%" stopColor="#047857" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#baliMist)" />
            {/* Terraced curves */}
            <path d="M 0,200 Q 150,170 400,220 L 400,300 L 0,300 Z" fill="#065f46" />
            <path d="M 0,230 Q 220,200 400,250 L 400,300 L 0,300 Z" fill="#047857" />
            {/* Balinese Candi Bentar Split Gate */}
            <polygon points="160,190 170,120 185,130 185,190" fill="#0f172a" />
            <polygon points="215,190 215,130 230,120 240,190" fill="#0f172a" />
            {/* Sun Rays */}
            <circle cx="200" cy="100" r="30" fill="#fef3c7" opacity="0.6" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'reykjavik':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="aurora" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#022c22" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="80%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="#020617" />
            {/* Glowing Aurora Ribbons */}
            <path d="M 0,80 Q 120,20 220,70 T 400,40 L 400,160 Q 300,100 200,140 T 0,120 Z" fill="url(#aurora)" opacity="0.65" filter="blur(4px)" />
            <path d="M 0,100 Q 160,50 260,110 T 400,80 L 400,180 Q 280,120 180,160 T 0,140 Z" fill="#34d399" opacity="0.3" filter="blur(6px)" />
            {/* Snowy Mountains */}
            <polygon points="40,240 130,170 210,240" fill="#1e293b" />
            <polygon points="110,185 130,170 150,185" fill="#f8fafc" />
            <polygon points="180,240 270,160 360,240" fill="#0f172a" />
            <polygon points="250,178 270,160 290,178" fill="#f8fafc" />
            {/* Lagoon water */}
            <rect x="0" y="240" width="400" height="60" fill="#0369a1" opacity="0.4" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );

    case 'hero':
    default:
      return (
        <div className={`relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 600 300" className="w-full h-full object-cover opacity-60">
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect width="600" height="300" fill="#030712" />
            {/* Digital Grid Lines */}
            <line x1="0" y1="200" x2="600" y2="200" stroke="#1e293b" strokeWidth="1" />
            <line x1="0" y1="240" x2="600" y2="240" stroke="#1e293b" strokeWidth="1" />
            {/* Glowing 3D globe outline */}
            <circle cx="450" cy="150" r="90" stroke="url(#heroGrad)" strokeWidth="2" fill="none" opacity="0.8" />
            <ellipse cx="450" cy="150" rx="90" ry="35" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.5" />
            <ellipse cx="450" cy="150" rx="40" ry="90" stroke="#818cf8" strokeWidth="1.5" fill="none" opacity="0.5" />
            {/* Flight Arc */}
            <path d="M 120,180 Q 280,60 450,150" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="120" cy="180" r="4" fill="#f43f5e" />
            <circle cx="450" cy="150" r="4" fill="#38bdf8" />
          </svg>
          <span className="sr-only">{alt}</span>
        </div>
      );
  }
};
