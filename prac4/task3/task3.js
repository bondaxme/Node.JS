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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var axios = require('axios');
var path = require('path');
var fs = require('fs');
// Функція для асинхронного зчитування файлу JSON
function readJSONFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.readFile(filePath, 'utf8', function (err, data) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        try {
                            var jsonData = JSON.parse(data);
                            resolve(jsonData);
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                })];
        });
    });
}
// Отримання HTML-вмісту за URL-адресою та збереження в файлі
function saveHTMLContent(url, folderPath) {
    return __awaiter(this, void 0, void 0, function () {
        var response, htmlContent, fileName, filePath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get(url)];
                case 1:
                    response = _a.sent();
                    htmlContent = response.data;
                    fileName = url.substring(url.lastIndexOf('/') + 1) + '.html';
                    filePath = path.join(folderPath, fileName);
                    fs.writeFileSync(filePath, htmlContent);
                    console.log("Saved HTML content from ".concat(url, " to ").concat(filePath));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error saving HTML content from ".concat(url, ": ").concat(error_1.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var jsonFilePath, jsonData, folderName, folderPath, _i, jsonData_1, url, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonFilePath = process.argv[2];
                    if (!jsonFilePath) {
                        console.error('Please provide a path to the JSON file.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, readJSONFile(jsonFilePath)];
                case 2:
                    jsonData = _a.sent();
                    folderName = path.basename(jsonFilePath, path.extname(jsonFilePath)) + '_pages';
                    folderPath = path.join(__dirname, folderName);
                    fs.mkdirSync(folderPath);
                    _i = 0, jsonData_1 = jsonData;
                    _a.label = 3;
                case 3:
                    if (!(_i < jsonData_1.length)) return [3 /*break*/, 6];
                    url = jsonData_1[_i];
                    return [4 /*yield*/, saveHTMLContent(url, folderPath)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log('HTML content saved successfully.');
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.error("Error reading or parsing the JSON file: ".concat(error_2.message));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
main();
