import { writeFileSync } from 'fs'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import sharp from 'sharp'
import { createCanvas } from 'canvas'
import { synthesizeImage } from '../src/index'

// Mock fs模块
vi.mock('fs', () => ({
    writeFileSync: vi.fn(),
}))

// Mock sharp模块
vi.mock('sharp', () => {
    const sharpInstance = {
        metadata: vi.fn().mockImplementation((callback) => {
            const metadata = { width: 800, height: 600 }
            if (callback) {
                callback(null, metadata)
                return sharpInstance
            }
            return Promise.resolve(metadata)
        }),
        toBuffer: vi.fn().mockImplementation((options) => {
            if (options?.resolveWithObject) {
                return Promise.resolve({
                    data: Buffer.from('mock image data'),
                    info: { width: 800, height: 600 },
                })
            }
            return Promise.resolve(Buffer.from('mock image data'))
        }),
        resize: vi.fn().mockReturnThis(),
        jpeg: vi.fn().mockReturnThis(),
        png: vi.fn().mockReturnThis(),
        webp: vi.fn().mockReturnThis(),
        tiff: vi.fn().mockReturnThis(),
        raw: vi.fn().mockReturnThis(),
        toFormat: vi.fn().mockReturnThis(),
        withMetadata: vi.fn().mockReturnThis(),
        rotate: vi.fn().mockReturnThis(),
        extract: vi.fn().mockReturnThis(),
        trim: vi.fn().mockReturnThis(),
        flatten: vi.fn().mockReturnThis(),
        gamma: vi.fn().mockReturnThis(),
        negate: vi.fn().mockReturnThis(),
        normalise: vi.fn().mockReturnThis(),
        normalize: vi.fn().mockReturnThis(),
        convolve: vi.fn().mockReturnThis(),
        threshold: vi.fn().mockReturnThis(),
        boolean: vi.fn().mockReturnThis(),
        linear: vi.fn().mockReturnThis(),
        recomb: vi.fn().mockReturnThis(),
        modulate: vi.fn().mockReturnThis(),
        tint: vi.fn().mockReturnThis(),
        grayscale: vi.fn().mockReturnThis(),
        greyscale: vi.fn().mockReturnThis(),
        pipelineColorspace: vi.fn().mockReturnThis(),
        toColorspace: vi.fn().mockReturnThis(),
        composite: vi.fn().mockReturnThis(),
        removeAlpha: vi.fn().mockReturnThis(),
        ensureAlpha: vi.fn().mockReturnThis(),
        extractChannel: vi.fn().mockReturnThis(),
        joinChannel: vi.fn().mockReturnThis(),
        bandbool: vi.fn().mockReturnThis(),
    }
    return {
        default: vi.fn(() => sharpInstance),
    }
})

// Mock canvas模块
vi.mock('canvas', () => ({
    createCanvas: vi.fn(() => ({
        getContext: vi.fn(() => ({
            drawImage: vi.fn(),
            font: '',
            fillStyle: '',
            textBaseline: '',
            fillText: vi.fn(),
        })),
        toBuffer: vi.fn(() => Promise.resolve(Buffer.from('mock canvas data'))),
    })),
    loadImage: vi.fn(() => Promise.resolve({
        width: 800,
        height: 600,
    })),
}))

describe('图片合成功能', () => {
    const mockOptions = {
        backgroundImagePath: './test.jpg',
        text: 'Test Text',
        outputPath: './output.png',
        fontSize: 50,
        fontColor: '#000000',
        textX: 100,
        textY: 200,
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('应该成功合成图片', async () => {
        await synthesizeImage(mockOptions)

        // 验证sharp被正确调用
        expect(sharp).toHaveBeenCalledWith(mockOptions.backgroundImagePath)
        const sharpInstance = vi.mocked(sharp).mock.results[0].value
        expect(sharpInstance.metadata).toHaveBeenCalled()
        expect(sharpInstance.toBuffer).toHaveBeenCalled()

        // 验证canvas被正确调用
        expect(createCanvas).toHaveBeenCalledWith(800, 600)

        // 验证文件被正确写入
        expect(writeFileSync).toHaveBeenCalledWith(
            mockOptions.outputPath,
            expect.any(Buffer),
        )
    })

    it('应该处理图片加载失败的情况', async () => {
        vi.mocked(sharp).mockImplementation(() => {
            throw new Error('Image load failed')
        })

        await expect(synthesizeImage(mockOptions)).rejects.toThrow('Image load failed')
    })

    it('应该处理文件写入失败的情况', async () => {
        vi.mocked(writeFileSync).mockImplementation(() => {
            throw new Error('Write file failed')
        })

        await expect(synthesizeImage(mockOptions)).rejects.toThrow('Write file failed')
    })
})
