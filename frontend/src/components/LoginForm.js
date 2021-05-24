import React, {useState, useEffect} from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';

import {
    FormInput, FormDatePicker
} from './form-components';

import {
    userNameValidator, emailValidator, passwordValidator
} from './validators'

import {useAuth , useAuthUpdate} from '../context/AuthContext.js'
import { useHistory, Redirect } from 'react-router-dom';


export default function LoginForm (props) {

    const [isLogining, setIsLogining] = useState(false) 
    
    const authData = useAuth()
    const setAuthData = useAuthUpdate()
    //let history = useHistory()

    useEffect(()=>{
        // if(authData){
        //     history.push('/')
        // }
    })

    const login = (data) =>{
         setIsLogining(true)
         let FormD = new FormData()
         FormD.append('email',data.email)
         FormD.append('password',data.password)
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
            setIsLogining(false)
        })
    }



    const handleSubmit = (dataItem) => {
       login(dataItem)
    };

    return (
        authData.is_logined ? (<Redirect to={'/'}/>) : (<Form
                            onSubmit={handleSubmit}
                            render={(formRenderProps) => (
                                <FormElement style={{ width: '100%' }}>
                                    <Field
                                        id={"email"}
                                        name={"email"}
                                        label={"Email"}
                                        type={"email"}
                                        component={FormInput}
                                        validator={emailValidator}
                                    />
                                    <Field
                                        id={'password'}
                                        name={'password'}
                                        label={'Password'}
                                        type={'password'}
                                        component={FormInput}
                                        validator={passwordValidator}
                                    />
                                    <div className="k-form-buttons">
                                        <Button
                                            primary={true}
                                            type={'submit'}
                                            disabled={isLogining}
                                        >
                                            Submit
                              </Button>
                                        <Button className={'btn-link'} onClick={() => props.changeLogin()}>
                                            Register
                                      </Button>
                                    </div>
                                </FormElement>
                            )}
                        />)
    );
}