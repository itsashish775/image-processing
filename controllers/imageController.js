const imageService = require('../services/imageService');

const processImage = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        const responses = [];

        for (const file of req.files) {
            const inputPath = file.path;
            const filename = file.filename;

            const results = await imageService.processAll(inputPath, filename);

            responses.push({
                original: 'files/images/original/' + file.filename,
                processedFiles: results
            });
        }

        res.status(200).json({
            message: 'Images processed successfully',
            data: responses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    processImage
};
