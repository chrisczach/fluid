import React from 'react'
import YouTube from 'react-youtube'
import useResizeAware from 'react-resize-aware'

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
  return (
    <div style={{ position: 'relative' }}>
      {imageResizeListener}
      <YouTube videoId={videoID} opts={opts} onReady={onReady(speed)} onEnd={onEnd} />
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
