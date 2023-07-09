import axios from 'axios'
import * as fs from 'fs'
import * as zlib from 'zlib'
import * as readline from 'readline'
import type { InflationRates } from './components/InflationRates'
import type { countryCode } from './components/CountryCodes'
import { countryCodes } from './components/CountryCodes'

const eurostatInflationRateSourceUrl =
  'https://ec.europa.eu/eurostat/estat-navtree-portlet-prod/BulkDownloadListing?file=data/prc_hicp_mmor.tsv.gz'
const eurostatIndicatorForInflationRate = 'RCH_M,CP00,'

async function download(url: string, outputFilePath: string): Promise<void> {
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  const writeStream = fs.createWriteStream(outputFilePath)
  const gzipStream = response.data.pipe(zlib.createGunzip())

  return new Promise((resolve, reject) => {
    gzipStream.on('error', (error: Error) => {
      writeStream.close()
      reject(error)
    })

    writeStream.on('finish', () => {
      resolve()
    })

    gzipStream.pipe(writeStream)
  })
}

function convertTSVToJson(inputFilePath: string, outputDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let dates = [] as string[]

    const lineReader = readline.createInterface({
      input: fs.createReadStream(inputFilePath),
      crlfDelay: Infinity
    })
    lineReader.once('line', (line: string) => {
      const datePattern: RegExp = /(\d{4})M(\d{2})/
      dates = line.split('\t').flatMap((date: string) => {
        if (!datePattern.test(date)) {
          return []
        }

        return [date.trim().replace(datePattern, '$1-$2')]
      })
    })
    lineReader.on('line', (line: string) => {
      const jsonData = {} as InflationRates

      const columns = line.split('\t')
      if (!columns[0].startsWith(eurostatIndicatorForInflationRate)) {
        return
      }

      const countryCode = columns[0]
        .substring(eurostatIndicatorForInflationRate.length)
        .toLowerCase() as countryCode
      if (!countryCodes.includes(countryCode)) {
        return
      }

      jsonData[countryCode.toLowerCase()] = Object.fromEntries(
        columns.slice(1).flatMap((key, index) => {
          const inflationRate = parseFloat(key)
          if (isNaN(inflationRate)) {
            return []
          }
          return [[dates[index], inflationRate]]
        })
      )

      fs.writeFileSync(outputDirectory + countryCode + '.json', JSON.stringify(jsonData))
    })
    lineReader.on('close', () => {
      resolve()
    })
    lineReader.on('error', (error: Error) => {
      reject(error)
    })
  })
}

async function main() {
  const tsvFilePath = './prc_hicp_mmor.tsv'
  const outputDirectory = './src/assets/inflations/'

  try {
    if (!fs.existsSync(tsvFilePath)) {
      await download(eurostatInflationRateSourceUrl, tsvFilePath)
    }
    await convertTSVToJson(tsvFilePath, outputDirectory)
  } catch (error) {
    console.error('An error happened :', error)
  } finally {
    if (fs.existsSync(tsvFilePath)) {
      fs.unlinkSync(tsvFilePath)
    }
  }
}

main()
