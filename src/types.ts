export interface Band {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  words: Set<string>;
}

export interface Method {
  id: string;
  label: string;
  description: string;
  citation: string;
  bands: Band[];
  defaultBandIds: string[];
  offListColor?: string;
}

export interface ProfileToken {
  text: string;
  isWord: boolean;
  bandId: string | null;
}

export interface BandStat {
  bandId: string;
  label: string;
  shortLabel: string;
  color: string;
  tokenCount: number;
  typeCount: number;
  percentage: number;
  wordList: string[];
}

export interface ProfileResult {
  tokens: ProfileToken[];
  bandStats: BandStat[];
  offListTokens: number;
  offListTypes: number;
  offListPercent: number;
  offListWords: string[];
  totalWordTokens: number;
  coveragePercent: number;
  methodId: string;
  selectedBandIds: string[];
}
