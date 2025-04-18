import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
// import Footer from './components/Footer'
function App() {
  return (
    <div className='App'>
      <Header />
      <div className='app_container'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default App
