import {useEffect, useRef} from "react";

const useResizeObserver = (callback: (target: HTMLElement) => void) => {
    const ref = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

       const observer = new ResizeObserver(() => callback(ref.current!));
       observer.observe(ref.current);

       return () => observer.disconnect();
    }, [])

    return ref;
}

export {useResizeObserver};
export default useResizeObserver;