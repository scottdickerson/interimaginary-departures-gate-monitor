import { findAudio, audioPaths } from '../audioUtils'
import { readFileSync } from 'fs'
import path from 'path'

describe('audioUtils', () => {
    it('audioPaths', () => {
        expect(audioPaths).not.toEqual({})
    })
    it('findAllAudio', async () => {
        const flightFileData = await readFileSync(
            path.join(__dirname, './TestFlightData.csv'),
            'utf-8'
        )
        flightFileData.split('\n').forEach((line, index) => {
            if (index > 0) {
                // console.log('full line', line)
                const destination = line.split(',')[0]
                // console.log('Checking destination', destination)
                if (
                    ![
                        'Neverwhere',
                        'The Night Kitchen',
                        'West Egg',
                        'Pegāna',
                    ].includes(
                        // TODO: we're missing sound files for these
                        destination
                    )
                ) {
                    expect(findAudio(destination)).toBeDefined()
                }
            }
        })
    })
})
