import React from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';

import {
    FormInput, FormDatePicker
} from './form-components';

import {
    userNameValidator, emailValidator
} from './validators'

export default function LoginForm () {
    const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));
    return (
        <Form
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
                <FormElement style={{ width: 400 }}>
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
                        <Button onClick={formRenderProps.onFormReset}>
                            Clear
              </Button>
                    </div>
                </FormElement>
            )}
        />
    );
}