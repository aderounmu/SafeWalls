import React ,{useEffect, useState} from 'react'
import { Map, Draggable, ZoomControl } from 'pigeon-maps'
import {
    Input
} from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
//get current user location

export default function SelectMapComp(props) {

    const [currentLocation,setCurrentLocation] = useState([0,0])
    const [center, setCenter] = useState([6.519, 3.376])
    const [zoom, setZoom] = useState(11)
    const [selectLocation, setSelectLocation] = useState([6.519, 3.376]) //change to location of user
    const [plainLocation, setPlainLocation] = useState('')
    const [showMap, setShowMap] = useState(false)

    const setAnchor = (anchors) =>{
        setPlainLocation('')
        setSelectLocation(anchors)
        fetch(`http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_POSITION_STACK_API_KEY}&query=${anchors[0]},${anchors[1]}`)
        .then(response => response.json())
        .then(data => {
            
            let data_i = data.data[0]
            setPlainLocation(`${data_i.label}`) 
            props.setLocation({
                lat: selectLocation[0],
                long: selectLocation[1],
                text: data_i.label
            })
           
        })
        .catch((err)=>console.log(err))
        
    }

    const changeLocation = () =>{
        
        setSelectLocation([0,0])
       
        fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITION_STACK_API_KEY}&query=${plainLocation}`)
        .then(response => response.json())
        .then(data => {

            let data_i = data.data[0]

            console.log(data_i)
             setSelectLocation([data_i.latitude,data_i.longitude])
             setPlainLocation(data_i.label)
             props.setLocation({
                lat: data_i.latitude,
                long: data_i.longitude,
                text: data_i.label
            }) 
        })
        .catch((err)=>console.log(err))
    }

    return (
        <>
            <div className="my-2" style={{fontWeight: "bold" , fontSize:"18px"}}>{plainLocation}</div>
            <div className={ `map-container h-100 w-100 my-4 ${ showMap ? 'd-none':'' }`}>
                
                <Input value={plainLocation} onChange={(e) => setPlainLocation(e.value)}/>

                <div className="row my-2">
                    <div className="col">
                        <Button type={'button'} className={'btn-info'} onClick={() => changeLocation() }>Select this location</Button>
                    </div>
                    <div className="col">
                       { props.removeMap ? '' :<Button type={'button'} onClick={() => setShowMap(true)}>Select From Map</Button>}
                    </div>
                </div>
            </div>
            {props.removeMap ? '' : <div className={ `map-container h-100 w-100 ${ showMap ? '': 'd-none'}`}>
                           
                            <Map 
                            
                            height={500}
                            center={center} 
                            zoom={zoom} 
                            onBoundsChanged={({ center, zoom }) => { 
                                setCenter(center) 
                                setZoom(zoom)
                                console.log(zoom)
                            }}>
                                <div className="row justify-content-end">
                                    
                                    <div className="col-3 mt-3">
                                        <Button className="btn-danger" type={'button'} onClick={() => setShowMap(false)}>Close</Button>
                                    </div>
                                </div>
                                <ZoomControl />
                                
                                    <Draggable  anchor={selectLocation} offset={[selectLocation[0]/2 , selectLocation[0]/2 ]} onDragEnd={setAnchor}>
                                        //change to user icon 
                                        <svg width={50} height={50} viewBox="0 0 184 200" fill={'#632789'} xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="84" cy="100" r="100"  fillOpacity="0.3"/>
                                            <circle cx="84" cy="100" r="75"  fillOpacity="0.4"/>
                                            <circle cx="84" cy="100" r="50"  fillOpacity="0.45"/>
                                            <circle cx="84" cy="100" r="25"  fillOpacity="0.5"/>
                                        </svg>    
                                     </Draggable>
                            </Map> 
            </div> }
        </>
    )
}
