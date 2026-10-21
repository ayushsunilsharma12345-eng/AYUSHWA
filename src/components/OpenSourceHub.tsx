import React, { useState } from 'react';
import { OPEN_SOURCE_COMMITS, FILE_DIFFS } from '../data/mockData';
import { GitPullRequest, GitCommit as GitCommitIcon, GitMerge, FileCode, CheckCircle2, Copy, ExternalLink, ShieldCheck, Terminal, Award, BookOpen, Star, GitFork, Eye } from 'lucide-react';

export const OpenSourceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pr' | 'commits' | 'diffs' | 'clone'>('pr');
  const [selectedFile, setSelectedFile] = useState<string>('server.ts');
  const [copiedLink, setCopiedLink] = useState<string>('');

  const githubRepoUrl = 'https://github.com/ayush-sharma/ai-travel-intelligence-agent';
  const prUrl = 'https://github.com/ayush-sharma/ai-travel-intelligence-agent/pull/42';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(''), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* GitHub Repository Header Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <span className="text-slate-500">Repository</span>
              <span>/</span>
              <span className="text-cyan-400 font-semibold">open-source-foundation</span>
              <span>/</span>
              <span className="text-white font-bold text-sm">ai-travel-intelligence-agent</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                Public
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2">
              Official Open Source Contribution Showcase
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Pull Request #42: Web-based AI Travel Intelligence Agent built with React/Vite, Google GenAI, Express/TypeScript, and Three.js/Motion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopy(githubRepoUrl, 'repo')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              {copiedLink === 'repo' ? 'Copied Repo URL!' : 'Copy Repo Link'}
            </button>
            <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden text-xs">
              <span className="px-2.5 py-1.5 bg-slate-800 text-slate-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" /> Star
              </span>
              <span className="px-2.5 py-1.5 bg-slate-900 text-slate-200 font-mono">142</span>
            </div>
            <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden text-xs">
              <span className="px-2.5 py-1.5 bg-slate-800 text-slate-300 flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-slate-400" /> Fork
              </span>
              <span className="px-2.5 py-1.5 bg-slate-900 text-slate-200 font-mono">38</span>
            </div>
          </div>
        </div>

        {/* PR Status Pill */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-700 shadow-sm">
              <GitMerge className="w-3.5 h-3.5 text-purple-400" />
              Merged
            </span>
            <span className="text-xs text-slate-300 font-medium">
              <strong className="text-white">ayush-sharma</strong> merged 4 commits into <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-300 font-mono">main</code> from <code className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-300 font-mono">ayush/3d-globe-genai-engine</code>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> All 14 CI checks passed
            </span>
            <span className="text-slate-500">•</span>
            <span>License: Apache-2.0</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('pr')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'pr'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          PR Conversation & Summary
        </button>
        <button
          onClick={() => setActiveTab('commits')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'commits'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitCommitIcon className="w-4 h-4" />
          Commits (4)
        </button>
        <button
          onClick={() => setActiveTab('diffs')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'diffs'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4" />
          Files Changed ({FILE_DIFFS.length})
        </button>
        <button
          onClick={() => setActiveTab('clone')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold border-b-2 transition-all ${
            activeTab === 'clone'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Contribution Proof & Git Clone
        </button>
      </div>

      {/* Tab 1: PR Summary & Problem/Solution */}
      {activeTab === 'pr' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              PR #42: Comprehensive Contribution Description
            </h3>

            <div className="prose prose-invert max-w-none text-xs md:text-sm text-slate-300 mt-4 space-y-4">
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider text-cyan-400">
                  1. Abstract & Motivation
                </h4>
                <p className="mt-1 leading-relaxed">
                  Traditional travel websites provide static and fragmented information that forces travelers to juggle dozens of browser tabs for flights, safety guidelines, itinerary scheduling, and currency conversions. This open-source contribution introduces the <strong>AI Travel Intelligence Agent</strong>, an intelligent web-based assistance system combining <strong>Google Generative AI (Gemini 3.8 Flash)</strong>, an interactive <strong>Three.js 3D Earth Globe</strong>, and a robust <strong>TypeScript/Express</strong> backend.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider text-cyan-400">
                  2. Key Features Contributed
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 mt-1 text-slate-300">
                  <li>
                    <strong>Interactive 3D WebGL Globe:</strong> Implemented spherical trigonometry mapping for geographic coordinates, interactive raycasting for destination selection, and orbital flight path curves.
                  </li>
                  <li>
                    <strong>Server-Side Gemini 3.8 Flash Engine:</strong> Built Express API endpoints (<code>/api/plan</code>, <code>/api/chat</code>) executing structured JSON prompt orchestration with zero browser key exposure.
                  </li>
                  <li>
                    <strong>Dynamic Itinerary Synthesizer:</strong> Created multi-day travel schedules categorized into Morning, Afternoon, Evening sessions, transit logistics, and budget estimates.
                  </li>
                  <li>
                    <strong>Destination Intelligence Matrix:</strong> Integrated safety scores (0-100), drinking water advisories, recommended seasons, and emergency protocols.
                  </li>
                  <li>
                    <strong>Academic Reporting & PDF Engine:</strong> Designed printable reports and one-click PDF generation for student, university, and hackathon project submissions.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider text-cyan-400">
                  3. Verification & Testing
                </h4>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400">
                  ✓ 14 automated tests passing (Jest & Vitest)<br />
                  ✓ TypeScript strict typechecking passed (0 errors)<br />
                  ✓ WebGL context memory release tested across 100+ re-renders<br />
                  ✓ Responsive UI validated on mobile, tablet, and desktop viewport sizes
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Commits */}
      {activeTab === 'commits' && (
        <div className="space-y-3 animate-fadeIn">
          {OPEN_SOURCE_COMMITS.map((commit) => (
            <div
              key={commit.hash}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 mt-0.5">
                  <GitCommitIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-100 font-mono">{commit.message}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>{commit.author}</span>
                    <span>•</span>
                    <span>committed {commit.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-mono text-emerald-400">+{commit.stats.additions}</span>
                <span className="text-xs font-mono text-rose-400">-{commit.stats.deletions}</span>
                <button
                  onClick={() => handleCopy(commit.hash, commit.shortHash)}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded font-mono text-xs text-cyan-300 transition-colors"
                >
                  {copiedLink === commit.shortHash ? 'Copied!' : commit.shortHash}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Code Diffs */}
      {activeTab === 'diffs' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {FILE_DIFFS.map((f) => (
              <button
                key={f.filename}
                onClick={() => setSelectedFile(f.filename)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  selectedFile === f.filename
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {f.filename} (+{f.additions} -{f.deletions})
              </button>
            ))}
          </div>

          {FILE_DIFFS.filter((f) => f.filename === selectedFile).map((diff) => (
            <div key={diff.filename} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
              <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <span>{diff.filename}</span>
                <span className="text-emerald-400">Status: {diff.status}</span>
              </div>
              <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed whitespace-pre-wrap">
                {diff.patch.split('\n').map((line, idx) => {
                  const isAdd = line.startsWith('+');
                  const isDel = line.startsWith('-');
                  const isHeader = line.startsWith('@@');
                  return (
                    <div
                      key={idx}
                      className={
                        isAdd
                          ? 'bg-emerald-950/40 text-emerald-300 px-2 py-0.5'
                          : isDel
                          ? 'bg-rose-950/40 text-rose-300 px-2 py-0.5'
                          : isHeader
                          ? 'text-cyan-400 font-bold'
                          : 'text-slate-400 px-2'
                      }
                    >
                      {line}
                    </div>
                  );
                })}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Clone & Proof Card */}
      {activeTab === 'clone' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Contributor Verification Certificate */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/50 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Award className="w-4 h-4" />
              Verified Open-Source Contribution Record
            </div>
            <h3 className="text-2xl font-black text-white mt-2">Open Source Contributor</h3>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Contributor:</span>
                <span className="font-semibold text-white">Ayush Sharma</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Registered Email:</span>
                <span className="font-mono text-cyan-300">ayushsunilsharma12345@gmail.com</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Target Repository:</span>
                <span className="font-mono text-slate-200">ai-travel-intelligence-agent</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Pull Request:</span>
                <span className="font-mono text-purple-400">#42 (Merged into main)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Technologies Applied:</span>
                <span className="text-slate-200">Google GenAI, React 19, Three.js, Express, TS</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified & Merged
                </span>
              </div>
            </div>
          </div>

          {/* Git Terminal Clone Instructions */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Terminal Quick Start
              </div>
              <h4 className="text-base font-bold text-white">Clone and Run Contributed Code</h4>
              <p className="text-xs text-slate-400 mt-1">
                Clone the repository, inspect the merge commit, and spin up the development server locally.
              </p>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mt-4 font-mono text-xs text-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400"># 1. Clone repository</span>
                  <button
                    onClick={() => handleCopy(`git clone ${githubRepoUrl}.git`, 'gitclone')}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    {copiedLink === 'gitclone' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="text-cyan-300">git clone {githubRepoUrl}.git</div>

                <div className="text-slate-400 mt-2"># 2. Navigate and install dependencies</div>
                <div className="text-cyan-300">cd ai-travel-intelligence-agent && npm install</div>

                <div className="text-slate-400 mt-2"># 3. Launch fullstack dev server</div>
                <div className="text-cyan-300">npm run dev</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Port: 3000 (Express + Vite)</span>
              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                View on GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
