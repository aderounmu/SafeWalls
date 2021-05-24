import React, { useState , useContext , useEffect} from 'react'

const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}

export function useAuthUpdate(){
	return useContext(AuthUpdateContext)
}


export function AuthProvider({children}){
	const [auth, setAuth] = useState({
		is_logined: false,
		error : false,
		errorMessage: '',
		token: ''
	})

	useEffect(()=>{

		let is_login = false
		if(localStorage.getItem('logined')){
			let is_login = true
		}
		setAuth({...auth, is_logined: is_login, token: localStorage.getItem('token') })

		 fetch('/api/token/',{
        	headers:{
        		Authorization:`Bearer ${auth.token} `
        	},
            method: 'POST',
        })
        .then(response => response.json())
        .then( data => {
           
        })
        .catch(err => {
        	setAuth({...auth, is_logined: false, token: '' })
        	localStorage.removeItem('logined')
            localStorage.removeItem('token')  
        })
	},[])

	function changeAuth(auth){
		setAuth(auth)
	}

	return(
		<AuthContext.Provider value={auth}>
			<AuthUpdateContext.Provider value={changeAuth}>
				{children}
			</AuthUpdateContext.Provider>
		</AuthContext.Provider>

	)

}