"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responses_1 = require("../handlers/responses");
var jwt = require('jsonwebtoken');
var verifyAuthToken = function (req, res, next) {
    var authorizationHeader = req.headers.authorization;
    var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res
            .status(401)
            .json((0, responses_1.errorResponse)('Invalid Token ,, you have to be loggedin to visit this url'));
        return;
    }
};
exports.default = verifyAuthToken;
