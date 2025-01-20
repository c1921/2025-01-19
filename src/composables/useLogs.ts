import { ref } from 'vue'
import { type LogEntry, LogType } from '../types/logs'

export function useLogs(maxLogs: number = 100) {
  const logs = ref<LogEntry[]>([])
  let nextId = 1

  const addLog = (type: LogType, message: string, important: boolean = false) => {
    const log: LogEntry = {
      id: nextId++,
      type,
      message,
      timestamp: Date.now(),
      important
    }

    logs.value.unshift(log)  // 新日志添加到开头
    if (logs.value.length > maxLogs) {
      logs.value = logs.value.slice(0, maxLogs)  // 保持日志数量限制
    }
  }

  const clearLogs = () => {
    logs.value = []
  }

  return {
    logs,
    addLog,
    clearLogs
  }
} 