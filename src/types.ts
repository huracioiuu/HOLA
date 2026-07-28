export type PageId = 'intro' | 'faint' | 'medical' | 'fire' | 'arena';

export interface InfoChip {
  id: string;
  title: string;
  desc: string;
  category?: string;
  iconName?: string;
}

export interface MythItem {
  id: string;
  myth: string;
  fact: string;
}

export interface DecisionOption {
  text: string;
  isCorrect: boolean;
  outcome: string;
  medicalImpact: string;
}

export interface ScenarioStep {
  id: string;
  title: string;
  situation: string;
  options: DecisionOption[];
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface QuizQuestion {
  id: string;
  lessonCategory: 'faint' | 'medical' | 'fire';
  question: string;
  options: string[];
  correctIndex: number;
  effectCorrect: string;
  effectWrong: string;
}

export interface LevelResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
}
