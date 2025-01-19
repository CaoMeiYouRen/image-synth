import { existsSync } from 'fs'
import { describe, it, expect } from 'vitest'
import sharp from 'sharp'
import { synthesizeImage } from '../src/index'

describe('synthesizeImage', () => {
    it('should return a Buffer', async () => {
        const result = await synthesizeImage({
            backgroundImagePath: 'example/images/background.png',
            text: 'Test Text',
        })
        expect(result).toBeInstanceOf(Buffer)
    })

    it('should return valid image buffer when outputPath is provided', async () => {
        const outputPath = 'example/output/test-output.png'
        const result = await synthesizeImage({
            backgroundImagePath: 'example/images/background.png',
            text: 'Test Text',
            outputPath,
        })
        expect(result).toBeInstanceOf(Buffer)
        // 验证返回的Buffer是否是有效的PNG图片
        const image = sharp(result)
        const metadata = await image.metadata()
        expect(metadata.format).toBe('png')
        // 验证文件是否存在
        expect(existsSync(outputPath)).toBe(true)
    })
})
