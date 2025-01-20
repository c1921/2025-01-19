import type { Product } from './resources'
import { ResourceType } from './resources'

// 建筑成本接口
export interface BuildingCost {
  type: ResourceType;
  amount: number;
}

// 建筑状态
export enum BuildingStatus {
  UNDER_CONSTRUCTION = 'under_construction',
  COMPLETED = 'completed'
}

// 建筑基础接口
export interface BuildingBase {
  id: number;
  name: string;
  type: BuildingType;
  costs: BuildingCost[];
  status: BuildingStatus;  // 添加建筑状态
  constructionProgress?: number;  // 建造进度（0-100）
  constructionTime?: number;      // 总建造时间（毫秒）
}

// 生产类建筑
export interface ProductionBuilding extends BuildingBase {
  productionRate: number;
  workers: number;
  maxWorkers: number;
  currentLabor: number;
  producing?: Product;
}

// 住宅类建筑
export interface ResidentialBuilding extends BuildingBase {
  capacity: number;      // 可容纳人口
  occupied: number;      // 已入住人口
}

// 建筑类型枚举
export enum BuildingType {
  // 住宅类
  HOUSE = 'house',
  // 生产类
  GATHERER = 'gatherer',
  MINE = 'mine',
  FACTORY = 'factory'
}

// 建筑类别
export enum BuildingCategory {
  RESIDENTIAL = 'residential',
  PRODUCTION = 'production'
}

// 建筑类型映射
export const BuildingCategories: Record<BuildingType, BuildingCategory> = {
  [BuildingType.HOUSE]: BuildingCategory.RESIDENTIAL,
  [BuildingType.GATHERER]: BuildingCategory.PRODUCTION,
  [BuildingType.MINE]: BuildingCategory.PRODUCTION,
  [BuildingType.FACTORY]: BuildingCategory.PRODUCTION,
}

// Building 类型现在是两种建筑的联合类型
export type Building = ProductionBuilding | ResidentialBuilding;

// 在现有类型定义中添加
export interface BuildingConfig {
  name: string;
  costs: BuildingCost[];
  constructionTime: number;
  description: string;
  production?: {
    type: ResourceType;
    baseRate: number;
  };
} 