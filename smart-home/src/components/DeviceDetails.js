import {React} from "react"
import close from "../styles/images/close.png"

const DeviceDetails = (props) => {

    const {device, setShowDetails, position, size} = props
    return(
        device ? 
        <div id="device-details"
            className="resize-drag"
            data-x = {position[0]}
            data-y = {position[1]}
            style={{
                transform: `translate(${position[0]}px, ${position[1]}px)`, 
                height: `${size[0]}px`, 
                width: `${size[1]}px`}}>
            <div id="device-details-generals">
                <img id="img-deviceType" src={require("../styles/images/"+device.type+".png")} />
                <p id="device-name">{device.name}</p>
                <img id="img-close" src={close} onClick={()=>{setShowDetails(false)}}/>
            </div>
            <div id="device-details-info">
                <p className={device.connectionState}>{device.connectionState
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => {
                    return str.toUpperCase();
                    })}
                </p>
                {device.connectionState !== "disconnected" &&
                <div>
                    {device.isTurnedOn === undefined ? null : device.isTurnedOn ? <p>Włączony</p> : <p>Wyłączony</p>}
                    {device.brightness && <p>Jasność: {device.brightness}/100</p>}
                    {device.color && <p style={{backgroundColor: device.color}}>Kolor</p>}
                    {device.powerConsumption && <p>Pobór energii: {device.powerConsumption}</p>}
                    {device.temperature && <p>Temperatura: {device.temperature}°C</p>}
                </div>}
            </div>
        </div>
        :
        null
    )
}
export default DeviceDetails
