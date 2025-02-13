import {Request, Response} from "express";
import {db} from "../db/db";

export const updateVideoController = (req: Request, res: Response) => {
    if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim()) {
        res.sendStatus(400).send({
            errorsMessages: [{
                "message": "Incorrect title",
                "field": "title"
            }],
            resultCode: 1
        })
        return;
    }

    if (!req.body.title) {
        res.sendStatus(404);
        return;
    }
    const foundVideo = db.videos.find(video => video.id === +req.params.id);
    if (!foundVideo) {
        res.sendStatus(404);
        return;
    }
    foundVideo.title = req.body.title;
    res.sendStatus(204).send(foundVideo);
}