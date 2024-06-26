import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EventForm from '../EventForm/EventForm'
import './App.css'

import Header from '../Header/Header'

function App() {
  
  return (
    <div>
      <Header />
      <BrowserRouter>
          <Routes>
            <Route path='/eventform' element={<EventForm/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
