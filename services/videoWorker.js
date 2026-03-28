const { parentPort, workerData } = require('worker_threads');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const { inputPath, originalName } = workerData;

const QUALITIES = [
    { name: '144p', size: '?x144' },
    { name: '240p', size: '?x240' },
    { name: '360p', size: '?x360' },
    { name: '720p', size: '?x720' },
    { name: '1080p', size: '?x1080' }
];

const getOutputPath = (folderName, filename) => {
    const dir = path.join(process.cwd(), 'files', 'videos', folderName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return path.join(dir, filename);
};

const processVideo = (sizeConfig) => {
    return new Promise((resolve, reject) => {
        const outputPath = getOutputPath(sizeConfig.name, originalName);
        console.log(`[Video Worker] Started ${sizeConfig.name} encoding for: ${originalName}`);
        
        ffmpeg(inputPath)
            .size(sizeConfig.size)
            .output(outputPath)
            .on('end', () => {
                console.log(`[Video Worker] Finished ${sizeConfig.name} encoding for: ${originalName}`);
                resolve();
            })
            .on('error', (err) => {
                console.error(`[Video Worker] Error encoding ${sizeConfig.name} for ${originalName}:`, err.message);
                reject(err);
            })
            .run();
    });
};

const processAll = async () => {
    try {
        console.log(`[Video Worker] Started processing video: ${originalName}`);
        for (const config of QUALITIES) {
            await processVideo(config);
        }
        
        console.log(`[Video Worker] Processing successfully completed: ${originalName}`);
        if (parentPort) {
            parentPort.postMessage('done');
        }
    } catch (error) {
        if (parentPort) {
            parentPort.postMessage({ error: error.message });
        }
    }
};

processAll();
