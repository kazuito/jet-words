export type Settings = {
  color_theme: string;
  auto_speech_answer: string;
};

export type ThemeType = {
  primaryFg: string;
  secondaryFg: string;
  primaryBg: string;
  secondaryBg: string;
  borderColor: string;
  listSelectedItemBg: string;
  listSelectedItemFg: string;
  listHoverItemBg: string;
  listHoverItemFg: string;
  listBg: string;
  listFg: string;
};

export type ScoreData = {
  key: string;
  miss: number;
  correct: number;
};
