import React, { useState , useContext, useEffect } from 'react'

const LocationContext = React.createContext()
const LocationUpdateContext = React.createContext()

export function useLocation(){
	return useContext(LocationContext)
}

export function useLocationUpdate(){
	return useContext(LocationUpdateContext)
}


export function LocationProvider({children}){
	const [location, setLocation] = useState([0,0])

	//get
    function get_current_location() {

        if (navigator.geolocation) {
        	console.log(navigator.geolocation.getCurrentPosition)
        	navigator.geolocation.getCurrentPosition(
        		(position) => setLocation([position.coords.latitude, position.coords.longitude])) 
        }
    }

    

    useEffect(() => {
        get_current_location()
    }, [])

	function changeLocation(loc){
		//setLocation([6.519682824903449,3.376910439439669])
		setLocation(loc)
	}

	return(
		<LocationContext.Provider value={location}>
			<LocationUpdateContext.Provider value={changeLocation}>
				{children}
			</LocationUpdateContext.Provider>
		</LocationContext.Provider>

	)

}