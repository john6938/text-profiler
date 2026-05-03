import type { Method } from '../types';
import { BNC_COCA } from '../data/bnc_coca';
import { GSL_1, GSL_2, AWL } from '../data/gsl_awl';
import { NGSL_1, NGSL_2, NGSL_3, NGSL_SUPP, TSL } from '../data/ngsl_tsl';
import { LADYBIRD_PINK, LADYBIRD_YELLOW, LADYBIRD_GREEN, LADYBIRD_BLUE, LADYBIRD_PURPLE } from '../data/ladybird';
import { COMPSCI } from '../data/compsci';

function union(...sets: Set<string>[]): Set<string> {
  return new Set(sets.flatMap(s => [...s]));
}

export const METHODS: Method[] = [
  {
    id: 'gsl_awl',
    label: 'GSL + AWL',
    description: 'The General Service List (West 1953) covers the ~2,000 most useful English words. The Academic Word List (Coxhead 2000) adds 570 word families essential for academic reading and writing.',
    citation: 'West (1953); Coxhead (2000)',
    defaultBandIds: ['gsl1', 'gsl2', 'awl'],
    bands: [
      { id: 'gsl1', label: 'GSL 1st 1,000', shortLabel: 'GSL-1', color: '#86efac', words: GSL_1 },
      { id: 'gsl2', label: 'GSL 2nd 1,000', shortLabel: 'GSL-2', color: '#67e8f9', words: GSL_2 },
      { id: 'awl',  label: 'Academic Word List (570)', shortLabel: 'AWL',   color: '#a5b4fc', words: AWL  },
    ],
  },
  {
    id: 'ngsl_tsl',
    label: 'NGSL + TSL',
    description: 'The New General Service List (Browne et al. 2013) updates the GSL with corpus-based frequency data. The TOEIC Service List covers vocabulary needed for business and professional English (TOEIC exam).',
    citation: 'Browne, Culligan & Phillips (2013)',
    defaultBandIds: ['ngsl1', 'ngsl2', 'ngsl3', 'tsl'],
    bands: [
      { id: 'ngsl1', label: 'NGSL Level 1 (1–1,000)',   shortLabel: 'NGSL-1', color: '#86efac', words: NGSL_1    },
      { id: 'ngsl2', label: 'NGSL Level 2 (1,001–2,000)', shortLabel: 'NGSL-2', color: '#67e8f9', words: NGSL_2    },
      { id: 'ngsl3', label: 'NGSL Level 3 (2,001–2,800)', shortLabel: 'NGSL-3', color: '#7dd3fc', words: NGSL_3    },
      { id: 'ngsls', label: 'NGSL Supplemental',         shortLabel: 'Supp',   color: '#c4b5fd', words: NGSL_SUPP },
      { id: 'tsl',   label: 'TOEIC Service List',         shortLabel: 'TSL',    color: '#fda4af', words: TSL        },
    ],
  },
  {
    id: 'bnc_coca',
    label: 'BNC/COCA Frequency',
    description: 'Frequency-ranked word families from the British National Corpus and Corpus of Contemporary American English, grouped into 7 rainbow bands. K1 (red) = the 1,000 most frequent families; off-list and K21+ words (violet) are rare or absent from the corpus.',
    citation: 'Nation & Heatley (2002); cleaned 2014',
    defaultBandIds: ['k1', 'k2', 'k3_5', 'k6_10', 'k11_15', 'k16_20', 'k21plus'],
    bands: [
      { id: 'k1',      label: 'K1 (1–1,000)',            shortLabel: 'K1',     color: '#fca5a5', words: BNC_COCA[1] },
      { id: 'k2',      label: 'K2 (1,001–2,000)',         shortLabel: 'K2',     color: '#fdba74', words: BNC_COCA[2] },
      { id: 'k3_5',    label: 'K3–5 (2,001–5,000)',       shortLabel: 'K3–5',   color: '#fef08a', words: union(BNC_COCA[3], BNC_COCA[4], BNC_COCA[5]) },
      { id: 'k6_10',   label: 'K6–10 (5,001–10,000)',     shortLabel: 'K6–10',  color: '#86efac', words: union(BNC_COCA[6], BNC_COCA[7], BNC_COCA[8], BNC_COCA[9], BNC_COCA[10]) },
      { id: 'k11_15',  label: 'K11–15 (10,001–15,000)',   shortLabel: 'K11–15', color: '#93c5fd', words: union(BNC_COCA[11], BNC_COCA[12], BNC_COCA[13], BNC_COCA[14], BNC_COCA[15]) },
      { id: 'k16_20',  label: 'K16–20 (15,001–20,000)',   shortLabel: 'K16–20', color: '#a5b4fc', words: union(BNC_COCA[16], BNC_COCA[17], BNC_COCA[18], BNC_COCA[19], BNC_COCA[20]) },
      { id: 'k21plus', label: 'K21+ (20,001+)',           shortLabel: 'K21+',   color: '#d8b4fe', words: union(BNC_COCA[21], BNC_COCA[22], BNC_COCA[23], BNC_COCA[24], BNC_COCA[25], BNC_COCA[31], BNC_COCA[32], BNC_COCA[33], BNC_COCA[34]) },
    ],
  },
  {
    id: 'ladybird',
    label: 'Ladybird',
    description: 'The Ladybird Key Words scheme identifies the most frequent words in everyday English reading, writing and speech. The first 12 (Pink) account for ¼ of all words used; the first 100 account for ½. Designed for young or beginning learners.',
    citation: 'Ladybird Books / McNally & Murray (1962)',
    defaultBandIds: ['pink', 'yellow', 'green', 'blue', 'purple'],
    bands: [
      { id: 'pink',   label: 'Pink (top 12)',    shortLabel: 'Pink',   color: '#fbcfe8', words: LADYBIRD_PINK   },
      { id: 'yellow', label: 'Yellow (top 32)',   shortLabel: 'Yellow', color: '#fef08a', words: LADYBIRD_YELLOW },
      { id: 'green',  label: 'Green (top 100)',   shortLabel: 'Green',  color: '#bbf7d0', words: LADYBIRD_GREEN  },
      { id: 'blue',   label: 'Blue (top 300)',    shortLabel: 'Blue',   color: '#bae6fd', words: LADYBIRD_BLUE   },
      { id: 'purple', label: 'Purple (top 360)',  shortLabel: 'Purple', color: '#e9d5ff', words: LADYBIRD_PURPLE },
    ],
  },
  {
    id: 'compsci',
    label: 'CS Academic',
    description: 'A specialist list of ~370 academic vocabulary items found in computer science research articles (Bi Jia 2020). Useful for CS students identifying technical terms they need for reading and writing in the field.',
    citation: 'Bi Jia (2020) doi:10.1016/j.esp.2020.01.001',
    defaultBandIds: ['cs'],
    bands: [
      { id: 'cs', label: 'CS Academic Vocabulary', shortLabel: 'CS', color: '#fed7aa', words: COMPSCI },
    ],
  },
];
