import { ref, type Ref } from 'vue'
import { type GameTime, TIME_CONFIG, calculateGameDate } from '../types/time'
import { LogType } from '../types/logs'

export function useGameTime(addLog: (type: LogType, message: string) => void) {
  const gameTime = ref<GameTime>({
    timestamp: 0,
    day: 0,
    date: TIME_CONFIG.START_DATE
  })

  const updateGameTime = (tickRate: number) => {
    gameTime.value.timestamp += tickRate
    const newDay = Math.floor(gameTime.value.timestamp / TIME_CONFIG.DAY_LENGTH)
    
    if (newDay > gameTime.value.day) {
      gameTime.value.day = newDay
      gameTime.value.date = calculateGameDate(TIME_CONFIG.START_DATE, newDay)
      addLog(LogType.SYSTEM, `Day ${newDay}: ${gameTime.value.date}`)
    }
  }

  return {
    gameTime,
    updateGameTime
  }
} 