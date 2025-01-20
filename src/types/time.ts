export interface GameTime {
  timestamp: number;  // 游戏开始以来的毫秒数
  day: number;       // 游戏天数
  date: string;      // 格式化的日期字符串
  year: number;    // 添加年份
  month: number;   // 添加月份
  dayOfMonth: number;  // 添加日
}

// 游戏时间配置
export const TIME_CONFIG = {
  DAY_LENGTH: 10000,  // 一天的毫秒数（10秒）
  START_DATE: '2025-12-19'  // 游戏开始日期
}

// 计算游戏日期
export function calculateGameDate(startDate: string, days: number): string {
  const date = new Date(startDate)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

// 添加速度枚举
export enum GameSpeed {
  PAUSED = 0,
  NORMAL = 1,
  FAST = 2,
  VERY_FAST = 4
}

export const SPEED_LABELS: Record<GameSpeed, string> = {
  [GameSpeed.PAUSED]: '暂停',
  [GameSpeed.NORMAL]: '正常',
  [GameSpeed.FAST]: '快速',
  [GameSpeed.VERY_FAST]: '极速'
}

// 解析日期字符串
export function parseDateString(dateString: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateString.split('-').map(Number)
  return { year, month, day }
}

// 检查是否是新年
export function isNewYear(oldDate: string, newDate: string): boolean {
  const oldParts = parseDateString(oldDate)
  const newParts = parseDateString(newDate)
  return oldParts.year < newParts.year
} 