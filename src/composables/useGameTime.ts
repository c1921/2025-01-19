import { ref } from 'vue'
import { type GameTime, TIME_CONFIG, calculateGameDate, GameSpeed, SPEED_LABELS } from '../types/time'
import { LogType } from '../types/logs'

export function useGameTime(addLog: (type: LogType, message: string) => void) {
  const gameTime = ref<GameTime>({
    timestamp: 0,
    day: 0,
    date: TIME_CONFIG.START_DATE
  })
  
  const currentSpeed = ref<GameSpeed>(GameSpeed.NORMAL)

  const updateGameTime = (tickRate: number) => {
    if (currentSpeed.value === GameSpeed.PAUSED) return
    
    const adjustedTickRate = tickRate * currentSpeed.value
    gameTime.value.timestamp += adjustedTickRate
    const newDay = Math.floor(gameTime.value.timestamp / TIME_CONFIG.DAY_LENGTH)
    
    if (newDay > gameTime.value.day) {
      gameTime.value.day = newDay
      gameTime.value.date = calculateGameDate(TIME_CONFIG.START_DATE, newDay)
      addLog(LogType.SYSTEM, `Day ${newDay}: ${gameTime.value.date}`)
    }
  }

  const setGameSpeed = (speed: GameSpeed) => {
    currentSpeed.value = speed
    addLog(LogType.SYSTEM, `Game speed set to ${SPEED_LABELS[speed]}`)
  }

  return {
    gameTime,
    currentSpeed,
    updateGameTime,
    setGameSpeed
  }
} 