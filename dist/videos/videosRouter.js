"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const getVideosController_1 = require("./getVideosController");
const createVideoController_1 = require("./createVideoController");
const findVideoController_1 = require("./findVideoController");
const deleteVideoController_1 = require("./deleteVideoController");
const updateVideoController_1 = require("./updateVideoController");
const deleteAllVideoTesting_1 = require("./deleteAllVideoTesting");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', getVideosController_1.getVideosController);
exports.videosRouter.post('/', createVideoController_1.createVideoController);
exports.videosRouter.get('/:id', findVideoController_1.findVideoController);
exports.videosRouter.delete('/:id', deleteVideoController_1.deleteVideoController);
exports.videosRouter.put('/:id', updateVideoController_1.updateVideoController);
exports.videosRouter.delete('/', deleteAllVideoTesting_1.deleteAllVideoTesting);
// не забудьте добавить роут в апп
