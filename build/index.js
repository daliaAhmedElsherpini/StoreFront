"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./routes/api"));
// const cors = require('cors')
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
// Api Routes
app.use('/api/', api_1.default);
app.use('/', function (_req, res) {
    res.json('Welcome To Our App');
});
// server
app.listen(port, function () {
    console.log("listening to the port : ".concat(port));
});
exports.default = app;
