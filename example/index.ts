import path from 'path'
import { fileURLToPath } from 'url'
import { synthesizeImage } from '../src/index'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const image = await synthesizeImage({
    backgroundImagePath: path.resolve(__dirname, './images/background.png'),
    text: 'Hello World',
    outputPath: path.resolve(__dirname, './output/output.png'),
    fontSize: 80,
    textAlign: 'center',
    // textX: (900 - 80 * 5) / 2,
    textY: (545 - 80 - 60) / 2,
})
