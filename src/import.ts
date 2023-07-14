import axios from 'axios'
import * as fs from 'fs'
import * as zlib from 'zlib'
import { convertEurostatTsvToJson } from './importer/EurostatParser'
import { convertUkCsvToJson } from './importer/UkParser'

const eurostatInflationRateSourceUrl =
  'https://ec.europa.eu/eurostat/estat-navtree-portlet-prod/BulkDownloadListing?file=data/prc_hicp_mmor.tsv.gz'
const ukInflationRatesSourceUrl =
  'https://www.ons.gov.uk/generator?format=csv&uri=/economy/inflationandpriceindices/timeseries/d7oe/mm23'

async function download(url: string, outputFilePath: string, compressed: boolean): Promise<void> {
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  let pipeline = response.data
  if (compressed) {
    pipeline = pipeline.pipe(zlib.createGunzip())
  }

  const writeStream = fs.createWriteStream(outputFilePath)
  pipeline = pipeline.pipe(writeStream)

  return new Promise((resolve, reject) => {
    pipeline.on('error', (error: Error) => {
      writeStream.close()
      reject(error)
    })

    pipeline.on('finish', () => {
      resolve()
    })
  })
}

async function main() {
  const eurostatTsvFilePath = './eurostat-prc_hicp_mmor.tsv'
  const ukCsvFilePath = './uk-series-110723.csv'
  const outputDirectory = './src/assets/inflations/'

  // Download EU data
  try {
    if (!fs.existsSync(eurostatTsvFilePath)) {
      await download(eurostatInflationRateSourceUrl, eurostatTsvFilePath, true)
    }
    await convertEurostatTsvToJson(eurostatTsvFilePath, outputDirectory)
  } catch (error) {
    console.error('An error happened while downloading eurostat data:', error)
  } finally {
    if (fs.existsSync(eurostatTsvFilePath)) {
      fs.unlinkSync(eurostatTsvFilePath)
    }
  }

  // Download UK data
  try {
    if (!fs.existsSync(ukCsvFilePath)) {
      await download(ukInflationRatesSourceUrl, ukCsvFilePath, false)
    }
    await convertUkCsvToJson(ukCsvFilePath, outputDirectory)
  } catch (error) {
    console.error('An error happened while downloading uk data:', error)
  } finally {
    if (fs.existsSync(ukCsvFilePath)) {
      fs.unlinkSync(ukCsvFilePath)
    }
  }
}

main()
