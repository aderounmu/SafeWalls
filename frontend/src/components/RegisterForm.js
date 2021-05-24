import React, {useState, useEffect} from 'react';

import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';

import {
    FormInput, FormDatePicker
} from './form-components';

import {
    userNameValidator, emailValidator
} from './validators'

import {useAuth , useAuthUpdate} from '../context/AuthContext.js'
import { useHistory, Redirect } from 'react-router-dom';


export default function RegisterForm (props) {
    const [isRegistering, setIsRegistering] = useState(false) 
    
    const authData = useAuth()
    const setAuthData = useAuthUpdate()
    //let history = useHistory()

    useEffect(()=>{
        // if(authData){
        //     history.push('/')
        // }
    })

    const register = (data) =>{
         setIsRegistering(true)
         let FormD = new FormData()
         FormD.append('email',data.email)
         FormD.append('password',data.password)
         FormD.append('name',data.name)
        fetch('http://127.0.0.1:4500/api/login',{
            method: 'POST',
              body: FormD
        })
        .then(response => response.json())
        .then( data => {
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('logined',true)
            
            console.log(data.access_token)
        })
        .then(token => {
            setAuthData({
                is_logined: true,
                error : false,
                errorMessage: '',
                token: localStorage.getItem('token')
            })
        })
        .catch(
            err => {
                setAuthData({...authData , error : true , errorMessage: err.message})
            }
        )
        .finally(()=>{
            setIsRegistering(false)
        })
    }



    const handleSubmit = (dataItem) => {
       register(dataItem)
    };





    return (
        <Form
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
                <FormElement style={{ width: '100%' }}>
                    <Field
                        id={'name'}
                        name={'name'}
                        label={'Name'}
                        component={FormInput}
                        validator={userNameValidator}
                    />
                    <Field
                        id={'email'}
                        name={'email'}
                        label={'Email'}
                        type={'email'}
                        component={FormInput}
                        validator={emailValidator}
                    />
                    <Field
                        id={'password'}
                        name={'password'}
                        label={'Passsord'}
                        type={'password'}
                        component={FormInput}
                        validator={emailValidator}
                    />
                    <div className="k-form-buttons">
                        <Button
                            primary={true}
                            type={'submit'}
                            disabled={!formRenderProps.allowSubmit}
                        >
                            Submit
              </Button>
                        <Button className={'btn-link'} onClick={() => props.changeLogin()}>
                            Login
                      </Button>
                    </div>
                </FormElement>
            )}
        />
    );
}