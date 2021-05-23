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

export default function AddCrimeForm(props) {
	const [crime, setCrime] = useState('')
	const [myLocation,setMyLocation] = useState({})
	const changeCrime = (value) =>{
		setCrime(value)
	}
    const handleSubmit = (dataItem) =>{ 

    	dataItem = {...dataItem , location : myLocation, crime : crime}
    	alert(JSON.stringify(dataItem, null, 2));
    }
    return (
        <div className="addFrom_container">
            <div className="addCrimeForm shadow p-5 rounded">
            	<div className="addCrime_content">
            		<div>
            			<SelectMapComp
            				setLocation={setMyLocation}
            			/>

            		</div>
					<Form
				    onSubmit={handleSubmit}
			        initialValues={{
			            
			         }}
				        render={(formRenderProps) => (
				          <FormElement  style={{ width: 400 }}>
				            
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
			                    	<div className="col"><Button type={'button'} onClick={() => changeCrime('robbery')}>Robbery</Button></div>
			                    	<div className="col"><Button type={'button'} onClick={() => changeCrime('kidnapping')}>Kidnapping</Button></div>
			                    	<div className="col"><Button type={'button'}  onClick={() => changeCrime('roiting')}>Roiting</Button></div>
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
				                disabled={!formRenderProps.allowSubmit}
				              >
				                Submit
				              </Button>
				              <Button onClick={formRenderProps.onFormReset}>
				                Clear
				              </Button>
				            </div>
				          </FormElement>
				      )}
					/>
            	</div>
            </div>
        </div>
    )
}








