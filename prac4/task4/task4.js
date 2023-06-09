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
var os = require('os');
var si = require('systeminformation');
// Функція для виведення системної інформації
function printSystemInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var cpuInfo, _i, _a, core, cpuTemperature, graphicsControllers, memoryInfo, batteryInfo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Operating System:', os.platform());
                    console.log('Architecture:', os.arch());
                    console.log('Current User Name:', os.userInfo().username);
                    return [4 /*yield*/, si.cpu()];
                case 1:
                    cpuInfo = _b.sent();
                    console.log('CPU Cores Models:');
                    for (_i = 0, _a = Object.values(cpuInfo.cores); _i < _a.length; _i++) {
                        core = _a[_i];
                        console.log(core.model);
                    }
                    return [4 /*yield*/, si.cpuTemperature()];
                case 2:
                    cpuTemperature = _b.sent();
                    console.log('CPU Temperature:', cpuTemperature.main);
                    return [4 /*yield*/, si.graphics()];
                case 3:
                    graphicsControllers = _b.sent();
                    console.log('Graphic Controllers:');
                    graphicsControllers.controllers.forEach(function (controller) {
                        console.log('  Vendor:', controller.vendor);
                        console.log('  Model:', controller.model);
                    });
                    return [4 /*yield*/, si.mem()];
                case 4:
                    memoryInfo = _b.sent();
                    console.log('Total Memory:', (memoryInfo.total / 1024 / 1024 / 1024).toFixed(2), 'GB');
                    console.log('Used Memory:', (memoryInfo.used / 1024 / 1024 / 1024).toFixed(2), 'GB');
                    console.log('Free Memory:', (memoryInfo.free / 1024 / 1024 / 1024).toFixed(2), 'GB');
                    return [4 /*yield*/, si.battery()];
                case 5:
                    batteryInfo = _b.sent();
                    console.log('Battery:');
                    console.log('  Charging:', batteryInfo.ischarging ? 'Yes' : 'No');
                    console.log('  Percent:', batteryInfo.percent);
                    console.log('  Remaining Time:', batteryInfo.timeleft);
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    var frequencyInSeconds = Number(process.argv[2]);
    if (isNaN(frequencyInSeconds)) {
        console.error('Please provide a valid frequency in seconds.');
        return;
    }
    setInterval(printSystemInfo, frequencyInSeconds * 1000);
}
main();
