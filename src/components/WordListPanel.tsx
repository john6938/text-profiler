import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ProfileResult } from '../types';

interface Props {
  result: ProfileResult;
}

export default function WordListPanel({ result }: Props) {
  const [openBands, setOpenBands] = useState<Set<string>>(new Set());
  const [offListOpen, setOffListOpen] = useState(false);

  function toggle(id: string) {
    setOpenBands(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Word lists
        </h2>
      </div>

      {result.bandStats.map(s => (
        <div key={s.bandId} className="border-b border-gray-100 last:border-0">
          <button
            onClick={() => toggle(s.bandId)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition text-left"
          >
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm border border-black/10"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-sm font-medium text-gray-800">{s.label}</span>
              <span className="text-xs text-gray-400">({s.typeCount} unique words)</span>
            </span>
            {openBands.has(s.bandId) ? (
              <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
            )}
          </button>

          {openBands.has(s.bandId) && (
            <div className="px-4 pb-3">
              {s.wordList.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No matches in this band.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {s.wordList.map(w => (
                    <span
                      key={w}
                      className="text-xs px-2 py-0.5 rounded-full border border-black/10 font-mono"
                      style={{ backgroundColor: s.color }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {result.offListWords.length > 0 && (
        <div>
          <button
            onClick={() => setOffListOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition text-left"
          >
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gray-300 border border-black/10" />
              <span className="text-sm font-medium text-gray-500">Off-list words</span>
              <span className="text-xs text-gray-400">
                ({result.offListTypes} unique — consider learning or ignoring these)
              </span>
            </span>
            {offListOpen ? (
              <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
            )}
          </button>

          {offListOpen && (
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-1.5">
                {result.offListWords.map(w => (
                  <span
                    key={w}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 border border-gray-300 font-mono text-gray-600"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
