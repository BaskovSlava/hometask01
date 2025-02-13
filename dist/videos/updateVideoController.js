"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoController = void 0;
const db_1 = require("../db/db");
const updateVideoController = (req, res) => {
    if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim()) {
        res.sendStatus(400).send({
            errorsMessages: [{
                    "message": "Incorrect title",
                    "field": "title"
                }],
            resultCode: 1
        });
        return;
    }
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
    res.sendStatus(204).send(foundVideo);
};
exports.updateVideoController = updateVideoController;
