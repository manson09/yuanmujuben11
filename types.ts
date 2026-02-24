
export enum AppStage {
  UPLOAD = 'UPLOAD',
  ANALYSIS = 'ANALYSIS',
  OUTLINE = 'OUTLINE',
  SCRIPT = 'SCRIPT'
}

export interface ProjectState {
  originalNovel: string;
  formattingRef: string;
  novelName: string;
  analysisReport?: string;
  outline?: string;
  scripts: string[];
  currentPhase: number;
  genre?: string;
}

export interface AnalysisReport {
  skeleton: {
    goal: string;
    relationships: string;
    milestones: string;
  };
  genreDecision: string;
  systemLogic: string;
}
