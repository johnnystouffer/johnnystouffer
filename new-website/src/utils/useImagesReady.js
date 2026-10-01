import { useEffect, useState } from 'react'

// Downloads and decodes every image up front so nothing pops in once the
// site is shown. Resolves on error too, so a missing file can't hang the page.
function preload(src) {
    const img = new Image()
    img.src = src
    return img.decode().catch(() => {})
}

export default function useImagesReady(srcs) {
    const [loaded, setLoaded] = useState(0)

    useEffect(() => {
        let cancelled = false
        srcs.forEach((src) =>
            preload(src).then(() => {
                if (!cancelled) setLoaded((n) => n + 1)
            })
        )
        return () => {
            cancelled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [srcs.join('|')])

    return { loaded, total: srcs.length, ready: loaded >= srcs.length }
}
