// 建筑类型
export interface Building {
  id: number;
  name: string;
  type: BuildingType;
  level: number;
  productionRate: number;
  workers: number;
  maxWorkers: number;
  currentLabor: number;  // 当前累积的劳动点数
  producing?: Product;
}

// 资源类型
export interface Resource {
  id: number;
  name: string;
  amount: number;
  type: ResourceType;
}

// 建筑类型枚举
export enum BuildingType {
  HOUSE = 'house',
  FARM = 'farm',
  MINE = 'mine',
  FACTORY = 'factory'
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