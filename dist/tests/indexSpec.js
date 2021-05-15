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
var supertest_1 = __importDefault(require('supertest'));
var index_1 = __importDefault(require('../index'));
var jimp_1 = __importDefault(require('jimp'));
var path_1 = require('path');
var promises_1 = require('fs/promises');
describe('SuperTest', function () {
  it('GET /', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              supertest_1
                .default(index_1.default)
                .get('/')
                .expect(200)
                .catch(function (err) {
                  console.error(err.toString());
                })
                .then()
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
  it('GET /api', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              supertest_1
                .default(index_1.default)
                .get('/api')
                .catch(function (err) {
                  console.error(err.toString());
                })
                .then()
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
  describe('GET /api/images', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var full, thumb, simg, img;
      return __generator(this, function (_a) {
        full = path_1.join(__dirname, '../images/full');
        thumb = path_1.join(__dirname, '../images/thumb');
        simg = ['11', '12', '13', '14'];
        beforeAll(function () {
          return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    jimp_1.default.read(path_1.join(full, 'fjord.jpg'))
                  ];
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
                  return [2 /*return*/];
              }
            });
          });
        });
        it('w/o parameters', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    supertest_1
                      .default(index_1.default)
                      .get('/api/images')
                      .expect(400)
                      .catch(function (err) {
                        console.error(err.toString());
                      })
                      .then()
                  ];
                case 1:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        });
        it('filename=unknown.jpg', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    supertest_1
                      .default(index_1.default)
                      .get('/api/images')
                      .query({
                        filename: 'unknown.jpg'
                      })
                      .expect(404)
                      .catch(function (err) {
                        console.error(err.toString());
                      })
                      .then()
                  ];
                case 1:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        });
        it('filename=exist.jpg', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var exp, ret, _a, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  exp = img.hash();
                  _b = (_a = jimp_1.default).read;
                  return [
                    4 /*yield*/,
                    supertest_1
                      .default(index_1.default)
                      .get('/api/images')
                      .query({
                        filename: '11.jpg'
                      })
                      .expect(200)
                      .expect('Content-Type', 'image/jpeg')
                      .catch(function (err) {
                        console.error(err.toString());
                      })
                      .then()
                  ];
                case 1:
                  return [4 /*yield*/, _b.apply(_a, [_c.sent().body])];
                case 2:
                  ret = _c.sent().hash();
                  expect(exp).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        it('filename=exist.jpg, width=10', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var exp, ret, _a, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  exp = img
                    .clone()
                    .scaleToFit(10, Number.MAX_SAFE_INTEGER)
                    .hash();
                  _b = (_a = jimp_1.default).read;
                  return [
                    4 /*yield*/,
                    supertest_1
                      .default(index_1.default)
                      .get('/api/images')
                      .query({
                        filename: '12.jpg',
                        width: 10
                      })
                      .expect(200)
                      .expect('Content-Type', 'image/jpeg')
                      .catch(function (err) {
                        console.error(err.toString());
                      })
                      .then()
                  ];
                case 1:
                  return [4 /*yield*/, _b.apply(_a, [_c.sent().body])];
                case 2:
                  ret = _c.sent().hash();
                  expect(exp).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        it('filename=exist.jpg, height=10', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var exp, ret, _a, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  exp = img
                    .clone()
                    .scaleToFit(Number.MAX_SAFE_INTEGER, 10)
                    .hash();
                  _b = (_a = jimp_1.default).read;
                  return [
                    4 /*yield*/,
                    supertest_1
                      .default(index_1.default)
                      .get('/api/images')
                      .query({
                        filename: '13.jpg',
                        height: 10
                      })
                      .expect(200)
                      .expect('Content-Type', 'image/jpeg')
                      .catch(function (err) {
                        console.error(err.toString());
                      })
                      .then()
                  ];
                case 1:
                  return [4 /*yield*/, _b.apply(_a, [_c.sent().body])];
                case 2:
                  ret = _c.sent().hash();
                  expect(exp).toBe(ret);
                  return [2 /*return*/];
              }
            });
          });
        });
        it('filename=exist.jpg, width=10, height=10', function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var exp, ret, _a, _b;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  exp = img.clone().resize(10, 10).hash();
                  _b = (_a = jimp_1.default).read;
                  return [
                    4 /*yield*/,
                    supertest_1
                      .default(index_1.default)
                      .get('/api/images')
                      .query({
                        filename: '14.jpg',
                        width: 10,
                        height: 10
                      })
                      .expect(200)
                      .expect('Content-Type', 'image/jpeg')
                      .catch(function (err) {
                        console.error(err.toString());
                      })
                      .then()
                  ];
                case 1:
                  return [4 /*yield*/, _b.apply(_a, [_c.sent().body])];
                case 2:
                  ret = _c.sent().hash();
                  expect(exp).toBe(ret);
                  return [2 /*return*/];
              }
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
        return [2 /*return*/];
      });
    });
  });
});
//# sourceMappingURL=indexSpec.js.map
