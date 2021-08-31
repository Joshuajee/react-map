import { OverlayView } from '@react-google-maps/api';

const Overlay = (props) => {

  const divStyle = {
    background: 'white',
    border: '1px solid #ccc',
    padding: 10
  };

  return (
    <OverlayView
          position={props.position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div style={divStyle}>
            <h3>{props.distance}</h3>
            <h3>{props.duration}</h3>
          </div>
    </OverlayView>
  )
}

export default Overlay