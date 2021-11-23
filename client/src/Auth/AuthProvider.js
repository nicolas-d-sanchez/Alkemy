import { createContext } from 'react'

export const AuthCOntext = createContext()

export default function AuthProvider({children}) {

    // const [user] = useState();
    const user = JSON.parse(localStorage.getItem('login'))

    const contextValue={
        user, 
    }

    return (
        <AuthCOntext.Provider value={contextValue}>
        {children}
        </AuthCOntext.Provider>
    )
}
