import { writeFile } from 'fs/promises'
import sharp from 'sharp'
import { createCanvas, loadImage } from 'canvas'

interface ImageSynthesisOptions {
    backgroundImagePath: string
    text: string
    outputPath?: string
    fontSize?: number
    fontColor?: string
    textX?: number
    textY?: number
}

export async function synthesizeImage(options: ImageSynthesisOptions) {
    const {
        backgroundImagePath,
        text,
        outputPath,
        fontSize = 60,
        fontColor = '#ffffff',
        textX = 50,
        textY = 100,
    } = options

    try {
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
        ctx.font = `${fontSize}px sans-serif`
        ctx.fillStyle = fontColor
        ctx.textBaseline = 'top'

        // 绘制文字
        ctx.fillText(text, textX, textY)

        // 保存合成后的图片
        const outputBuffer = canvas.toBuffer('image/png')
        if (outputPath) {
            await writeFile(outputPath, outputBuffer)
        }
        console.log(`图片已成功保存到：${outputPath}`)
        return outputBuffer
    } catch (error) {
        console.error('图片合成失败：', error)
        if (error instanceof Error && error.message.includes('writeFileSync')) {
            throw new Error('Write file failed')
        }
        throw error
    }
}
