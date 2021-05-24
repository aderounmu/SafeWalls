import React , { useState }from 'react';
import CrimeFilter from './CrimeFilter.js'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import data from '../sample.js'
import CrimeList from './CrimeList.js'
import {useCrimeData , useCrimeDataUpdate} from '../context/CrimeDataContext.js'


export default function SideBar(){
	const [openSettings, setOpenSettings ] = useState(false)
	const [selectedTab, setSelectedTab] = React.useState(-1);
	let mydata = useCrimeData()
    const setMyData = useCrimeDataUpdate()

  const handleSelectTab = e => {
    setSelectedTab(e.selected)
  };
	return(
		<div className=' w-100 sf-sideBar'>
			<CrimeFilter />
			<div className="pt-3">
			<TabStrip selected={selectedTab} onSelect={handleSelectTab}>
				<TabStripTab title="List oF Crimes">
					<CrimeList data={mydata.t_analyzed} title={'Recent Crimes'}  />
				</TabStripTab>
				<TabStripTab title="My Crimes">
					<CrimeList data={mydata.raw_data} title={'My Uploaded Crime'} />
				</TabStripTab>
			</TabStrip>
			</div>
		</div>
	)
}