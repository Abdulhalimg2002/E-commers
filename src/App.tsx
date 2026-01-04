
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'

import { Toaster } from 'react-hot-toast'
import Drawer from './components/ui/Drawer'
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from './app/store'
import { closeCart } from './app/features/globalS'
import { useAuthInit } from './hook/useAuthInit'



function App() {
 useAuthInit();

const{isOpenD}=useSelector(({global}:RootState)=>global)
 const dispatch = useDispatch();
 const onClose=()=>dispatch(closeCart())

  return (
    <>
 <Toaster/>
 
    <RouterProvider router={router} 
 
    
    /> 
    
    <Drawer isOpen={isOpenD} onClose={onClose}/>  
  
   
   
    
    </>
  )
}

export default App
