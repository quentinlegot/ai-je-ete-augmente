import * as fs from 'fs'
import * as readline from 'readline'
import * as yauzl from 'yauzl'
import type { CountryInflationRates } from '../components/InflationRates'

const countryCode = 'ca'
const headerLines = 1
const matchingRows = 'Ensemble'

export function convertCaCsvToJson(inputFilePath: string, outputDirectory: string): void {
  const jsonData: CountryInflationRates = {}
  jsonData[countryCode] = {}

  yauzl.open(inputFilePath, { lazyEntries: true }, function (err, zipFile) {
    if (err) throw err

    zipFile.readEntry()
    zipFile.on('entry', function (entry) {
      if (/\/$/.test(entry.fileName)) {
        zipFile.readEntry()
        return
      }
      if (entry.fileName !== '18100006.csv') {
        zipFile.readEntry()
        return
      }

      zipFile.openReadStream(entry, (err, readStream) => {
        if (err) throw err

        readStream.on('end', function () {
          zipFile.readEntry()
        })

        const lineReader = readline.createInterface({
          input: readStream,
          crlfDelay: Infinity
        })

        let previousPrice: null | number = null
        let lineCount = 0
        lineReader.on('line', (line: string) => {
          lineCount++
          if (lineCount < headerLines) {
            return
          }

          const data = line.split(';')
          if (!(3 in data) || data[3].substring(1, data[3].length - 1) !== matchingRows) {
            return
          }

          const date: string = data[0].substring(1, data[0].length - 1)
          const value = parseFloat(data[10].substring(1, data[10].length - 1))
          jsonData[countryCode][date] = (value / (previousPrice ?? value) - 1) * 100
          previousPrice = value
          return
        })
        lineReader.on('close', () => {
          fs.writeFileSync(outputDirectory + countryCode + '.json', JSON.stringify(jsonData))
        })
      })
    })
  })
}
