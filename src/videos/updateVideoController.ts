import {Request, Response} from 'express'
import {OutputErrorsType} from "../input-output-types/output-errors-type"
import {InputVideoType, Resolutions} from '../input-output-types/video-types'
import {db} from "../db/db";

export const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }
    // валидация
    if (!video.author || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'error!', field: 'author'
        })
    }
    if (!video.title || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'error!', field: 'title'
        })
    }
    if (video.minAgeRestriction && (video.minAgeRestriction < 1 || video.minAgeRestriction > 18)) {
        errors.errorsMessages.push({
            message: 'error!', field: 'minAgeRestriction'
        })
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!', field: 'availableResolutions'
        })
    }
    // if (typeof video.canBeDownloaded !== 'boolean') {
    //     errors.errorsMessages.push({
    //         message: 'error!', field: 'canBeDownloaded'
    //     })
    // }
    return errors
}

export const updateVideoController = (req: Request<any, any, InputVideoType>, res: Response<any | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length > 0) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
    }

    const videoId = parseInt(req.params.id, 10);
    const videoIndex = db.videos.findIndex(v => v.id === videoId);

    if (videoIndex === -1) {
        res.status(404).json({ error: 'Video not found' });
        return;
    }

    const updatedVideo = { ...db.videos[videoIndex], ...req.body };
    db.videos[videoIndex] = updatedVideo;

    res
        .status(200)
        .json(updatedVideo)
}


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