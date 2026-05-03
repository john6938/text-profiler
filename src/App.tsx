import { useState, useRef, useMemo } from 'react';
import { Upload, RotateCcw } from 'lucide-react';
import tntLogo from './assets/tnt-logo.svg';
import { METHODS } from './analysers/methods';
import { profileText } from './analysers/textProfiler';
import { SAMPLE_TEXT } from './sampleText';
import type { ProfileResult } from './types';
import MethodSelector from './components/MethodSelector';
import BandSelector from './components/BandSelector';
import CoverageBar from './components/CoverageBar';
import BandStats from './components/BandStats';
import HighlightedText from './components/HighlightedText';
import WordListPanel from './components/WordListPanel';

type Mode = 'input' | 'output';

export default function App() {
  const [mode, setMode]               = useState<Mode>('input');
  const [text, setText]               = useState('');
  const [methodId, setMethodId]       = useState(METHODS[0].id);
  const [selectedBandIds, setSelected] = useState<string[]>(METHODS[0].defaultBandIds);
  const [result, setResult]           = useState<ProfileResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const method = METHODS.find(m => m.id === methodId) ?? METHODS[0];

  function handleMethodChange(id: string) {
    const m = METHODS.find(x => x.id === id) ?? METHODS[0];
    setMethodId(id);
    setSelected(m.defaultBandIds);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setText((ev.target?.result as string) ?? '');
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleAnalyse() {
    if (!text.trim() || selectedBandIds.length === 0) return;
    const r = profileText(text, method, selectedBandIds);
    setResult(r);
    setMode('output');
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const bandColors = useMemo(() => {
    const map = new Map<string, string>();
    METHODS.forEach(m => m.bands.forEach(b => map.set(b.id, b.color)));
    return map;
  }, []);

  const bandLabels = useMemo(() => {
    const map = new Map<string, string>();
    METHODS.forEach(m => m.bands.forEach(b => map.set(b.id, b.label)));
    return map;
  }, []);

  if (mode === 'output' && result) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Fixed header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <img src={tntLogo} alt="TNT Lab" className="w-8 h-8 rounded-sm" />
          <span className="font-semibold text-gray-800 hidden sm:block">Text Profiler</span>
          <span className="text-gray-300 hidden sm:block">|</span>
          <span className="text-sm text-gray-500 hidden sm:block">{method.label}</span>
          <button
            onClick={() => setMode('input')}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition"
          >
            <RotateCcw size={14} />
            Analyse another text
          </button>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-screen-lg mx-auto p-4 sm:p-6 space-y-4">
            <CoverageBar result={result} />
            <BandStats result={result} />
            <HighlightedText result={result} bandColors={bandColors} bandLabels={bandLabels} />
            <WordListPanel result={result} />

            <footer className="text-center text-xs text-gray-400 pt-2 pb-4">
              <p>Text Profiler · TNT Lab · University of Aizu</p>
              <p className="mt-1">{method.citation}</p>
            </footer>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-start justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <img src={tntLogo} alt="TNT Lab" className="w-12 h-12 rounded-sm" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Text Profiler</h1>
              <p className="text-sm text-gray-500">
                Identify vocabulary levels in any text using corpus-based word lists
              </p>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 space-y-5">

            {/* Text controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition"
              >
                <Upload size={15} />
                Upload .txt
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".txt,text/plain"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => setText(SAMPLE_TEXT)}
                className="px-3 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-sm text-purple-700 transition"
              >
                Load sample
              </button>
              <button
                onClick={() => setText('')}
                className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition"
              >
                Clear
              </button>
              {wordCount > 0 && (
                <span className="ml-auto text-xs text-gray-400">
                  {wordCount.toLocaleString()} words
                </span>
              )}
            </div>

            {/* Textarea */}
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={10}
              placeholder="Paste or type any text here, or upload a .txt file above…"
              className="w-full font-serif text-base leading-relaxed text-gray-900 border border-gray-200 rounded-xl p-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300"
            />

            {/* Method selector */}
            <MethodSelector
              methods={METHODS}
              selectedId={methodId}
              onChange={handleMethodChange}
            />

            {/* Band selector */}
            <BandSelector
              method={method}
              selectedBandIds={selectedBandIds}
              onChange={setSelected}
            />

            {/* Analyse button */}
            <button
              onClick={handleAnalyse}
              disabled={!text.trim() || selectedBandIds.length === 0}
              className="w-full py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition text-base"
            >
              {selectedBandIds.length === 0
                ? 'Select at least one band'
                : 'Analyse Text →'}
            </button>
          </div>

          {/* Info footer */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-500">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="font-semibold text-gray-700 mb-1">What is vocabulary profiling?</p>
              <p>Vocabulary profiling shows which words in a text belong to different frequency bands. High-coverage bands (K1–K3, GSL) are words most learners should already know. Low-frequency or off-list words may be worth targeting or safely ignoring.</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="font-semibold text-gray-700 mb-1">How to interpret results</p>
              <p>For reading comprehension, 98% coverage is usually needed. If your text shows many off-list or high-band words, consider pre-teaching them. Off-list words may be proper nouns, technical terms, or rare vocabulary.</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            TNT Lab · University of Aizu · Text Profiler
          </p>
        </div>
      </div>
    </div>
  );
}
