
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Main from './Componetnts/Main/Main'
import Edit from './Componetnts/Edit/Edit'

function App() {

  return (
    <>
   <BrowserRouter>
   <Routes>
   <Route path='/' Component={Main}/>
   <Route path='/edit/:id' Component={Edit}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
