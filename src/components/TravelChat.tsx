import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/travel';
import { Send, Bot, User, Sparkles, Loader2, Compass } from 'lucide-react';

const CHAT_MODEL = 'gemini-3.1-flash-lite';

const createWelcomeMessage = (destination?: string): ChatMessage => ({
  id: 'init-1',
  role: 'assistant',
  content: `Hello! I am your AI Travel Intelligence Agent. Ask me anything about ${
    destination || 'global destinations'
  }—from custom itineraries and cultural tips to transit and travel logistics. For time-sensitive details such as visas, advisories, and health requirements, verify with official sources.`,
  timestamp: 'Just now',
  source: 'travel-chat',
});

interface TravelChatProps {
  currentDestination?: string;
}

export const TravelChat: React.FC<TravelChatProps> = ({ currentDestination }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([createWelcomeMessage(currentDestination)]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    requestIdRef.current += 1;
    setMessages([createWelcomeMessage(currentDestination)]);
    setInput('');
    setLoading(false);
  }, [currentDestination]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    `What are the safest neighborhoods and transit tips in ${currentDestination || 'Tokyo'}?`,
    `Budget breakdown for 5 days in ${currentDestination || 'Paris'} including meals & museums?`,
    `What cultural etiquette rules should I follow in ${currentDestination || 'Japan'}?`,
    `Are there any current travel advisories or health requirements for ${currentDestination || 'Bali'}?`,
  ];

  const handleSend = async (messageText: string) => {
    const textToSend = messageText.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const requestId = ++requestIdRef.current;
    const history = messages
      .filter((message) => message.id !== 'init-1')
      .slice(-20)
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          destination: currentDestination,
          history,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : `Request failed (${response.status})`);
      }
      if (requestId !== requestIdRef.current) return;
      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('The travel service returned an empty response.');
      }
      const assistantMsg: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'travel-intelligence-engine',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      console.error('Travel chat request failed:', err);
      const fallbackMsg: ChatMessage = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: 'I could not get a response from the travel service. Your question is still in the chat; please try sending it again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'request-error',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/20">
            <Bot className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Travel Intelligence Co-Pilot</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                {CHAT_MODEL} • fallback enabled
              </span>
            </div>
            <p className="text-xs text-slate-400">Contextual advisor for destination questions & logistics</p>
          </div>
        </div>

        {currentDestination && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs font-semibold text-cyan-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Active: {currentDestination}
          </span>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-1.5 text-[10px] opacity-75">
                <span className="font-semibold uppercase">{m.role === 'user' ? 'You' : 'Travel Agent'}</span>
                <span>{m.timestamp}</span>
              </div>
              <div className="text-slate-100">{m.content}</div>
              {m.source && (
                <div className="mt-2 pt-1 border-t border-slate-800 text-[10px] text-cyan-400/80 font-mono">
                  Engine: {m.source}
                </div>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-blue-900 border border-blue-700 flex items-center justify-center text-blue-200 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-cyan-300 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Analyzing global travel intelligence & synthesizing response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="py-2 overflow-x-auto flex items-center gap-2 border-t border-slate-800/80">
        <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Quick Ask:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 whitespace-nowrap transition-colors"
          >
            {p.length > 40 ? p.slice(0, 40) + '...' : p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="pt-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about packing, costs, visas, or day trips in ${currentDestination || 'any city'}...`}
          className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-md shadow-cyan-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
