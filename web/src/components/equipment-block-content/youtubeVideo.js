import React from 'react'
import YouTube from 'react-youtube'
import useResizeAware from 'react-resize-aware'

export default function YoutubeVideo({ excerpt, videoURL }) {
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
      controls: 0
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {imageResizeListener}
      <YouTube videoId={videoID} opts={opts} onReady={onReady} />
    </div>
  )
}

const onReady = event => {
  // access to player in all event handlers via event.target
  // event.target.pauseVideo();
}
