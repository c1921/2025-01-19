import { ref, type Ref } from 'vue'
import { type GameTime, TIME_CONFIG, calculateGameDate, GameSpeed, SPEED_LABELS, isNewYear, parseDateString } from '../types/time'
import { LogType } from '../types/logs'
import { type Character } from '../types/character'

interface GameTimeProps {
  addLog: (type: LogType, message: string) => void;
  characters: Ref<Character[]>;
}

export function useGameTime({ addLog, characters }: GameTimeProps) {
  const startDate = parseDateString(TIME_CONFIG.START_DATE)
  const gameTime = ref<GameTime>({
    timestamp: 0,
    day: 0,
    date: TIME_CONFIG.START_DATE,
    year: startDate.year,
    month: startDate.month,
    dayOfMonth: startDate.day
  })
  
  const currentSpeed = ref<GameSpeed>(GameSpeed.NORMAL)

  const updateGameTime = (tickRate: number) => {
    if (currentSpeed.value === GameSpeed.PAUSED) return
    
    const adjustedTickRate = tickRate * currentSpeed.value
    gameTime.value.timestamp += adjustedTickRate
    const newDay = Math.floor(gameTime.value.timestamp / TIME_CONFIG.DAY_LENGTH)
    
    if (newDay > gameTime.value.day) {
      const oldDate = gameTime.value.date
      const newDate = calculateGameDate(TIME_CONFIG.START_DATE, newDay)
      
      // 检查是否跨年
      if (isNewYear(oldDate, newDate)) {
        // 增加所有角色的年龄
        characters.value.forEach((character: Character) => {
          character.age++
          addLog(LogType.CHARACTER, `${character.name} is now ${character.age} years old`)
        })
        addLog(LogType.SYSTEM, `Happy New Year! Welcome to ${parseDateString(newDate).year}!`)
      }

      gameTime.value.day = newDay
      gameTime.value.date = newDate
      const { year, month, day } = parseDateString(newDate)
      gameTime.value.year = year
      gameTime.value.month = month
      gameTime.value.dayOfMonth = day
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