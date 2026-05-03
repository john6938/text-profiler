import type { ProfileResult } from '../types';

interface Props {
  result: ProfileResult;
}

const SEGMENT_SHADOW = 'inset 0 0 0 1px rgba(0,0,0,0.12)';

export default function CoverageBar({ result }: Props) {
  const { bandStats, offListPercent, totalWordTokens } = result;

  if (totalWordTokens === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Vocabulary coverage
        </h2>
        <span className="text-xs text-gray-500">{totalWordTokens.toLocaleString()} word tokens</span>
      </div>

      {/* Stacked bar */}
      <div className="flex h-6 rounded-lg overflow-hidden border border-black/10">
        {bandStats.map(s => (
          s.percentage > 0 && (
            <div
              key={s.bandId}
              style={{ width: `${s.percentage}%`, backgroundColor: s.color, boxShadow: SEGMENT_SHADOW }}
              title={`${s.shortLabel}: ${s.percentage.toFixed(1)}%`}
              className="transition-all"
            />
          )
        ))}
        {offListPercent > 0 && (
          <div
            style={{ width: `${offListPercent}%`, backgroundColor: 'white', boxShadow: SEGMENT_SHADOW }}
            title={`Off-list: ${offListPercent.toFixed(1)}%`}
            className="transition-all"
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {bandStats.filter(s => s.tokenCount > 0).map(s => (
          <span key={s.bandId} className="flex items-center gap-1 text-xs text-gray-700">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color, boxShadow: SEGMENT_SHADOW }} />
            {s.shortLabel} {s.percentage.toFixed(1)}%
          </span>
        ))}
        {offListPercent > 0 && (
          <span className="flex items-center gap-1 text-xs text-gray-700">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0 bg-white border border-gray-400" />
            Off-list {offListPercent.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}
