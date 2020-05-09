export default function errorHandler(controller: Function) {
    return async function () {
        const callback = [].pop.apply(arguments);
        try {
            await controller(...arguments);
        }
        catch (err) {
            callback(err.message)
            console.log(err.message)
        }
    }
}