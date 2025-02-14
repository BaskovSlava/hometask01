"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = void 0;
const db_1 = require("../db/db");
const deleteVideoController = (req, res) => {
    const videos = db_1.db.videos; //получаем видео из бд
    const filteredVideos = videos.filter((video) => video.id != req.params.id);
    if (db_1.db.videos.length == filteredVideos.length) {
        res
            .status(404)
            .json("No videos found");
    }
    else {
        db_1.db.videos = filteredVideos;
        res
            .sendStatus(204);
    }
};
exports.deleteVideoController = deleteVideoController;
