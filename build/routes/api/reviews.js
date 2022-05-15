"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var reviewController_1 = __importDefault(require("../../controllers/api/reviewController"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var store_1 = __importDefault(require("../../middlewares/validation/api/reviews/store"));
var reviews = express_1.default.Router();
reviews.post('/', [auth_1.default], store_1.default, reviewController_1.default.store);
reviews.get('/:id', reviewController_1.default.index);
exports.default = reviews;
