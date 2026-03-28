const videoService = require('../services/videoService');

const processVideo = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No videos uploaded' });
        }

        const responses = [];

        for (const file of req.files) {
            const inputPath = file.path;
            const filename = file.filename;

            const results = await videoService.processAll(inputPath, filename);

            responses.push({
                original: 'files/videos/original/' + file.filename,
                processedFiles: results
            });
        }

        res.status(200).json({
            message: 'Videos processing started successfully',
            data: responses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    processVideo
};
