import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
function App() {
  return (
    <div className='App'>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
