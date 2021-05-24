import React, {useState} from 'react'
import * as ReactDOM from 'react-dom';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Label, Error, Hint, FloatingLabel } from '@progress/kendo-react-labels';

import {
    FormNumericTextBox, FormInput,
    FormMaskedTextBox, FormColorPicker,
    FormSwitch, FormSlider, FormRangeSlider,
    FormTextArea, FormRating
} from './form-components';

import SelectMapComp from './SelectMapComp.js'

import {
    nameValidator, colorValidator,
    phoneValidator, addressValidator
} from './validators'

import {useFilterData , useFilterDataUpdate} from '../context/FilterDataContext.js'
import {useCrimeData , useCrimeDataUpdate} from '../context/CrimeDataContext.js'
import {useLocation , useLocationUpdate} from '../context/LocationContext.js'


export default function CrimeFilter(props) {
	const [crime, setCrime] = useState('')
	const [myLocation,setMyLocation] = useState({})

	let mydata = useCrimeData()
    const setMyData = useCrimeDataUpdate()

    let myFilterData = useFilterData()
    let setMyFilterData = useFilterDataUpdate()

    const currentLocation = useLocation()
    const setCurrentLocation = useLocationUpdate()

	const changeCrime = (value) =>{
		setCrime(value)
	}
	
	const filter_by_crime = (data , crime) =>{
		let filtered = {}
		let raw_filter_data = data.raw_data.filter((item)=> item.crime == crime)
		let t_analyzed_filtered = data.t_analyzed.filter((item)=> item.crime == crime)

		filtered = {
			count: raw_filter_data.length,
			raw_data: raw_filter_data,
			t_analyzed: t_analyzed_filtered
		}
		return filtered
	}

	

    const handleSubmit = () =>{ 

    	let dataItem = {location : myLocation, crime : crime}
    	//console.log(dataItem.location.lat == null || dataItem.location.long == null && crime == null || crime == '' )

    	
    		

			if((myLocation.lat == null && myLocation.long == null || myLocation.lat == undefined && myLocation.long == undefined)){
				setMyFilterData(mydata)
			}else{
				setCurrentLocation([myLocation.lat , myLocation.long])

			}
			if(mydata.count == null || mydata.count == 0){

    		}else{

				if(crime != null || crime != ''){
						
						let filtered_item = filter_by_crime(mydata,dataItem.crime)
						setMyFilterData(filtered_item)

				}else{
					setMyFilterData(mydata)	

				}
	
    		}
    	
    }
    return (
        <div className="filterFrom_container">
            <div className="fliterForm p-3">
            	<div className="filter_content">
            		<div>
            			<SelectMapComp

            				setLocation={setMyLocation}
            				removeMap = {true}
            			/>

            		</div>
            		<div>
            			 <div className="my-2">
			                    <Label className="my-2">Crime</Label>
			                    <div className="row">
			                    	<div className="col"><Button className={crime == 'robbery'? '': 'btn-danger'} type={'button'} onClick={() => changeCrime('robbery')}>Robbery</Button></div>
			                    	<div className="col"><Button className={crime == 'kidnapping'? '': 'btn-danger'} type={'button'} onClick={() => changeCrime('kidnapping')}>Kidnapping</Button></div>
			                    	<div className="col"><Button className={crime == 'roit'? '': 'btn-danger'} type={'button'}  onClick={() => changeCrime('riot')}>Roiting</Button></div>
			                 		<div className="col"><Button className={'btn-info'} type={'button'}  onClick={() => changeCrime('')}>Reset</Button></div>	
			                    </div>
			                    	<Hint className="my-1"> please select a crime currently happening</Hint>
			                </div>
				            <div className="k-form-buttons">
				              <Button
				                primary={true}
				                type={'submit'}
				                onClick={handleSubmit}
				              >
				                Submit
				              </Button>
				            </div>
            		</div>
            	</div>
            </div>
        </div>
    )
}








