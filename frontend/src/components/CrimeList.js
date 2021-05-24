import React from 'react'
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";


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
  return (
  	<div className="my-5">
  		{props.dataItem.crime}
        <br/>
        <br/>
  	</div>

  )
}

export default function CrimeList(props) {
	
    return (
        <div>
            <ListView
             data={props.data}
             item={MyItemRender}
             style={{
               width: "100%",
               height: 530,
             }}
             header={() => MyHeader(props.title)}
             />
        </div>
    )
}
