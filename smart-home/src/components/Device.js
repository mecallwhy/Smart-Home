import { useEffect } from "react"

const Device = (props) => {
  const {device, detailsToBeShown, setDetailsToBeShown, setShowDetails} = props

// Ze względu na mało "user-friendly" nazwy typów urządzeń i ich stanów połączeń 
// odwzorowałem je graficznie, zamiast opisywać. Mam nadzieję że to nie problem.

  const handleShowDetails = () =>{
    setShowDetails(true)
    setDetailsToBeShown(device)
  }
  useEffect(()=>{
    if(detailsToBeShown && detailsToBeShown.id === device.id){
        setDetailsToBeShown(device)
    }
  },[device.connectionState,
    device.isTurnedOn,
    device.brightness,
    device.color,
    device.powerConsumption,
    device.temperature,
  ])

    return (
      <div 
        id={device.id} 
        className={"device " + device.connectionState}
        onClick={()=>{handleShowDetails()}}>
        <img src={require("../styles/images/"+device.type+".png")} />
        <h3>{device.name}</h3>
      </div>
    );
  }
  
  export default Device;
  