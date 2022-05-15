"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var countriesController_1 = __importDefault(require("../../controllers/api/countriesController"));
var countries = express_1.default.Router();
countries.get('/', countriesController_1.default.index);
countries.get('/:id', countriesController_1.default.show);
exports.default = countries;
