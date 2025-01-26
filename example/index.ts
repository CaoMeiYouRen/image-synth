import path from 'path'
import { fileURLToPath } from 'url'
import { synthesizeImage } from '../src/index'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const image = await synthesizeImage({
    backgroundImagePath: path.resolve(__dirname, './images/background.png'),
    text: 'Hello World\n你好，世界',
    outputPath: path.resolve(__dirname, './output/output.png'),
    fontSize: 120,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontColor: '#ffffff',
    fontPath: '',
    fontStyle: 'normal',
    textAlign: 'center',
    textY: (545 - 300) / 2,
})
