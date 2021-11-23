export default function useAuth() {    
    // return useContext(AuthCOntext);
    let  user  = {};
    let store = JSON.parse(localStorage.getItem('login'))
    if(store && store.login){
        user={
            login: true,          
            store: store
        }
    }
    return user
}


export function checkOut(){
    localStorage.clear();
    window.location.href = '/';
  }