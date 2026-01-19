
export enum ToolType {
  ENHANCER = 'ENHANCER',
  BLUEPRINTS = 'BLUEPRINTS',
  TEXTURES = 'TEXTURES',
  OPTIMIZER = 'OPTIMIZER',
  ASSETS = 'ASSETS'
}

export interface GenerationResult {
  imageUrl?: string;
  text?: string;
  loading: boolean;
  error?: string;
}

export interface AssetRecommendation {
  name: string;
  provider: 'Unity' | 'Unreal' | 'Other';
  link: string;
  description: string;
}
