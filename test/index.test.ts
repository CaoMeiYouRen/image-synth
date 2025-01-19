import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { describe, it, expect, beforeAll } from 'vitest'
import sharp from 'sharp'
import { synthesizeImage } from '../src/index'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
describe('synthesizeImage', () => {

    beforeAll(async () => {
        // 初始化测试环境
        // 创建测试目录
        await fs.mkdir(path.resolve(__dirname, '../example/output'), { recursive: true })
    })

    it('should return a Buffer', async () => {
        const result = await synthesizeImage({
            backgroundImagePath: path.resolve(__dirname, '../example/images/background.png'),
            text: 'Test Text',
        })
        expect(result).toBeInstanceOf(Buffer)
    })

    it('should return valid image buffer when outputPath is provided', async () => {
        const outputPath = path.resolve(__dirname, '../example/output/test-output.png')
        const result = await synthesizeImage({
            backgroundImagePath: path.resolve(__dirname, '../example/images/background.png'),
            text: 'Test Text',
            outputPath,
        })
        expect(result).toBeInstanceOf(Buffer)
        // 验证返回的Buffer是否是有效的PNG图片
        const image = sharp(result)
        const metadata = await image.metadata()
        expect(metadata.format).toBe('png')
        // 验证文件是否存在
        const fileExists = await fs.access(outputPath).then(() => true).catch(() => false)
        expect(fileExists).toBe(true)
    })
})
