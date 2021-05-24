import React, {useState} from 'react'
import * as ReactDOM from 'react-dom';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Label, Error, Hint, FloatingLabel } from '@progress/kendo-react-labels';
import { Link } from 'react-router-dom'
import login from '../login.svg'

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

import {useAuth , useAuthUpdate} from '../context/AuthContext.js'

export default function AddCrimeForm(props) {

	const authData = useAuth()
    const setAuthData = useAuthUpdate()

    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

	const [crime, setCrime] = useState('')
	const [myLocation,setMyLocation] = useState({})
	const changeCrime = (value) =>{
		setCrime(value)
	}

	const sendCrime = (data) =>{
		setIsError(true)
         let FormD = new FormData()
         FormD.append('location',JSON.stringify(data.location))
         FormD.append('details',data.details)
         FormD.append('crime',data.crime)
         FormD.append('public',Number(data.public))
         console.log(FormD.get('public'))
        fetch('http://127.0.0.1:4500/api/crime/add/',{
        	headers:{
        		Authorization:`Bearer ${authData.token} `
        	},
            method: 'POST',
            body: FormD
        })
        .then(response => response.json())
        .then( data => {
            props.loadData()
            props.setOpenAddFrom(false)
            setIsError(false)
        })
        .catch(
            err => {
               setErrorMessage(err.message)
               setIsError(true)
            }
        )
        
	}

    const handleSubmit = (dataItem) =>{ 

    	dataItem = {...dataItem , location : myLocation, crime : crime}
    	sendCrime(dataItem)
    }
    return (
        <div className="addFrom_container">
            <div className="addCrimeForm shadow p-4 rounded">
            	{ !authData.is_logined ? (

            		<div className="row justify-content-center">
            			<div className="col-6">

            				<div className="px-5 py-3">
            					<img src={login} width={'100px'} height={'100px'} />
            				</div>

            				<div style={{textAlign : 'center'}}> Sorry this form is available to only logged in users</div>
            				<div className="px-4 py-3">
            					<Link className="btn btn-link w-100" to="/auth"> Click to Login </Link>
            				</div>
            			</div>
            		</div>




            		):(<div className="addCrime_content">
            	            	            		<div>
            	            	            			<SelectMapComp
            	            	            				setLocation={setMyLocation}
            	            	            				removeMap = {false}
            	            	            			/>
            	            	
            	            	            		</div>
            	            						<Form
            	            					    onSubmit={handleSubmit}
            	            				        initialValues={{
            	            				            
            	            				         }}
            	            					        render={(formRenderProps) => (
            	            					          <FormElement  style={{ width: '100%' }}>
            	            					            
            	            					            <Field
            	            					            	className={"my-2"}
            	            					              id={'details'}
            	            					              name={'details'}
            	            					              label={'details'}
            	            					              hint={'Add details of your emergency if you can.'}
            	            					              component={FormTextArea}
            	            					              validator={addressValidator}
            	            					             />
            	            					            <div className="my-4">
            	            				                    	<Label className="my-2">Crime</Label>
            	            	
            	            				                    <div className="row">
            	            				                    	<div className="col"><Button type={'button'} className={crime == 'robbery'? 'btn-danger': ''}  onClick={() => changeCrime('robbery')}>Robbery</Button></div>
            	            				                    	<div className="col"><Button type={'button'} className={crime == 'kidnapping'? 'btn-danger': ''} onClick={() => changeCrime('kidnapping')}>Kidnapping</Button></div>
            	            				                    	<div className="col"><Button type={'button'} className={crime == 'roit'?  'btn-danger': ''}  onClick={() => changeCrime('roit')}>Roiting</Button></div>
            	            				                    </div>
            	            				                    	<Hint className="my-2"> please select a crime currently happening</Hint>
            	            				                </div>
            	            	
            	            			                    
            	            					            <Field
            	            					            	className={"my-2"}
            	            					              id={'public'}
            	            					              name={'public'}
            	            					              label={'Should we make this public'}
            	            					              component={FormSwitch}
            	            					              optional={true}
            	            					            />
            	            					            <div className="k-form-buttons">
            	            					              <Button
            	            					                primary={true}
            	            					                type={'submit'}
            	            					                disabled={isError}
            	            					              >
            	            					                Submit
            	            					              </Button>
            	            					              <Button onClick={() => { 
            	            					              	setIsError(false)
            	            					               props.setOpenAddFrom(false)
            	            					           }}>
            	            					                Close
            	            					              </Button>
            	            					            </div>
            	            					          </FormElement>
            	            					      )}
            	            						/>
            	            	            	</div>)}
            </div>
        </div>
    )
}








