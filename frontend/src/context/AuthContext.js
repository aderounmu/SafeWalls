import React, { useState , useContext} from 'react'

const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}

export function useAuthUpdate(){
	return useContext(AuthUpdateContext)
}


export function AuthProvider({children}){
	const [auth, setAuth] = useState({})


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