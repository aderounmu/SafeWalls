//authPage 

import React, {useState} from 'react';
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default function AuthPage(){
	const changeLogin = () =>{
		setShowLogin(!showLogin)
	}
	const [showLogin, setShowLogin] = useState(true);
	return(
		<div>
			<div className="row mt-5 justify-content-center">
				<div className="col-12 col-md-6 text-center">
					<div className="p-3 m-2 shadow rounded">
						<div className="h_1">{showLogin ? 'Login': 'Register'}</div>
						{

							showLogin? <LoginForm changeLogin={changeLogin}/>: <RegisterForm changeLogin={changeLogin}/>
						}

					</div>
				</div>
			</div>
		</div>
	)
}