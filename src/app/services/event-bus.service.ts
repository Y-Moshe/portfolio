function createEventEmitter() {
  const listenersMap: any = {}
  return {
    on(eventName: string, listener: any) {
      listenersMap[eventName] = listenersMap[eventName]
        ? [...listenersMap[eventName], listener]
        : [listener]
      return () => {
        listenersMap[eventName] = listenersMap[eventName].filter(
          (func: any) => func !== listener
        )
      }
    },
    emit(eventName: string, data: any) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach((listener: any) => listener(data))
    },
  }
}

export const eventBus = createEventEmitter()
export const events = {
  EDIT_PROJECT: 'EDIT_PROJECT',
}
