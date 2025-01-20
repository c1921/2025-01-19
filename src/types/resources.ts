// 资源类型枚举
export enum ResourceType {
  WOOD = 'wood',
  STONE = 'stone',
  FOOD = 'food',
  IRON = 'iron',
  IRON_TOOLS = 'iron_tools'
}

// 资源类型
export interface Resource {
  id: number;
  name: string;
  amount: number;
  type: ResourceType;
}

// 资源消耗接口
export interface ResourceCost {
  type: ResourceType;
  amount: number;
}

// 产品类型枚举
export enum ProductType {
  IRON_TOOLS = ResourceType.IRON_TOOLS
}

// 产品接口
export interface Product {
  id: number;
  name: string;
  type: ProductType;
  laborRequired: number;
  resourceCosts: ResourceCost[];
} 