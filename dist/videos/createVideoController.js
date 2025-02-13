"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = exports.inputValidation = void 0;
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
    if (!Array.isArray(video.availableResolution) || video.availableResolution.find(p => !video_types_1.Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!', field: 'availableResolutions'
        });
    }
    return errors;
};
exports.inputValidation = inputValidation;
const createVideoController = (req, res) => {
    const errors = (0, exports.inputValidation)(req.body);
    if (errors.errorsMessages.length > 0) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors);
        return;
    }
    if (!req.body.title || !req.body.author) {
        res.sendStatus(400);
        return;
    }
    // если все ок - добавляем видео
    const date = new Date();
    const newVideo /*VideoDBType*/ = Object.assign(Object.assign({}, req.body), { id: Date.now(), title: req.body.title, author: req.body.author, canBeDownloaded: false, minAgeRestriction: null, createdAt: date.toISOString(), publicationDate: new Date(date.setDate(date.getDate() + 1)) });
    db_1.db.videos = [...db_1.db.videos, newVideo];
    res
        .status(201)
        .json(newVideo);
};
exports.createVideoController = createVideoController;
