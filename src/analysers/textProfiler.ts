import nlp from 'compromise';
import type { Method, ProfileResult, ProfileToken, BandStat } from '../types';

interface RawToken {
  text: string;
  isWord: boolean;
}

function tokenise(text: string): RawToken[] {
  const tokens: RawToken[] = [];
  const re = /([a-zA-Z][a-zA-Z''-]*[a-zA-Z]|[a-zA-Z])|([^a-zA-Z]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m[1]) tokens.push({ text: m[1], isWord: true });
    else       tokens.push({ text: m[2], isWord: false });
  }
  return tokens;
}

function getLemma(word: string): string {
  const doc = nlp(word);
  const verb = doc.verbs().toInfinitive().out('text');
  if (verb && verb !== word) return verb.toLowerCase();
  const noun = doc.nouns().toSingular().out('text');
  if (noun && noun !== word) return noun.toLowerCase();
  return word;
}

export function profileText(
  text: string,
  method: Method,
  selectedBandIds: string[],
): ProfileResult {
  const selectedBands = method.bands.filter(b => selectedBandIds.includes(b.id));

  const bandTokenCounts = new Map<string, number>(selectedBandIds.map(id => [id, 0]));
  const bandTypeSets    = new Map<string, Set<string>>(selectedBandIds.map(id => [id, new Set()]));
  const offListSet      = new Set<string>();

  let totalWordTokens = 0;

  const tokens: ProfileToken[] = tokenise(text).map(raw => {
    if (!raw.isWord) return { ...raw, bandId: null };

    totalWordTokens++;
    const lower = raw.text.toLowerCase();

    for (const band of selectedBands) {
      if (band.words.has(lower)) {
        bandTokenCounts.set(band.id, (bandTokenCounts.get(band.id) ?? 0) + 1);
        bandTypeSets.get(band.id)!.add(lower);
        return { text: raw.text, isWord: true, bandId: band.id };
      }
    }

    const lemma = getLemma(lower);
    if (lemma !== lower) {
      for (const band of selectedBands) {
        if (band.words.has(lemma)) {
          bandTokenCounts.set(band.id, (bandTokenCounts.get(band.id) ?? 0) + 1);
          bandTypeSets.get(band.id)!.add(lower);
          return { text: raw.text, isWord: true, bandId: band.id };
        }
      }
    }

    offListSet.add(lower);
    return { text: raw.text, isWord: true, bandId: null };
  });

  const totalCovered = selectedBandIds.reduce((s, id) => s + (bandTokenCounts.get(id) ?? 0), 0);
  const offListTokens = totalWordTokens - totalCovered;

  const bandStats: BandStat[] = selectedBands.map(band => {
    const tc    = bandTokenCounts.get(band.id) ?? 0;
    const types = bandTypeSets.get(band.id)!;
    return {
      bandId:     band.id,
      label:      band.label,
      shortLabel: band.shortLabel,
      color:      band.color,
      tokenCount: tc,
      typeCount:  types.size,
      percentage: totalWordTokens > 0 ? (tc / totalWordTokens) * 100 : 0,
      wordList:   [...types].sort(),
    };
  });

  return {
    tokens,
    bandStats,
    offListTokens,
    offListTypes:   offListSet.size,
    offListPercent: totalWordTokens > 0 ? (offListTokens / totalWordTokens) * 100 : 0,
    offListWords:   [...offListSet].sort(),
    totalWordTokens,
    coveragePercent: totalWordTokens > 0 ? (totalCovered / totalWordTokens) * 100 : 0,
    methodId:        method.id,
    selectedBandIds,
  };
}
