import React, { useEffect, useState } from 'react'
import Image from '../components/image'
import styles from './cover-image.module.css'

export default function CoverImage ({ asset, coverSize = 1,fixed = false, ...props }) {
  const size = useWindowSize()
  const fixedClass = fixed ? styles.fixed : styles.absolute
  return (
    <div className={styles.cover +  ' ' + fixedClass} style={{height: size.height * coverSize}} >
      <Image style={{height: size.height}} fixed {...props} asset={asset} args={{ width: size.width, height: size.height * coverSize }} />
    </div>
  )
}

function useWindowSize () {
  const isClient = typeof window === 'object'

  function getSize () {
    return {
      width: isClient ? document.body.clientWidth : undefined,
      height: isClient ? window.innerHeight : undefined
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
