"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoController = exports.inputValidation = void 0;
const video_types_1 = require("../input-output-types/video-types");
const db_1 = require("../db/db");
const inputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    // валидация
    if (!video.author || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'error!', field: 'author'
        });
    }
    if (!video.title || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'error!', field: 'title'
        });
    }
    if (video.minAgeRestriction && (video.minAgeRestriction < 1 || video.minAgeRestriction > 18)) {
        errors.errorsMessages.push({
            message: 'error!', field: 'minAgeRestriction'
        });
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !video_types_1.Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!', field: 'availableResolutions'
        });
    }
    // if (typeof video.canBeDownloaded !== 'boolean') {
    //     errors.errorsMessages.push({
    //         message: 'error!', field: 'canBeDownloaded'
    //     })
    // }
    return errors;
};
exports.inputValidation = inputValidation;
const updateVideoController = (req, res) => {
    const errors = (0, exports.inputValidation)(req.body);
    if (errors.errorsMessages.length > 0) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors);
        return;
    }
    const videoId = parseInt(req.params.id, 10);
    const videoIndex = db_1.db.videos.findIndex(v => v.id === videoId);
    if (videoIndex === -1) {
        res.status(404).json({ error: 'Video not found' });
        return;
    }
    const updatedVideo = Object.assign(Object.assign({}, db_1.db.videos[videoIndex]), req.body);
    db_1.db.videos[videoIndex] = updatedVideo;
    res
        .status(200)
        .json(updatedVideo);
};
exports.updateVideoController = updateVideoController;
// import {Request, Response} from "express";
// import {db} from "../db/db";
//
// export const updateVideoController = (req: Request, res: Response) => {
//     if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim()) {
//         res.sendStatus(400).send({
//             errorsMessages: [{
//                 "message": "Incorrect title",
//                 "field": "title"
//             }],
//             resultCode: 1
//         })
//         return;
//     }
//
//     const foundVideo = db.videos.find(video => video.id === +req.params.id);
//     if (!foundVideo) {
//         res.sendStatus(404);
//         return;
//     }
//     foundVideo.title = req.body.title;
//     res.sendStatus(204).send(foundVideo);
// }
