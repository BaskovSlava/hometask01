"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllVideoTesting = void 0;
const db_1 = require("../db/db");
const deleteAllVideoTesting = (req, res) => {
    db_1.db.videos = [];
    res
        .sendStatus(204);
};
exports.deleteAllVideoTesting = deleteAllVideoTesting;
