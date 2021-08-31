
console.log('require.context',require.context);
// Support require.context in node environment
// This condition actually should detect if it's an Node environment
// if (typeof require.context === 'undefined') {
//     const fs = require('fs')
//     const path = require('path')

//     require.context = (
//         base = '.',
//         scanSubDirectories = false,
//         regularExpression = /\.js$/
//     ) => {
//         const files = {}

//         function readDirectory(directory) {
//             fs.readdirSync(directory).forEach((file) => {
//                 const fullPath = path.resolve(directory, file)

//                 if (fs.statSync(fullPath).isDirectory()) {
//                     if (scanSubDirectories) readDirectory(fullPath)

//                     return
//                 }

//                 if (!regularExpression.test(fullPath)) return

//                 files[fullPath] = true
//             })
//         }

//         readDirectory(path.resolve(__dirname, base))

//         function Module(file) {
//             return require(file)
//         }

//         Module.keys = () => Object.keys(files)

//         return Module
//     }
// }

export const audioPaths = {}

const importAll = (imageRequireContext) => {
    imageRequireContext.keys().forEach((imageRequireKey) => {
        audioPaths[imageRequireKey] = imageRequireContext(imageRequireKey)
    })
}

/** I have to do this so the webpack import can locate the files keyed by theiir destinationo name */
importAll(require.context('../sound/', true, /\.wav$/))

// console.log('audioPaths', JSON.stringify(audioPaths))
/** find the right audio file for a destination */
export const findAudio = (destination) => {
    const normalizedDestination = destination
        .replace(/\s/g, '_')
        .replace(/:/g, '-')
    // console.log(`searching for ${normalizedDestination}`)
    const matchingKey = Object.keys(audioPaths).find((audioFileName) => {
        // console.log(
        //     `normalizedDestination: ${normalizedDestination} versus audioFileName ${audioFileName}`
        // )
        return audioFileName
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(
                normalizedDestination
                    .normalize('NFD')
                    .replace(/\p{Diacritic}/gu, '')
            )
    })
    // if I can't find the matching file return undefined
    return matchingKey ? audioPaths[matchingKey] : undefined
}
