const Map = ({ viewport, setViewport, width, height, location }) => (
  <ReactMapGL
    {...viewport}
    mapStyle='mapbox://styles/mapbox/dark-v10'
    onViewportChange={setViewport}
    width={width}
    height={height}
    mapboxApiAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
  >
    <Popup closeButton={false} {...location} closeOnClick={false} anchor='bottom'>
      <div className={styles.marker}>Fluid Pictures Shop</div>
    </Popup>
  </ReactMapGL>
)

export const MapLoading = ({width, height}) =>(
  <div style={{width, height}}>Loading</div>
)


  export default Map