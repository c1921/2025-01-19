// 性别枚举
export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

// 角色接口
export interface Character {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  // 可以添加其他属性
  employed?: boolean;  // 是否就业
  workplace?: number;  // 工作场所的建筑ID
  home?: number;      // 居住的建筑ID
}

// 名字生成器接口
export interface NameGenerator {
  maleNames: string[];
  femaleNames: string[];
  surnames: string[];
}

// 示例名字数据
export const defaultNameGenerator: NameGenerator = {
  maleNames: ['John', 'William', 'James', 'Michael', 'David', 'Robert'],
  femaleNames: ['Mary', 'Emma', 'Elizabeth', 'Sarah', 'Margaret', 'Anna'],
  surnames: ['Smith', 'Johnson', 'Brown', 'Taylor', 'Miller', 'Wilson']
}

// 生成随机角色
export function generateCharacter(id: number): Character {
  const gender = Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE;
  const names = defaultNameGenerator[gender === Gender.MALE ? 'maleNames' : 'femaleNames'];
  const name = `${names[Math.floor(Math.random() * names.length)]} ${
    defaultNameGenerator.surnames[Math.floor(Math.random() * defaultNameGenerator.surnames.length)]
  }`;
  
  return {
    id,
    name,
    age: Math.floor(Math.random() * 40) + 16, // 16-55岁
    gender,
    employed: false
  };
} 