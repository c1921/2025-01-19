import type { ResourceCost } from './resources';
import { ResourceType } from './resources'

// 产品接口
export interface Product {
  id: number;
  name: string;
  type: ProductType;
  laborRequired: number;
  resourceCosts: ResourceCost[];
}

// 产品类型枚举
export enum ProductType {
  IRON_TOOLS = ResourceType.IRON_TOOLS
} 