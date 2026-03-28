const express = require('express');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.join(process.cwd(), 'files')));

app.use('/api/image', imageRoutes);
app.use('/api/video', videoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
