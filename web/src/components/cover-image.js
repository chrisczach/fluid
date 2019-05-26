import React, { useEffect, useState } from 'react'
import Image from '../components/image'
import styles from './cover-image.module.css'

export default function CoverImage ({ asset, coverSize = 1, ...props }) {
  const size = useWindowSize()
  return (
    <div className={styles.cover} style={{height: size.height}} >
      <Image style={{height: size.height}} fixed {...props} asset={asset} args={{ width: size.width, height: size.height }} />
    </div>
  )
}

function useWindowSize () {
  const isClient = typeof window === 'object'

  function getSize () {
    return {
      width: isClient ? document.body.clientWidth : undefined,
      height: isClient ? document.body.clientHeight : undefined
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize () {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}
