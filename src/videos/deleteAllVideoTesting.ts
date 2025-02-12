import {Request, Response} from "express";
import {db} from "../db/db";

export const deleteAllVideoTesting = (req: Request, res: Response<any>) => {
    db.videos = []
    res
        .status(204)
        .json('')
}