import path from 'path'
import { synthesizeImage } from '../src/index'

const image = await synthesizeImage({
    backgroundImagePath: path.resolve('./images/background.png'),
    text: 'Hello World',
    outputPath: path.resolve('./output/output.png'),
})
