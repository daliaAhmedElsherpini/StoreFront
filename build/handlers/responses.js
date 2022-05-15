"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.sendResponse = void 0;
var sendResponse = function (result, message) {
    var response = {
        success: true,
        message: message,
        data: result,
    };
    return response;
};
exports.sendResponse = sendResponse;
var errorResponse = function (message) {
    var response = {
        success: false,
        message: message,
    };
    return response;
};
exports.errorResponse = errorResponse;
