import * as fs from 'fs'
import * as readline from 'readline'
import type { CountryInflationRates } from '../components/InflationRates'

const countryCode = 'uk'
const headerLines = 8
type UkMonth =
  | 'JAN'
  | 'FEB'
  | 'MAR'
  | 'APR'
  | 'MAY'
  | 'JUN'
  | 'JUL'
  | 'AUG'
  | 'SEP'
  | 'OCT'
  | 'NOV'
  | 'DEC'
const monthsMapper: Record<UkMonth, string> = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12'
}

export function convertUkCsvToJson(inputFilePath: string, outputDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const jsonData: CountryInflationRates = {}
    jsonData[countryCode] = {}

    const lineReader = readline.createInterface({
      input: fs.createReadStream(inputFilePath),
      crlfDelay: Infinity
    })

    let lineCount = 0
    lineReader.on('line', (line: string) => {
      lineCount++
      if (lineCount < headerLines) {
        return
      }

      const monthData = line.split(',')
      const dateData = monthData[0].substring(1, monthData[0].length - 1).split(' ')
      if (!(dateData[1] in monthsMapper)) {
        return
      }
      const date: string = dateData[0] + '-' + monthsMapper[dateData[1] as UkMonth]
      jsonData[countryCode][date] = parseFloat(monthData[1].substring(1, monthData[1].length - 1))
    })
    lineReader.on('close', () => {
      fs.writeFileSync(outputDirectory + countryCode + '.json', JSON.stringify(jsonData))
      resolve()
    })
    lineReader.on('error', (error: Error) => {
      reject(error)
    })
  })
}
