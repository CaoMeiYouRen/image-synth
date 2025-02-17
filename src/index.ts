import { writeFile } from 'fs/promises'
import sharp from 'sharp'
import { createCanvas, loadImage, registerFont } from 'canvas'

interface ImageSynthesisOptions {
    backgroundImagePath: string
    text: string
    outputPath?: string
    fontSize?: number
    fontColor?: string
    fontFamily?: string
    fontPath?: string
    fontStyle?: string
    fontWeight?: string
    textAlign?: 'left' | 'right' | 'center' | 'start' | 'end'
    textX?: number
    textY?: number
    maxWidth?: number
}

export async function synthesizeImage(options: ImageSynthesisOptions) {
    const {
        backgroundImagePath,
        text,
        outputPath,
        fontSize = 60,
        fontColor = '#ffffff',
        fontFamily = 'sans-serif',
        fontStyle = 'normal',
        fontWeight = 'normal',
        fontPath,
        textAlign = 'left',
        textX = 0,
        textY = 0,
    } = options

    // 加载背景图片并获取尺寸
    const background = sharp(backgroundImagePath)
    const metadata = await background.metadata()
    const bgBuffer = await background.toBuffer()

    // 创建canvas
    const canvas = createCanvas(metadata.width || 800, metadata.height || 600)
    const ctx = canvas.getContext('2d')

    // 绘制背景图片
    const img = await loadImage(bgBuffer)
    ctx.drawImage(img, 0, 0)

    // 设置文字样式
    // 注册字体
    if (fontPath) {
        registerFont(fontPath, {
            family: fontFamily,
            weight: fontWeight,
            style: fontStyle,
        })
    }

    // 设置字体样式
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px '${fontFamily}'`
    ctx.fillStyle = fontColor
    ctx.textBaseline = 'top'
    ctx.textAlign = textAlign

    // 计算文字位置
    let finalX = textX
    if (options.textAlign === 'center') {
        finalX = (metadata.width || 800) / 2
    } else if (options.textAlign === 'right') {
        finalX = (metadata.width || 800) - textX
    }

    // 绘制文字
    if (options.maxWidth) {
        ctx.fillText(text, finalX, textY, options.maxWidth)
    } else {
        ctx.fillText(text, finalX, textY)
    }

    // 保存合成后的图片
    const outputBuffer = canvas.toBuffer('image/png')
    if (outputPath) {
        await writeFile(outputPath, outputBuffer)
    }
    return outputBuffer
}
