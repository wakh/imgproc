'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var getImage_1 = __importDefault(require('../../utilities/getImage'));
var jimp_1 = require('jimp');
var path_1 = require('path');
var promises_1 = require('fs/promises');
describe('getImage Module', function () {
  var full = path_1.join(__dirname, '../../images/full');
  var thumb = path_1.join(__dirname, '../../images/thumb');
  var simg = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  var exp1;
  var exp2;
  var exp3;
  var exp4;
  beforeAll(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var img;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, jimp_1.read(path_1.join(full, 'fjord.jpg'))];
          case 1:
            img = _a.sent().scaleToFit(100, Number.MAX_SAFE_INTEGER);
            return [
              4 /*yield*/,
              Promise.all(
                simg.map(function (x) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          return [
                            4 /*yield*/,
                            img
                              .clone()
                              .writeAsync(path_1.join(full, x + '.jpg'))
                              .then()
                          ];
                        case 1:
                          _a.sent();
                          return [2 /*return*/];
                      }
                    });
                  });
                })
              )
            ];
          case 2:
            _a.sent();
            exp1 = img.hash();
            exp2 = img.clone().scaleToFit(20, Number.MAX_SAFE_INTEGER).hash();
            exp3 = img.clone().scaleToFit(Number.MAX_SAFE_INTEGER, 20).hash();
            exp4 = img.clone().resize(20, 20).hash();
            return [
              4 /*yield*/,
              img
                .clone()
                .scaleToFit(20, Number.MAX_SAFE_INTEGER)
                .writeAsync(path_1.join(thumb, simg[2] + '.jpg'))
            ];
          case 3:
            _a.sent();
            return [
              4 /*yield*/,
              img
                .clone()
                .scaleToFit(10, Number.MAX_SAFE_INTEGER)
                .writeAsync(path_1.join(thumb, simg[3] + '.jpg'))
            ];
          case 4:
            _a.sent();
            return [
              4 /*yield*/,
              img
                .clone()
                .resize(20, 20)
                .writeAsync(path_1.join(thumb, simg[5] + '.jpg'))
            ];
          case 5:
            _a.sent();
            return [
              4 /*yield*/,
              img
                .clone()
                .resize(10, 10)
                .writeAsync(path_1.join(thumb, simg[6] + '.jpg'))
            ];
          case 6:
            _a.sent();
            return [
              4 /*yield*/,
              img
                .clone()
                .resize(10, 20)
                .writeAsync(path_1.join(thumb, simg[7] + '.jpg'))
            ];
          case 7:
            _a.sent();
            return [
              4 /*yield*/,
              img
                .clone()
                .resize(20, 10)
                .writeAsync(path_1.join(thumb, simg[8] + '.jpg'))
            ];
          case 8:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
  describe('Full-image Specs', function () {
    it('Non-exist image', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var exp;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              exp = false;
              return [
                4 /*yield*/,
                getImage_1
                  .default('unknown.jpg')
                  .catch(function () {
                    exp = true;
                  })
                  .then()
              ];
            case 1:
              _a.sent();
              expect(exp).toBeTrue;
              return [2 /*return*/];
          }
        });
      });
    });
    it('Exist image', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = jimp_1.read;
              return [4 /*yield*/, getImage_1.default(simg[0] + '.jpg')];
            case 1:
              return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
              ret = _b.sent().hash();
              expect(exp1).toBe(ret);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe('Scaled-to-fit-width Specs', function () {
    it('Exist image with no thumb', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = jimp_1.read;
              return [4 /*yield*/, getImage_1.default(simg[0] + '.jpg', 20)];
            case 1:
              return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
              ret = _b.sent().hash();
              expect(exp2).toBe(ret);
              return [2 /*return*/];
          }
        });
      });
    });
    it('Exist image with size-matched thumb', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = jimp_1.read;
              return [4 /*yield*/, getImage_1.default(simg[1] + '.jpg', 20)];
            case 1:
              return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
              ret = _b.sent().hash();
              expect(exp2).toBe(ret);
              return [2 /*return*/];
          }
        });
      });
    });
    it('Exist image with size-unmatched thumb', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = jimp_1.read;
              return [4 /*yield*/, getImage_1.default(simg[2] + '.jpg', 20)];
            case 1:
              return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
              ret = _b.sent().hash();
              expect(exp2).toBe(ret);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe('Scaled-to-fit-height Specs', function () {
    it('Exist image with no thumb', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = jimp_1.read;
              return [4 /*yield*/, getImage_1.default(simg[3] + '.jpg', 0, 20)];
            case 1:
              return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
              ret = _b.sent().hash();
              expect(exp3).toBe(ret);
              return [2 /*return*/];
          }
        });
      });
    });
    it('Exist image with size-matched thumb', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = jimp_1.read;
              return [4 /*yield*/, getImage_1.default(simg[4] + '.jpg', 0, 20)];
            case 1:
              return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
              ret = _b.sent().hash();
              expect(exp3).toBe(ret);
              return [2 /*return*/];
          }
        });
      });
    });
    it('Exist image with size-unmatched thumb', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = jimp_1.read;
              return [4 /*yield*/, getImage_1.default(simg[5] + '.jpg', 0, 20)];
            case 1:
              return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
              ret = _b.sent().hash();
              expect(exp3).toBe(ret);
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe('Resized Specs', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        it('Exist image with no thumb', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _a = jimp_1.read;
                  return [
                    4 /*yield*/,
                    getImage_1.default(simg[6] + '.jpg', 20, 20)
                  ];
                case 1:
                  return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                  ret = _b.sent().hash();
                  expect(exp4).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        it('Exist image with size-matched thumb', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _a = jimp_1.read;
                  return [
                    4 /*yield*/,
                    getImage_1.default(simg[7] + '.jpg', 20, 20)
                  ];
                case 1:
                  return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                  ret = _b.sent().hash();
                  expect(exp4).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        it('Exist image with size-unmatched thumb', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _a = jimp_1.read;
                  return [
                    4 /*yield*/,
                    getImage_1.default(simg[8] + '.jpg', 20, 20)
                  ];
                case 1:
                  return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                  ret = _b.sent().hash();
                  expect(exp4).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        it('Exist image with width-unmatched thumb', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _a = jimp_1.read;
                  return [
                    4 /*yield*/,
                    getImage_1.default(simg[9] + '.jpg', 20, 20)
                  ];
                case 1:
                  return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                  ret = _b.sent().hash();
                  expect(exp4).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        it('Exist image with height-unmatched thumb', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var ret, _a;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _a = jimp_1.read;
                  return [
                    4 /*yield*/,
                    getImage_1.default(simg[10] + '.jpg', 20, 20)
                  ];
                case 1:
                  return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                  ret = _b.sent().hash();
                  expect(exp4).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        return [2 /*return*/];
      });
    });
  });
  afterAll(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              Promise.all(
                simg.map(function (x) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          return [
                            4 /*yield*/,
                            promises_1
                              .rm(path_1.join(full, x + '.jpg'))
                              .catch(function () {})
                              .then()
                          ];
                        case 1:
                          _a.sent();
                          return [
                            4 /*yield*/,
                            promises_1
                              .rm(path_1.join(thumb, x + '.jpg'))
                              .catch(function () {})
                              .then()
                          ];
                        case 2:
                          _a.sent();
                          return [2 /*return*/];
                      }
                    });
                  });
                })
              )
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
});
//# sourceMappingURL=getImageSpec.js.map