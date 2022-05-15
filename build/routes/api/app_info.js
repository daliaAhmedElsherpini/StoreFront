"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var appInfoController_1 = __importDefault(require("../../controllers/api/appInfoController"));
var appInfo = express_1.default.Router();
appInfo.get('/', appInfoController_1.default.index);
exports.default = appInfo;
