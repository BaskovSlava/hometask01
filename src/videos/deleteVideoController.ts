import {Request, Response} from "express";
import {db} from "../db/db";

export const deleteVideoController = (req: Request, res: Response<any>) => {
    const videos = db.videos //получаем видео из бд
    const filteredVideos = videos.filter((video) => video.id !== req.params.id)
    if (db.videos.length === filteredVideos.length) {
        res
            .status(404)
            .json("No videos found")
    } else {
        db.videos = filteredVideos;
        res
            .sendStatus(204)
    }
}