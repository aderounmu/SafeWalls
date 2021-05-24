//mapPage 

import React , { useState, useEffect }from 'react';
import MapComp from '../components/MapComp';
import SideBar from '../components/SideBar.js'
import { Button } from '@progress/kendo-react-buttons';
import AddCrimeForm from '../components/AddCrimeForm.js'
import {useLocation , useLocationUpdate} from '../context/LocationContext.js'
import {useCrimeData , useCrimeDataUpdate} from '../context/CrimeDataContext.js'




export default function MapPage(){
	const [openSettings, setOpenSettings ] = useState(false)
	const [openAddFrom, setOpenAddFrom] = useState(false)

	const currentLocation = useLocation()
    const setCurrentLocation = useLocationUpdate()

    const newdata = useCrimeData()
    const setNewData = useCrimeDataUpdate()

    const loadData = () =>{
    	fetch(`/api/crime/recent/${currentLocation[0]}/${currentLocation[1]}`)
    	.then(response => response.json())
    	.then(data => {
    		console.log(data)
    		setNewData(data)

    	})
    	.catch(err =>{
    		console.log(err)
    	})
    }

    useEffect(()=>{

    	loadData()

    },[currentLocation])

    //call the api every 3 minutes 

    useEffect(()=>{
    	let timer1 = setTimeout(()=>{
    		loadData()
    	},180000)
    	return () =>{
    		clearTimeout(timer1)
    	}
    },[])
	
	return(
		
		<div className='map-page'>
			<div className={`sf-menu d-block d-sm-block d-md-none`}>
				<Button className={`btn-${ openSettings ? 'danger': 'info'}`} icon={`${ openSettings ? 'close': 'menu'}`} onClick={() => setOpenSettings(!openSettings)}></Button>
			</div>
			<div className = {`sf-Main-section`}>
				<div className="row">
					<div className={`col-12 col-md-9 ${ openSettings ? 'd-none d-sm-none d-md-block': ''}`}>
						<div className="sf-map-container h-100">
							<MapComp/>
						</div>
					</div>
					<div className= {`col-12 pt-2 col-md-3 ${ openSettings ? '': 'd-none d-sm-none d-md-block'}`}>
						<div className="sf-sidebar-container mt-4 mt-sm-2 h-100">
							<SideBar/>
						</div>
					</div>
				</div>
			</div>
			<div className={`${ openSettings ? 'd-none d-sm-none d-md-block': ''}`}>
				<div className={`sf-button-container w-100`}>
					<div className="row justify-content-center">
						<div className="col-6">
							<Button className={'btn-danger btn-lg openFormButton'} type={'button'} onClick={() => setOpenAddFrom(true)}>ADD CRIME</Button>
						</div>
					</div>
				</div>
				{!openAddFrom ? ' ' :<div className="add-from_container pt-3">
					<div className="row justify-content-center">
						<div className="col-12 col-md-6 ">
							<AddCrimeForm
							setOpenAddFrom= {setOpenAddFrom}
							loadData = {loadData}
							 />
							}
						</div>
					</div>
				</div>}
			</div>
		</div>
	)
}