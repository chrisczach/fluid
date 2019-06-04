import React, { useState } from 'react'
import useResizeAware from 'react-resize-aware'
import YouTube from 'react-youtube'
import styles from './youtube-video.module.css'

export default function YoutubeVideo({ excerpt, videoURL, speed = 1 }) {
  const videoID = videoURL.split('v=')[1].split('&')[0]
  const [imageResizeListener, imageSizes] = useResizeAware()

  const opts = {
    height: (imageSizes.width / 16) * 9,
    width: imageSizes.width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: videoID
    }
  }

  const [playing, setPlaying] = useState(false)
  return (
    <div
      style={{ height: opts.height, width: opts.width }}
      className={styles.youtubeWrapper + ' ' + (playing ? styles.isPlaying : '')}
    >
      {imageResizeListener}
      <YouTube
        videoId={videoID}
        opts={opts}
        onReady={onReady(speed)}
        onEnd={onEnd}
        onStateChange={({ data }) => setPlaying(data === 1)}
      />
    </div>
  )
}

const onReady = speed => event => {
  // access to player in all event handlers via event.target
  event.target.setPlaybackRate(speed)
  event.target.pauseVideo()
}

const onEnd = event => {
  // access to player in all event handlers via event.target
  event.target.playVideoAt(0)
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
