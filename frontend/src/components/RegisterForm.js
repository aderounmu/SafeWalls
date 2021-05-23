import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';

import {
    FormInput, FormCheckbox
} from './form-components';

import {
    userNameValidator, emailValidator, formValidator
} from './validators'

const genericErrorField = 'VALIDATION_SUMMARY';

const App = () => {
    const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));
    return (
      <Form
        onSubmit={handleSubmit}
        validator={formValidator}
        render={(formRenderProps) => (
          <FormElement style={{width: 400}}>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>Please fill in the following information:</legend>
              {
                            formRenderProps.visited && formRenderProps.errors && formRenderProps.errors[genericErrorField] &&
                            (<div className={'k-messagebox k-messagebox-error'}>
                              {formRenderProps.errors[genericErrorField]}
                              <ul>
                                {
                                            Object.keys(formRenderProps.errors)
                                                .filter(field => field !== genericErrorField)
                                                .filter(field => formRenderProps.errors[field])
                                                .map(field => (<li>{formRenderProps.errors[field]}</li>))
                                        }
                              </ul>
                            </div>)
                        }
              <Field
                id={'username'}
                name={'username'}
                label={'User Name'}
                component={FormInput}
                validator={userNameValidator}
                        />
              <Field
                id={'email'}
                name={'email'}
                label={'Email'}
                hint={'Hint: Enter your personal email address.'}
                type={'email'}
                component={FormInput}
                validator={emailValidator}
                        />
              <Field
                id={'password'}
                name={'password'}
                label={'Password'}
                hint={'Enter a secure password'}
                optional={true}
                component={PasswordValidator}
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
            </fieldset>
          </FormElement>
            )}
        />
    );
};
ReactDOM.render(
  <App />,
    document.querySelector('my-app')
);