import type { Salary } from '@/components/Salary'
import { SharedConfiguration } from '@/components/SharedConfiguration'

export interface AdjustedSalary {
  readonly date: string
  readonly income: number
  readonly incomeAdjusted: number
  readonly inflation: number
  readonly originalSalary: Salary | null
  readonly salaryChange: number
  readonly salaryChangeAdjusted: number
  readonly state: 'initial' | 'up' | 'down'
}

export function AdjustedSalaryCreateFirst(salary: Salary): AdjustedSalary {
  const monthlyIncome: number =
    SharedConfiguration.incomeMode === 'gross-annual'
      ? (salary.income * (1 - SharedConfiguration.imposition / 100)) / 12
      : salary.income

  return {
    date: salary.date,
    income: monthlyIncome,
    incomeAdjusted: monthlyIncome,
    inflation: 1,
    originalSalary: salary,
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
  const monthlyIncome: number =
    SharedConfiguration.incomeMode === 'gross-annual'
      ? (salary.income * (1 - SharedConfiguration.imposition / 100)) / 12
      : salary.income

  return {
    date: salary.date,
    income: monthlyIncome,
    incomeAdjusted: monthlyIncome / inflation,
    inflation: inflation,
    originalSalary: salary,
    salaryChange: (monthlyIncome / lastSalary.income - 1) * 100,
    salaryChangeAdjusted: (monthlyIncome / inflation / lastSalary.incomeAdjusted - 1) * 100,
    state: lastSalary.incomeAdjusted >= monthlyIncome / inflation ? 'down' : 'up'
  }
}

export function AdjustedSalaryCreateFiller(
  date: string,
  lastSalary: AdjustedSalary,
  inflation: number
): AdjustedSalary {
  return {
    date: date,
    income: lastSalary.income,
    incomeAdjusted: lastSalary.income / inflation,
    inflation: inflation,
    originalSalary: null,
    salaryChange: 0,
    salaryChangeAdjusted: (lastSalary.income / inflation / lastSalary.incomeAdjusted - 1) * 100,
    state: lastSalary.incomeAdjusted >= lastSalary.income * inflation ? 'down' : 'up'
  }
}
