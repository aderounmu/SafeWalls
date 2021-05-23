//mapPage 

import React , { useState }from 'react';
import MapComp from '../components/MapComp';

export default function MapPage(){
	const [openSettings, setOpenSettings ] = useState(false)
	let settings_css = ''
	let map_css = ''
	
	return(
		<div className='h-100 w-100'>
			<div className={`sf-menu ${ openSettings ? 'd-none d-sm-none d-md-block': ''}`}>

			</div>
			<div className = {`sf-Main-section`}>
				<div className="row">
					<div className={`col-12 col-md-9 ${ openSettings ? 'd-none d-sm-none d-md-block': ''}`}>
						<div className="sf-map-container h-95">
							<MapComp/>
						</div>
					</div>
					<div className= {`col-12 pt-5 col-md-3 ${ openSettings ? '': 'd-none d-sm-none d-md-block'}`}>
						<div className="sf-sidebar-container">
							Hello
						</div>
					</div>
				</div>
			</div>
			<div className={`sf-button-container ${ openSettings ? 'd-none d-sm-none d-md-block': ''}`}>
				
			</div>

		</div>
	)
}