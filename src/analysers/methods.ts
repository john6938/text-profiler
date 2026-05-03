import type { Method } from '../types';
import { BNC_COCA, BNC_COCA_BAND_IDS } from '../data/bnc_coca';
import { GSL_1, GSL_2, AWL } from '../data/gsl_awl';
import { NGSL_1, NGSL_2, NGSL_3, NGSL_SUPP, TSL } from '../data/ngsl_tsl';
import { LADYBIRD_PINK, LADYBIRD_YELLOW, LADYBIRD_GREEN, LADYBIRD_BLUE, LADYBIRD_PURPLE } from '../data/ladybird';
import { COMPSCI } from '../data/compsci';

// HSL gradient: K1 = green (120°), K34 = red (0°)
function bncColor(bandNum: number): string {
  const maxBand = 34;
  const t = Math.min((bandNum - 1) / (maxBand - 1), 1);
  const hue = Math.round(120 - t * 120);
  return `hsl(${hue}, 75%, 82%)`;
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
    description: 'Frequency-ranked word families from the British National Corpus and Corpus of Contemporary American English. K1 = the most frequent 1,000 families; K2 = the next 1,000; and so on up to K25 (and K31–K34 for very rare words).',
    citation: 'Nation & Heatley (2002); cleaned 2014',
    defaultBandIds: ['k1', 'k2', 'k3', 'k4', 'k5'],
    bands: BNC_COCA_BAND_IDS.map(n => ({
      id:         `k${n}`,
      label:      `K${n} (${((n - 1) * 1000 + 1).toLocaleString()}–${(n * 1000).toLocaleString()})`,
      shortLabel: `K${n}`,
      color:      bncColor(n),
      words:      BNC_COCA[n],
    })),
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
