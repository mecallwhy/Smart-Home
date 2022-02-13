import {React, useEffect, useState} from "react";
import Device from "./components/Device";
import DeviceDetails from "./components/DeviceDetails";
import interact from 'https://cdn.interactjs.io/v1.10.11/interactjs/index.js'

function App() {
  const [showDetails, setShowDetails] = useState(false)
  const [smartDevices, setSmartDevices] = useState()
  const [detailsToBeShown, setDetailsToBeShown] = useState()
  const [position, setPosition] = useState([])
  const [size, setSize] = useState([])

  interact('#device-details')
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)
        x += event.deltaRect.left
        y += event.deltaRect.top
        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        setSize([event.rect.height, event.rect.width])
      }
    },
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),
      interact.modifiers.restrictSize({
        min: { width: 220, height:270 }
      })
    ],
    inertia: true
  })
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    listeners: {
      move: dragMoveListener,
      end (event) {
        var x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy
        setPosition([x, y])
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

  useEffect(()=>{
    setInterval(() => {
      fetch("http://localhost:3000/devices")
      .then(resp => resp.json())
      .then((data)=>{
        setSmartDevices(data)
      })
    }, 1000);
  },[])
  
  return (
    <div className="App">
      <h1 id="main-header">myHome</h1>
      {smartDevices && <div id="main-grid">
        <div id="devices-grid">
        {smartDevices.map((device)=>{
          return <Device 
            key={device.id}
            device={device}
            detailsToBeShown={detailsToBeShown}
            setDetailsToBeShown={setDetailsToBeShown}
            setShowDetails={setShowDetails}
            />
        })}
        </div>
      {showDetails && <DeviceDetails 
        device = {detailsToBeShown}
        setShowDetails={setShowDetails}
        position={position}
        size={size}
        />}
      </div>}
    </div>
  );
}

export default App;
