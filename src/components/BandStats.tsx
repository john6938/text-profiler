import type { ProfileResult } from '../types';

interface Props {
  result: ProfileResult;
  methodId: string;
}

export default function BandStats({ result, methodId }: Props) {
  const { offListTokens, offListTypes, offListPercent, totalWordTokens } = result;
  const isCoca = methodId === 'bnc_coca';

  const bandStats = isCoca
    ? result.bandStats.map(s =>
        s.bandId === 'k21plus'
          ? { ...s, tokenCount: s.tokenCount + offListTokens, typeCount: s.typeCount + offListTypes, percentage: s.percentage + offListPercent }
          : s
      )
    : result.bandStats;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Band breakdown
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-2 font-medium">Band</th>
              <th className="text-right px-4 py-2 font-medium">Tokens</th>
              <th className="text-right px-4 py-2 font-medium">%</th>
              <th className="text-right px-4 py-2 font-medium">Types</th>
            </tr>
          </thead>
          <tbody>
            {bandStats.map((s, i) => (
              <tr key={s.bandId} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-4 py-2">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-sm flex-shrink-0 border border-black/10"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="font-medium text-gray-800">{s.label}</span>
                  </span>
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-700">
                  {s.tokenCount.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-700">
                  {s.percentage.toFixed(1)}%
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-700">
                  {s.typeCount.toLocaleString()}
                </td>
              </tr>
            ))}
            {!isCoca && (
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-4 py-2">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-white border border-gray-400" />
                    <span className="font-medium text-gray-500">Off-list</span>
                  </span>
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">
                  {offListTokens.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">
                  {offListPercent.toFixed(1)}%
                </td>
                <td className="px-4 py-2 text-right font-mono text-gray-500">
                  {offListTypes.toLocaleString()}
                </td>
              </tr>
            )}
            <tr className="border-t-2 border-gray-200 font-semibold bg-white">
              <td className="px-4 py-2 text-gray-700">Total</td>
              <td className="px-4 py-2 text-right font-mono text-gray-700">
                {totalWordTokens.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right font-mono text-gray-700">100%</td>
              <td className="px-4 py-2" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
