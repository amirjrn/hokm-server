export default function errorHandler(logger) {
  return function (controller: Function) {
    return async function () {
      // last argument of socket.io callback is another callback to use it to response to client
      const callback = arguments[arguments.length - 1]
      try {
        await controller(...arguments)
      } catch (err) {
        callback(err.message)
        logger.log(err.message)
      }
    }
  }
}
