import { Marker } from "@react-google-maps/api"
import position from "./../Img/position.svg"

const MarkPosition = (props) => {

  
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  if (props.user) 
      return (<Marker onLoad={onLoad} position={props.position} draggable={props.draggable} icon={position} />)

  return (<Marker onLoad={onLoad}  position={props.position} draggable={props.draggable} />)
}

export default MarkPosition