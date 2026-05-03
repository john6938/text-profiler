import { useState } from 'react';
import type { ProfileResult } from '../types';

interface Props {
  result: ProfileResult;
  bandColors: Map<string, string>;
  bandLabels: Map<string, string>;
}

export default function HighlightedText({ result, bandColors, bandLabels }: Props) {
  const [showOffList, setShowOffList] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Highlighted text
        </h2>
        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={showOffList}
            onChange={e => setShowOffList(e.target.checked)}
            className="rounded border-gray-300"
          />
          Highlight off-list
        </label>
      </div>

      <div className="font-serif text-base leading-8 text-gray-900">
        {result.tokens.map((token, i) => {
          if (!token.isWord) {
            return <span key={i}>{token.text}</span>;
          }
          if (token.bandId) {
            const color = bandColors.get(token.bandId) ?? '#e5e7eb';
            const label = bandLabels.get(token.bandId) ?? token.bandId;
            return (
              <span
                key={i}
                title={label}
                style={{ backgroundColor: color }}
                className="rounded px-0.5 cursor-default"
              >
                {token.text}
              </span>
            );
          }
          return (
            <span
              key={i}
              title="Off-list"
              className={showOffList
                ? 'border-b-2 border-dotted border-red-400 cursor-default'
                : ''}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
