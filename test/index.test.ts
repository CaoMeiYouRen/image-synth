import { writeFileSync } from 'fs'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import sharp from 'sharp'
import { createCanvas } from 'canvas'
import { synthesizeImage } from '../src/index'

describe('synthesizeImage', () => {
    it('should return a Buffer', async () => {
        const result = await synthesizeImage({
            backgroundImagePath: 'example/images/background.png',
            text: 'Test Text',
        })
        expect(result).toBeInstanceOf(Buffer)
    })
})
