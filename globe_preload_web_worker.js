self.addEventListener('message', async event => {
    const response = await fetch(event.data[1])
    const blob = await response.blob()
    self.postMessage([event.data[0], blob])
})