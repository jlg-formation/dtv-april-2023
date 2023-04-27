self.onmessage = (e: MessageEvent<string>) => {
  console.log(`Message received from main script: ${e.data}`)
  const workerResult = `Result: ${e.data}`
  console.log('Posting message back to main script')
  postMessage(workerResult)
}
