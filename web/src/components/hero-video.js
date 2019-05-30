import React, { useState } from 'react'
import YouTube from 'react-youtube'
import useResizeAware from 'react-resize-aware'
import styles from './hero-video.module.css'
import Button from './button'
export default function HeroVideo({
  excerpt,
  videoURL,
  speed = 1,
  showSplash = true,
  stopSplashHandler
}) {
  const videoID = videoURL.split('v=')[1].split('&')[0]
  const [imageResizeListener, imageSizes] = useResizeAware()

  const opts = {
    height: (imageSizes.width / 16) * 9,
    width: imageSizes.width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      loop: 0,
      playlist: videoID,
      controls: 0,
      enablejsapi: 1,
      origin: 'https://fluidpictures.chrisczach.com'
    }
  }

  const [playing, setPlaying] = useState(false)

  return (
    <div className={showSplash ? styles.heroWrap : styles.heroWrapHide}>
      {imageResizeListener}
      {showSplash && (
        <YouTube
          containerClassName={
            showSplash && playing ? styles.videoStart : showSplash ? styles.video : styles.videoHide
          }
          className={showSplash ? styles.iFrame : styles.iFrameHide}
          videoId={videoID}
          opts={opts}
          onReady={onReady(speed)}
          onEnd={onEnd(stopSplashHandler)}
          onStateChange={({ data }) => setPlaying(data === 1)}
        />
      )}
      <div className={showSplash ? styles.overlay : styles.overlayHide}>
        <Button style={{ margin: '6em' }} onClick={stopSplashHandler}>
          browse equipment
        </Button>
      </div>
    </div>
  )
}

const onReady = speed => event => {
  // access to player in all event handlers via event.target
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
