// 建筑基础接口
export interface BuildingBase {
  id: number;
  name: string;
  type: BuildingType;
  level: number;
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
  FARM = 'farm',
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
  [BuildingType.FARM]: BuildingCategory.PRODUCTION,
  [BuildingType.MINE]: BuildingCategory.PRODUCTION,
  [BuildingType.FACTORY]: BuildingCategory.PRODUCTION,
}

// Building 类型现在是两种建筑的联合类型
export type Building = ProductionBuilding | ResidentialBuilding;

// 资源类型
export interface Resource {
  id: number;
  name: string;
  amount: number;
  type: ResourceType;
}

// 资源类型枚举
export enum ResourceType {
  WOOD = 'wood',
  STONE = 'stone',
  FOOD = 'food',
  IRON = 'iron',
  IRON_TOOLS = 'iron_tools'  // 添加铁制工具作为资源类型
}

// 添加人口相关接口
export interface Population {
  total: number;
  employed: number;
  available: number;
  growth: number;
  foodConsumption: number;
}

// 添加产品接口
export interface Product {
  id: number;
  name: string;
  type: ProductType;
  laborRequired: number;  // 需要的劳动点数
  resourceCosts: ResourceCost[];  // 需要的资源
}

// 添加资源消耗接口
export interface ResourceCost {
  type: ResourceType;
  amount: number;
}

// 添加产品类型枚举
export enum ProductType {
  IRON_TOOLS = ResourceType.IRON_TOOLS
} 