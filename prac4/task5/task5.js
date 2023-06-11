var MyEventEmitter = /** @class */ (function () {
    function MyEventEmitter() {
        this.eventHandlers = {};
    }
    MyEventEmitter.prototype.registerHandler = function (eventName, handler) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    };
    MyEventEmitter.prototype.emitEvent = function (eventName) {
        var handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(function (handler) { return handler(); });
        }
    };
    return MyEventEmitter;
}());
// Приклад використання
var emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', function () { return console.log('Обліковий запис користувача оновлено'); });
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено
