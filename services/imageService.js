const { Worker } = require('worker_threads');
const path = require('path');

const processAll = (inputPath, originalName) => {
    return new Promise((resolve) => {
        new Worker(path.join(__dirname, 'imageWorker.js'), {
            workerData: { inputPath, originalName }
        });
        
        const results = {
            thumbSmall: `files/images/small/${originalName}`,
            thumbMedium: `files/images/medium/${originalName}`,
            thumbLarge: `files/images/large/${originalName}`,
            blur: `files/images/blur/${originalName}`,
            filterGreyscale: `files/images/grayscale/${originalName}`,
            filterSepia: `files/images/sepia/${originalName}`
        };
        
        resolve(results);
    });
};

module.exports = {
    processAll
};
