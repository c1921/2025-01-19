export enum LogType {
  BUILDING = 'building',    // 建筑相关
  CHARACTER = 'character',  // 角色相关
  RESOURCE = 'resource',    // 资源相关
  SYSTEM = 'system'        // 系统消息
}

export interface LogEntry {
  id: number;
  type: LogType;
  message: string;
  timestamp: number;
  important?: boolean;  // 重要消息标记
} 