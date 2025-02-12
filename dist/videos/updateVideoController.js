"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoController = void 0;
const db_1 = require("../db/db");
const updateVideoController = (req, res) => {
    if (!req.body.title) {
        res.sendStatus(404);
        return;
    }
    const foundVideo = db_1.db.videos.find(video => video.id === +req.params.id);
    if (!foundVideo) {
        res.sendStatus(404);
        return;
    }
    foundVideo.title = req.body.title;
    res.sendStatus(204);
};
exports.updateVideoController = updateVideoController;
