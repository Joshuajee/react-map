import { Marker } from "@react-google-maps/api"
import position from "./../Img/position.svg"

const MarkPosition = (props) => {

  
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

    return (<Marker
              onLoad={onLoad} 
              position={props.position}
              draggable={props.draggable} 
              />)
}

export default MarkPosition