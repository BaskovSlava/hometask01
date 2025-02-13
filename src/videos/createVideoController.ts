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
    if (!Array.isArray(video.availableResolution) || video.availableResolution.find(p => !Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!', field: 'availableResolutions'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<any | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length > 0) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
    }
    if (!req.body.title || !req.body.author) {
        res.sendStatus(400);
        return;
    }
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim()) {
        res.sendStatus(400).send({
            errorsMessages: [{
                "message": "Incorrect title",
                "field": "title"
            }],
            resultCode: 1
        })
    return;
}

    // если все ок - добавляем видео
    const date = new Date();
    const newVideo: any /*VideoDBType*/ = {
        ...req.body,
        id: +(Date.now()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: new Date(date.setDate(date.getDate() + 1))
    }
    db.videos = [...db.videos, newVideo]

    res
        .status(201)
        .send(newVideo)
}


