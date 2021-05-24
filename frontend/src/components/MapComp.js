import React ,{useEffect, useState} from 'react'
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps'
import {useLocation , useLocationUpdate} from '../context/LocationContext.js'
import {useCrimeData , useCrimeDataUpdate} from '../context/CrimeDataContext.js'
import {useFilterData , useFilterDataUpdate} from '../context/FilterDataContext.js'

//get current user location


let color_code = [
    { name: 'robbery', color: '#4F4CEF' },
    { name: 'kidnapping', color: '#EFD54C' },
    { name: 'riot', color: '#EF4C4C' } 
]


export default function MapComp() {

    const currentLocation = useLocation()
    const setCurrentLocation = useLocationUpdate()
    //const [center, setCenter] = useState(currentLocation)//useState([6.519, 3.376])
    const [zoom, setZoom] = useState(11)
    let mydata = useCrimeData()
    const setMyData = useCrimeDataUpdate()

    let myFilterData = useFilterData()

    mydata =  myFilterData.t_analyzed == null || myFilterData.t_analyzed.length == 0 ? mydata : myFilterData

    

    return (
        <div className='map-container w-100'>
            <Map 
            className={'My_map'}
            center={currentLocation} 
            zoom={zoom} 
            onBoundsChanged={({ center, zoom }) => { 
                setCurrentLocation(center) 
                setZoom(zoom)
                console.log(zoom)
            }}>
                <ZoomControl />
                {
                    mydata.t_analyzed == null || mydata.t_analyzed.length == 0 ? ' ' : mydata.t_analyzed.map((item) => {
                        let color_i = color_code.filter((value) => value.name == item.crime)
                        let color = color_i[0].color //color_i.length < 1 ? color_i[0].color : '#4F4CEF'
                       
                        return <Overlay  anchor={[item.center.lat, item.center.long]} offset={[Math.pow(zoom,2.05)/2 , Math.pow(zoom,2.05)/2 ]}>
                        <svg width={Math.pow(zoom,2.05)} height={Math.pow(zoom,2.05)} viewBox="0 0 184 200" fill={color} xmlns="http://www.w3.org/2000/svg">
                            <circle cx="84" cy="100" r="100"  fill-opacity="0.3"/>
                            <circle cx="84" cy="100" r="75"  fill-opacity="0.4"/>
                            <circle cx="84" cy="100" r="50"  fill-opacity="0.45"/>
                            <circle cx="84" cy="100" r="25"  fill-opacity="0.5"/>
                        </svg>    
                        </Overlay>
                    })
                }{
                   mydata.t_analyzed == null || mydata.t_analyzed.length == 0 ? ' ' : mydata.t_analyzed.map((item) => {    
                        return <Overlay anchor={[item.center.lat, item.center.long]} offset={[25, 30]}>
                            <div> I am the { item.crime}</div>
                        </Overlay>
                    })
                }


                {
                   mydata.t_analyzed == null || mydata.t_analyzed.length == 0 ? ' ' : mydata.t_analyzed.map((item) => {
                        return <Marker 
                            width={70}
                            anchor={[item.center.lat, item.center.long]} 
                            onClick={() => console.log('hi')}
                            className='make-tran'
                        />
                    })       
                }
            </Map> 
        </div>
    )
}
