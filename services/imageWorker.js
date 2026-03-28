const { parentPort, workerData } = require('worker_threads');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const { inputPath, originalName } = workerData;

const SIZES = {
    small: 150,
    medium: 500,
    large: 1024
};

const getOutputPath = (folderName, filename) => {
    const dir = path.join(process.cwd(), 'files', 'images', folderName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return path.join(dir, filename);
};

const processImages = async () => {
    try {
        console.log(`[Worker] Started processing: ${originalName}`);
        const image = await Jimp.read(inputPath);
        
        await image.clone().resize(SIZES.small, Jimp.AUTO).quality(80).writeAsync(getOutputPath('small', originalName));
        console.log(`[Worker] Created small thumbnail: ${originalName}`);
        
        await image.clone().resize(SIZES.medium, Jimp.AUTO).quality(80).writeAsync(getOutputPath('medium', originalName));
        console.log(`[Worker] Created medium thumbnail: ${originalName}`);
        
        await image.clone().resize(SIZES.large, Jimp.AUTO).quality(80).writeAsync(getOutputPath('large', originalName));
        console.log(`[Worker] Created large thumbnail: ${originalName}`);
        
        await image.clone().blur(5).writeAsync(getOutputPath('blur', originalName));
        console.log(`[Worker] Applied blur: ${originalName}`);
        
        await image.clone().greyscale().writeAsync(getOutputPath('grayscale', originalName));
        console.log(`[Worker] Applied grayscale: ${originalName}`);
        
        await image.clone().sepia().writeAsync(getOutputPath('sepia', originalName));
        console.log(`[Worker] Applied sepia: ${originalName}`);
        
        console.log(`[Worker] Processing successfully completed: ${originalName}`);

        if (parentPort) {
            parentPort.postMessage('done');
        }
    } catch (error) {
        console.error(`[Worker] Error processing ${originalName}:`, error);
        if (parentPort) {
            parentPort.postMessage({ error: error.message });
        }
    }
};

processImages();
