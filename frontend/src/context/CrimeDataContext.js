import React, { useState , useContext} from 'react'
import data from '../sample.js'
const CrimeDataContext = React.createContext()
const CrimeDataUpdateContext = React.createContext()


export function useCrimeData(){
	return useContext(CrimeDataContext)
}

export function useCrimeDataUpdate(){
	return useContext(CrimeDataUpdateContext)
}


export function CrimeDataProvider({children}){
	const [crimeData, setCrimeData] = useState({count: 0, raw_data: [], t_analyzed: []})



	function changeCrimeData(Crimes){
		setCrimeData(Crimes)

		setCrimeData(data.feed_data)
	}

	return(
		<CrimeDataContext.Provider value={crimeData}>
			<CrimeDataUpdateContext.Provider value={changeCrimeData}>
				{children}
			</CrimeDataUpdateContext.Provider>
		</CrimeDataContext.Provider>

	)

}