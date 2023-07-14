import axios from 'axios'
import * as fs from 'fs'
import * as zlib from 'zlib'
import { convertEurostatTsvToJson } from './importer/EurostatParser'

const eurostatInflationRateSourceUrl =
  'https://ec.europa.eu/eurostat/estat-navtree-portlet-prod/BulkDownloadListing?file=data/prc_hicp_mmor.tsv.gz'

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

async function main() {
  const eurostatTsvFilePath = './prc_hicp_mmor.tsv'
  const outputDirectory = './src/assets/inflations/'

  // Download EU data
  try {
    if (!fs.existsSync(eurostatTsvFilePath)) {
      await download(eurostatInflationRateSourceUrl, eurostatTsvFilePath)
    }
    await convertEurostatTsvToJson(eurostatTsvFilePath, outputDirectory)
  } catch (error) {
    console.error('An error happened while downloading eurostat data:', error)
  } finally {
    if (fs.existsSync(eurostatTsvFilePath)) {
      fs.unlinkSync(eurostatTsvFilePath)
    }
  }
}

main()
