export default function errorHandler(controller: Function) {
  return async function () {
    // last argument of socket.io callb[ck is a callback to use it to response to client
    const callback = [].slice.apply(arguments, [0, -1])
    try {
      await controller(...arguments)
    } catch (err) {
      callback(err.message)
      console.log(err)
    }
  }
}
