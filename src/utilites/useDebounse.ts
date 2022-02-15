import { useCallback, useRef } from "react"

function useDebounce(callback: () => void, delay: number) {

    const timer  = useRef()

    const debouncedCallback = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
// @ts-ignore
            timer.current = setTimeout(() => callback(...args), delay)
        }
    }, [callback, delay])

    return debouncedCallback

}
export default useDebounce