import { Routes } from 'react-router-dom'
import EventForm from '../EventForm/EventForm'
import './App.css'
import { Route } from 'react-router-dom'

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
