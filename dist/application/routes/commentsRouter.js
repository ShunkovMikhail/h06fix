"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const inputValidation_1 = require("../../inputValidation");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorMapper_1 = require("../../utils/errorMapper");
const users_service_1 = require("../../domain/users-service");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const comments_query_repository_1 = require("../../repositories/query/comments-query-repository");
const comments_service_1 = require("../../domain/comments-service");
exports.commentsRouter = (0, express_1.Router)({});
exports.commentsRouter.put('/:id', auth_middleware_1.authMiddleware, inputValidation_1.CommentVdChain, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (yield comments_query_repository_1.commentsQueryRepo.exists(req.params.id)) {
        if (result.isEmpty()) {
            res.status(201).json(yield comments_service_1.commentsService.update(req));
        }
        else {
            res.status(400).json(yield (0, errorMapper_1.ErrorMapper)(result));
        }
    }
    else {
        res.sendStatus(404);
    }
}));
exports.commentsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield comments_query_repository_1.commentsQueryRepo.exists(req.params.id)) {
        res.status(200).json(yield comments_query_repository_1.commentsQueryRepo.get(req.params.id));
    }
    else {
        res.sendStatus(404);
    }
}));
exports.commentsRouter.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(yield users_service_1.usersService.delete(req));
}));
