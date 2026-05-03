import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Method } from '../types';

interface Props {
  method: Method;
  selectedBandIds: string[];
  onChange: (ids: string[]) => void;
}

const BNC_FOLD_THRESHOLD = 10;

export default function BandSelector({ method, selectedBandIds, onChange }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isBnc = method.id === 'bnc_coca';
  const visibleBands = isBnc && !expanded
    ? method.bands.slice(0, BNC_FOLD_THRESHOLD)
    : method.bands;
  const hiddenCount = isBnc ? method.bands.length - BNC_FOLD_THRESHOLD : 0;

  function toggle(id: string) {
    if (selectedBandIds.includes(id)) {
      onChange(selectedBandIds.filter(b => b !== id));
    } else {
      onChange([...selectedBandIds, id]);
    }
  }

  function selectAll() {
    onChange(method.bands.map(b => b.id));
  }

  function selectNone() {
    onChange([]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Show bands
        </p>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
          >
            All
          </button>
          <button
            onClick={selectNone}
            className="text-xs px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
          >
            None
          </button>
        </div>
      </div>

      <div className={`grid gap-2 ${method.id === 'compsci' ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
        {visibleBands.map(band => {
          const checked = selectedBandIds.includes(band.id);
          return (
            <label
              key={band.id}
              className="flex items-center gap-2 text-sm cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(band.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span
                className="w-3.5 h-3.5 rounded-sm flex-shrink-0 border border-black/10"
                style={{ backgroundColor: band.color }}
              />
              <span className={`truncate ${checked ? 'text-gray-800' : 'text-gray-400'}`}>
                {band.label}
              </span>
            </label>
          );
        })}
      </div>

      {isBnc && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Show fewer bands' : `Show ${hiddenCount} more bands (K${BNC_FOLD_THRESHOLD + 1}+)`}
        </button>
      )}
    </div>
  );
}
