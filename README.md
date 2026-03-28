# Image and Video Processing API

A Node.js Express API that automates image filter application and video transcoding pipelines using background `worker_threads`. Built on `Express`, `Jimp`, and `fluent-ffmpeg`.

## Setup
1. Run `npm install`
2. Run `npm start`
3. The server listens on `http://localhost:3000`.

## Features
- **Concurrent Worker Processing**: All CPU-intensive media transformations are delegated to background threads. The API yields projected file paths instantly without waiting for long encoding processes to finish.
- **Image Transmutations**: Automatically creates `small`, `medium`, and `large` thumbnails, alongside `blur`, `grayscale`, and `sepia` stylistic filters per upload.
- **Video Encodings**: Upload videos to automatically spawn encoders scaling outputs natively to `144p`, `240p`, `360p`, `720p`, and `1080p`.

## Endpoints

### 1. Process Images
- **URL**: `POST /api/image/process`
- **Body**: `multipart/form-data`
- **Field Name**: `files` (Accepts multiple file attachments)

### 2. Process Videos
- **URL**: `POST /api/video/process`
- **Body**: `multipart/form-data`
- **Field Name**: `files` (Accepts multiple file attachments)
