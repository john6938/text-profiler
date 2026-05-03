import type { ProfileResult } from '../types';

interface Props {
  result: ProfileResult;
  bandColors: Map<string, string>;
  bandLabels: Map<string, string>;
  offListColor?: string;
}

export default function HighlightedText({ result, bandColors, bandLabels, offListColor }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
        Highlighted text
      </h2>

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
              style={offListColor ? { backgroundColor: offListColor } : undefined}
              className={offListColor ? 'rounded px-0.5 cursor-default' : ''}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
