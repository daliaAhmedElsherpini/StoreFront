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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var wishlist_1 = require("../models/wishlist");
var request = (0, supertest_1.default)(index_1.default);
var model = new wishlist_1.WishlistModel();
describe('Test Wishlist endpoint responses ', function () {
    describe('Test Wishlist endpoint responses ', function () {
        var token = '';
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            email: 'daliaahmed@gmail.com',
                            password: 'dalia123',
                        };
                        return [4 /*yield*/, request
                                .post('/api/auth/login')
                                .set('Content-type', 'application/json')
                                .send(data)];
                    case 1:
                        response = _a.sent();
                        token = response.body.data.token;
                        return [2 /*return*/];
                }
            });
        }); });
        // get all wishlist products of a user with id 1
        it('get all wishlist products of a user with id 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/wishlist/1')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        // add or remove from wishlist
        it('add or remove from wishlist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            user_id: 1,
                            product_id: 1,
                        };
                        return [4 /*yield*/, request
                                .post('/api/wishlist')
                                .set('Content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))
                                .send(data)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        // add or remove from wishlist with wrong user id
        it('add or remove from wishlist with wrong user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            user_id: 1777,
                            product_id: 1,
                        };
                        return [4 /*yield*/, request
                                .post('/api/wishlist')
                                .set('Content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))
                                .send(data)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(422);
                        return [2 /*return*/];
                }
            });
        }); });
        // add or remove from wishlist with wrong product id
        it('add or remove from wishlist with wrong user_id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            user_id: 1,
                            product_id: 188888,
                        };
                        return [4 /*yield*/, request
                                .post('/api/wishlist')
                                .set('Content-type', 'application/json')
                                .set('Authorization', "Bearer ".concat(token))
                                .send(data)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(422);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Test Wishlist Model Methods ', function () {
        it('check get method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.get()];
                    case 1:
                        result = _a.sent();
                        expect(typeof result).toBe('object');
                        return [2 /*return*/];
                }
            });
        }); });
        it('check find method to be object', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, store, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            user_id: 1,
                            product_id: 1,
                        };
                        return [4 /*yield*/, model.store(data)];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, model.find(store.id)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, model.destroy(store.id)];
                    case 3:
                        _a.sent();
                        expect(typeof result).toBe('object');
                        return [2 /*return*/];
                }
            });
        }); });
        it('check find method id to be as expexted id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, store, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            user_id: 1,
                            product_id: 1,
                        };
                        return [4 /*yield*/, model.store(data)];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, model.find(store.id)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, model.destroy(store.id)];
                    case 3:
                        _a.sent();
                        expect(result.id).toBe(store.id);
                        return [2 /*return*/];
                }
            });
        }); });
        it('check store method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, result, user_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            user_id: 1,
                            product_id: 1,
                        };
                        return [4 /*yield*/, model.store(data)];
                    case 1:
                        result = _a.sent();
                        user_id = result.user_id.toString();
                        expect(user_id).toBe('1');
                        return [2 /*return*/];
                }
            });
        }); });
        it('check delete method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, store, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            user_id: 1,
                            product_id: 1,
                        };
                        return [4 /*yield*/, model.store(data)];
                    case 1:
                        store = _a.sent();
                        return [4 /*yield*/, model.destroy(store.id)];
                    case 2:
                        result = _a.sent();
                        expect(typeof result).toBe('object');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
