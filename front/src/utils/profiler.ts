import { BehaviorSubject } from 'rxjs'

export interface ProfilerData {
  startTs: number
  duration?: number
}

export class Profiler {
  map = new Map<string, ProfilerData>()
  obs$ = new BehaviorSubject<Profiler>(this)

  end(label: string) {
    const profilerData = this.map.get(label)
    if (profilerData === undefined) {
      throw new Error(`Cannot get profilerData with label = ${label}`)
    }
    profilerData.duration = Date.now() - profilerData.startTs
    this.obs$.next(this)
  }

  start(label: string) {
    this.map.delete(label)
    this.map.set(label, { startTs: Date.now() })
  }
}

const profiler = new Profiler()

export const getProfiler = () => {
  return profiler
}
