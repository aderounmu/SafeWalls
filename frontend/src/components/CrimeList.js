import React from 'react'
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import {useCrimeData , useCrimeDataUpdate} from '../context/CrimeDataContext.js'
import {useFilterData , useFilterDataUpdate} from '../context/FilterDataContext.js'



const MyHeader = (title) => {

	

  return (
    <ListViewHeader
      style={{
        color: "rgb(160, 160, 160)",
        fontSize: 14,
      }}
      className="pl-4 pb-2 pt-2"
    >
      {title}
    </ListViewHeader>
  );
};
	

const MyItemRender = (props) => {
let dateT = new Date(props.dataItem.date)
  return (
  	<div className="my-3 px-2">
  		<div> {` Location : ${props.dataItem.location.text}`}</div>
  		<div className="font-weight-bold p-2 " style={{fontWeight : 'bold', fontSize:'1.25rem'}} >{props.dataItem.crime}</div>
  		<div className="text-right p-2 " style={{textAlign : 'right'}}> {dateT.getHours()} : {dateT.getMinutes()}</div>
  		<hr/>
  	</div>

  )
}

export default function CrimeList(props) {
	let mydata = useCrimeData()
    const setMyData = useCrimeDataUpdate()

    let myFilterData = useFilterData()

    mydata =  myFilterData.t_analyzed == null || myFilterData.t_analyzed.length == 0 ? mydata : myFilterData
	
    return (
        <div>
            <ListView
             data={mydata.raw_data}
             item={MyItemRender}
             style={{
               width: "100%",
               height: "500px",
             }}
             header={() => MyHeader(props.title)}
             />
        </div>
    )
}
