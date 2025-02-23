import type { Character } from './character'

// 人口相关接口
export interface Population {
  total: number;
  employed: number;
  available: number;
  growth: number;
  foodConsumption: number;
  characters: Character[];  // 添加角色列表
} 