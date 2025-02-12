import {Request, Response} from "express";
import {db} from "../db/db";

export const findVideoController = (req: Request, res: Response<any>) => {
    const videos = db.videos // получаем все видео из базы данных
    const video = videos.find(video => video.id === req.params.id)
    video ?
        res
            .status(200)
            .json(video) // отдаем видео
        : res
            .status(404)
            .json()
}