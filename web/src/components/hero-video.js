import React, { useState, useLayoutEffect } from 'react'
import YouTube from 'react-youtube'
import useResizeAware from 'react-resize-aware'
import styles from './hero-video.module.css'
import Button from './button'
import { cn, buildImageObj, detectIE } from '../lib/helpers'
import ReactSVG from 'react-svg'
import { imageUrlFor } from '../lib/image-url'

export default function HeroVideo({
  excerpt,
  logo,
  videoURL,
  speed = 1,
  showSplash = true,
  stopSplashHandler
}) {
  let isMobile
  try {
    isMobile = screen.orientation.type && false
  } catch (err) {
    isMobile = true
  }
  // fix later, for some reason detectIE is blocking hero video on safari
  if (isMobile || !showSplash) return null

  setTimeout(stopSplashHandler, 30000)

  const videoID = videoURL.split('v=')[1].split('&')[0]
  const [imageResizeListener, imageSizes] = useResizeAware()
  useLayoutEffect(() => {
    // fix later, for some reason detectIE is blocking hero video on safari
    // if (detectIE()) return null
    const handleScroll = event => {
      if (event.target.scrollTop > 100) {
        stopSplashHandler()
        document.querySelector('#scroll').removeEventListener('scroll', handleScroll)
      }
      console.log(`still listening`)
    }

    document.querySelector('#scroll').addEventListener('scroll', handleScroll)
    return () => {
      document.querySelector('#scroll').removeEventListener('scroll', handleScroll)
    }
  })

  const opts = {
    height: String((imageSizes.width / 16) * 9),
    width: imageSizes.width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      loop: 0,
      playlist: videoID,
      controls: 0,
      enablejsapi: 1,
      origin: null
    }
  }

  try {
    opts.playerVars.origin = location.hostname
  } catch (err) {
    console.log('prevent build error')
  }

  const [playing, setPlaying] = useState(false)

  return (
    <div className={showSplash ? styles.heroWrap : styles.heroWrapHide}>
      {imageResizeListener}
      {showSplash && (
        <>
          <YouTube
            containerClassName={
              showSplash && playing
                ? styles.videoStart
                : showSplash
                ? styles.video
                : styles.videoHide
            }
            className={showSplash ? styles.iFrame : styles.iFrameHide}
            videoId={videoID}
            opts={opts}
            onReady={onReady(speed)}
            onEnd={onEnd(stopSplashHandler)}
            onStateChange={({ data }) => setPlaying(data === 1)}
          />

          <div className={showSplash ? styles.overlay : styles.overlayHide}>
            <Button style={{ margin: '6em auto' }} onClick={stopSplashHandler}>
              browse equipment
            </Button>
          </div>
          <div className={!playing ? styles.largeLogo : styles.largeLogoHide}>
            <div className={styles.logoWrap}>
              <ReactSVG
                className={styles.svgWrapper}
                src={logo && imageUrlFor(buildImageObj(logo)).url()}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const onReady = speed => event => {
  // access to player in all event handlers via event.target
  event.target.playVideo()
  event.target.setPlaybackRate(speed)
}

const onEnd = handler => event => {
  // access to player in all event handlers via event.target
  handler()
}

{
  /* <YouTube
  videoId={ string }                  // defaults -> null
  id={ string }                       // defaults -> null
  className={ string }                // defaults -> null
  containerClassName={ string }       // defaults -> ''
  opts={ obj }                        // defaults -> {}
  onReady={ func }                    // defaults -> noop
  onPlay={ func }                     // defaults -> noop
  onPause={ func }                    // defaults -> noop
  onEnd={ func }                      // defaults -> noop
  onError={ func }                    // defaults -> noop
  onStateChange={ func }              // defaults -> noop
  onPlaybackRateChange={ func }       // defaults -> noop
  onPlaybackQualityChange={ func }    // defaults -> noop
/> */
}
