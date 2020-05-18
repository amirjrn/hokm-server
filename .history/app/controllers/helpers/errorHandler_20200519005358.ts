export default function errorHandler(controller: Function) {
  return async function () {
    // last argument of socket.io callback is a callback to use it to response to client
    const callback = [].pop.apply(arguments)
    try {
      await controller(...arguments)
    } catch (err) {
      callback(err.message)
      console.log(err.message)
    }
  }
}
