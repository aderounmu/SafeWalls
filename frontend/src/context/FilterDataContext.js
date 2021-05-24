import React, { useState , useContext} from 'react'

const FilterDataContext = React.createContext()
const FilterDataUpdateContext = React.createContext()

export function useFilterData(){
	return useContext(FilterDataContext)
}

export function useFilterDataUpdate(){
	return useContext(FilterDataUpdateContext)
}


export function FilterDataProvider({children}){
	const [filterData, setFilterData] = useState({})


	function changeFilterData(f_Data){
		setFilterData(f_Data)
	}

	return(
		<FilterDataContext.Provider value={filterData}>
			<FilterDataUpdateContext.Provider value={changeFilterData}>
				{children}
			</FilterDataUpdateContext.Provider>
		</FilterDataContext.Provider>

	)

}