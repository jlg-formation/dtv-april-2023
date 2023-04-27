import type { WorkerInputData } from '@/interfaces/WorkerInputData'

self.onmessage = (e: MessageEvent<WorkerInputData>) => {
  console.log(`Message received from main script: `, e.data)
  const workerResult = `Result: ${e.data.i} ${e.data.str}`
  console.log('Posting message back to main script')
  postMessage(workerResult)
}
