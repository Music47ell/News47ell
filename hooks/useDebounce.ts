/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * An implementation of the classic "debounce" function that returns a promise,
 * thus allowing to await the debounced function, and handle any errors that it
 * may throw. A classic case of "this is something that I haven't come across or
 * seen anywhere ... is it genius? Or a magnificently bad idea 🤔" (probably the
 * latter).
 *
 * An excellent debouncing (vs throttle) explanation:
 * https://redd.one/blog/debounce-vs-throttle
 */
export default function useDebounce<T extends (...args: any) => any>(
	fn: T,
	duration: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
	// Every call to the returned debounced function shares the following context
	// variables. The timeoutId is the shared timer that all function calls reset,
	// and the pendingPromises array keeps track of the result that should be
	// returned to all calls once the timer goes off.
	let timeoutId: NodeJS.Timeout
	let pendingPromises: Array<{
		resolve: (value: ReturnType<T>) => void
		reject: (reason?: any) => void
	}> = []

	// The returned debounced function. Takes the same arguments as the original
	// one, but returns a promise that resolves (with the original functions
	// return value) once the timer goes off
	return (...args) => {
		clearTimeout(timeoutId)

		// The promise to return. Store its resolution methods to be able to
		// resolve/reject it later, once the timer goes off
		const promise = new Promise<ReturnType<T>>((resolve, reject) => {
			pendingPromises.push({ resolve, reject })
		})

		// Once the timer goes off, get the function's return value and resolve
		// (or reject) all pending promises
		timeoutId = setTimeout(async () => {
			try {
				const result = await fn(...args)
				for (const promise of pendingPromises) {
					promise.resolve(result)
				}
			} catch (error) {
				for (const promise of pendingPromises) {
					promise.reject(error)
				}
			} finally {
				pendingPromises = []
			}
		}, duration)

		return promise
	}
}
