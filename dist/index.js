"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getImage_1 = __importDefault(require("./utilities/getImage"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
getImage_1.default('fjord.jpg', 20, 20).catch(function (err) {
    console.error(err.toString());
}).then(function (ret) {
    console.log(ret);
});
//# sourceMappingURL=index.js.map