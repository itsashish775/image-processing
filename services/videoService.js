const { Worker } = require('worker_threads');
const path = require('path');

const processAll = (inputPath, originalName) => {
    return new Promise((resolve) => {
        new Worker(path.join(__dirname, 'videoWorker.js'), {
            workerData: { inputPath, originalName }
        });
        
        const results = {
            '144p': `files/videos/144p/${originalName}`,
            '240p': `files/videos/240p/${originalName}`,
            '360p': `files/videos/360p/${originalName}`,
            '720p': `files/videos/720p/${originalName}`,
            '1080p': `files/videos/1080p/${originalName}`
        };
        
        resolve(results);
    });
};

module.exports = {
    processAll
};
