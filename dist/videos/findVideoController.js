"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVideoController = void 0;
const db_1 = require("../db/db");
const findVideoController = (req, res) => {
    const videos = db_1.db.videos; // получаем все видео из базы данных
    console.log(videos);
    const video = videos.find(video => video.id === +req.params.id);
    video ?
        res
            .status(200)
            .json(video) // отдаем видео
        : res
            .status(404)
            .json();
};
exports.findVideoController = findVideoController;
