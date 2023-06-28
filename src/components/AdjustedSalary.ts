import type { Salary } from '@/components/Salary'

export interface AdjustedSalary {
  readonly date: string
  readonly income: number
  readonly incomeAdjusted: number
  readonly inflation: number
  readonly key: number
  readonly salaryChange: number
  readonly salaryChangeAdjusted: number
  readonly state: 'initial' | 'up' | 'down'
}

export function AdjustedSalaryCreateFirst(salary: Salary): AdjustedSalary {
  return {
    date: salary.date,
    income: salary.income,
    incomeAdjusted: salary.income,
    inflation: 1,
    key: salary.key,
    salaryChange: 0,
    salaryChangeAdjusted: 0,
    state: 'initial'
  }
}

export function AdjustedSalaryCreateFromPrevious(
  salary: Salary,
  lastSalary: AdjustedSalary,
  inflation: number
): AdjustedSalary {
  return {
    date: salary.date,
    income: salary.income,
    incomeAdjusted: salary.income / inflation,
    inflation: inflation,
    key: salary.key,
    salaryChange: (salary.income / lastSalary.income - 1) * 100,
    salaryChangeAdjusted: (salary.income / inflation / lastSalary.incomeAdjusted - 1) * 100,
    state: lastSalary.incomeAdjusted >= salary.income / inflation ? 'down' : 'up'
  }
}

export function AdjustedSalaryCreateFiller(
  lastSalary: AdjustedSalary,
  inflation: number
): AdjustedSalary {
  return {
    date: lastSalary.date,
    income: lastSalary.income,
    incomeAdjusted: lastSalary.income / inflation,
    inflation: inflation,
    key: 0,
    salaryChange: 0,
    salaryChangeAdjusted: (lastSalary.income / inflation / lastSalary.incomeAdjusted - 1) * 100,
    state: lastSalary.incomeAdjusted >= lastSalary.income * inflation ? 'down' : 'up'
  }
}
