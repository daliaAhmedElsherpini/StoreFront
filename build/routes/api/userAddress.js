"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var addressController_1 = __importDefault(require("../../controllers/api/addressController"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var store_1 = __importDefault(require("../../middlewares/validation/api/addresses/store"));
var address = express_1.default.Router();
address.get('/show/:id', [auth_1.default], addressController_1.default.show);
address.get('/:id', [auth_1.default], addressController_1.default.index);
address.post('/', [auth_1.default], store_1.default, addressController_1.default.store);
address.put('/:id', [auth_1.default], store_1.default, addressController_1.default.update);
address.delete('/:id', [auth_1.default], addressController_1.default.destroy);
exports.default = address;
