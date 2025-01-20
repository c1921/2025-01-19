export interface GameTime {
  timestamp: number;  // 游戏开始以来的毫秒数
  day: number;       // 游戏天数
  date: string;      // 格式化的日期字符串
}

// 游戏时间配置
export const TIME_CONFIG = {
  DAY_LENGTH: 10000,  // 一天的毫秒数（10秒）
  START_DATE: '2025-01-19'  // 游戏开始日期
}

// 计算游戏日期
export function calculateGameDate(startDate: string, days: number): string {
  const date = new Date(startDate)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
} 