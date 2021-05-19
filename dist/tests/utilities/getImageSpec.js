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
var getImage_1 = __importDefault(require("../../utilities/getImage"));
var sharp_1 = __importDefault(require("sharp"));
var path_1 = require("path");
var promises_1 = require("fs/promises");
describe('getImage Module', function () {
    var full = path_1.join(__dirname, '../../images/full');
    var thumb = path_1.join(__dirname, '../../images/thumb');
    var mimg = 'fjord.jpg';
    var simg = ['0', '1', '2', '3', '4', '5'];
    var img, exp1, exp2, exp3, exp4;
    var options = function (w, h) {
        var options = {};
        options.fit = w && h ? sharp_1.default.fit.fill : sharp_1.default.fit.inside;
        if (w)
            options.width = w;
        if (h)
            options.height = h;
        return options;
    };
    var calc = function (img) { return __awaiter(void 0, void 0, void 0, function () {
        var imgMeta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sharp_1.default(img).metadata()];
                case 1:
                    imgMeta = _a.sent();
                    return [2 /*return*/, imgMeta.width + imgMeta.height];
            }
        });
    }); };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, sharp_1.default(path_1.join(full, mimg)).resize(options(100)).toBuffer()];
                case 1:
                    img = _d.sent();
                    return [4 /*yield*/, Promise.all(simg.map(function (x) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sharp_1.default(img)
                                            .toFile(path_1.join(full, x + '.jpg'))
                                            .catch(function (err) {
                                            console.error(err);
                                        })
                                            .then()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, calc(img)];
                case 3:
                    exp1 = _d.sent();
                    _a = calc;
                    return [4 /*yield*/, sharp_1.default(img).resize(options(20)).toBuffer()];
                case 4: return [4 /*yield*/, _a.apply(void 0, [_d.sent()])];
                case 5:
                    exp2 = _d.sent();
                    _b = calc;
                    return [4 /*yield*/, sharp_1.default(img).resize(options(0, 20)).toBuffer()];
                case 6: return [4 /*yield*/, _b.apply(void 0, [_d.sent()])];
                case 7:
                    exp3 = _d.sent();
                    _c = calc;
                    return [4 /*yield*/, sharp_1.default(img).resize(options(20, 20)).toBuffer()];
                case 8: return [4 /*yield*/, _c.apply(void 0, [_d.sent()])];
                case 9:
                    exp4 = _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Full-image Specs', function () {
        it('Non-exist image', function () { return __awaiter(void 0, void 0, void 0, function () {
            var exp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exp = false;
                        return [4 /*yield*/, getImage_1.default('unknown.jpg')
                                .catch(function () {
                                exp = true;
                            })
                                .then()];
                    case 1:
                        _a.sent();
                        expect(exp).toBeTrue;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Exist image', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = calc;
                        return [4 /*yield*/, getImage_1.default(simg[0] + ".jpg")];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        ret = _b.sent();
                        expect(exp1).toBe(ret);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Scaled-to-fit-width Specs', function () {
        it('Exist image without thumb', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = calc;
                        return [4 /*yield*/, getImage_1.default(simg[0] + ".jpg", 20)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        ret = _b.sent();
                        expect(exp2).toBe(ret);
                        return [4 /*yield*/, promises_1.rm(path_1.join(thumb, simg[0] + "20w.jpg"))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Exist image with thumb', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, sharp_1.default(img)
                            .resize(options(20))
                            .toFile(path_1.join(thumb, simg[1] + '20w.jpg'))];
                    case 1:
                        _b.sent();
                        _a = calc;
                        return [4 /*yield*/, getImage_1.default(simg[1] + ".jpg", 20)];
                    case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 3:
                        ret = _b.sent();
                        expect(exp2).toBe(ret);
                        return [4 /*yield*/, promises_1.rm(path_1.join(thumb, simg[1] + "20w.jpg"))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Scaled-to-fit-height Specs', function () {
        it('Exist image without thumb', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = calc;
                        return [4 /*yield*/, getImage_1.default(simg[2] + ".jpg", 0, 20)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2:
                        ret = _b.sent();
                        expect(exp3).toBe(ret);
                        return [4 /*yield*/, promises_1.rm(path_1.join(thumb, simg[2] + "20h.jpg"))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Exist image with thumb', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, sharp_1.default(img)
                            .resize(options(0, 20))
                            .toFile(path_1.join(thumb, simg[3] + '20h.jpg'))];
                    case 1:
                        _b.sent();
                        _a = calc;
                        return [4 /*yield*/, getImage_1.default(simg[3] + ".jpg", 0, 20)];
                    case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 3:
                        ret = _b.sent();
                        expect(exp3).toBe(ret);
                        return [4 /*yield*/, promises_1.rm(path_1.join(thumb, simg[3] + "20h.jpg"))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Resized Specs', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            it('Exist image without thumb', function () { return __awaiter(void 0, void 0, void 0, function () {
                var ret, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = calc;
                            return [4 /*yield*/, getImage_1.default(simg[4] + ".jpg", 20, 20)];
                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                        case 2:
                            ret = _b.sent();
                            expect(exp4).toBe(ret);
                            return [4 /*yield*/, promises_1.rm(path_1.join(thumb, simg[4] + "20w20h.jpg"))];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Exist image with thumb', function () { return __awaiter(void 0, void 0, void 0, function () {
                var ret, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, sharp_1.default(img)
                                .resize(options(20, 20))
                                .toFile(path_1.join(thumb, simg[5] + '20w20h.jpg'))];
                        case 1:
                            _b.sent();
                            _a = calc;
                            return [4 /*yield*/, getImage_1.default(simg[5] + ".jpg", 20, 20)];
                        case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                        case 3:
                            ret = _b.sent();
                            expect(exp4).toBe(ret);
                            return [4 /*yield*/, promises_1.rm(path_1.join(thumb, simg[5] + "20w20h.jpg"))];
                        case 4:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(simg.map(function (x) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, promises_1.rm(path_1.join(full, x + '.jpg'))
                                        .catch(function () { })
                                        .then()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getImageSpec.js.map