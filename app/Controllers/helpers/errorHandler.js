"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(controller) {
    return async function () {
        const callback = [].pop.apply(arguments);
        try {
            await controller(...arguments);
        }
        catch (err) {
            callback(err.message);
            console.log(err.message);
        }
    };
}
exports.default = errorHandler;
