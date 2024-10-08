import './App.css'
import Table from './components/Tables/Table'
import SideBar from './components/SideBar/SideBar'
import FilterMenu from './components/SearchBar/FilterMenu'

export default function App(){

  return(
    <>
      <div className="container">
        <div className='box1'>
          
        </div>
        <div className='box3'>
          <button className='button'>
            Login
            </button>
            <button className='button__register'>
            Register
            </button>
        </div>
        <div className='hamburger'>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
      </div>
      <main>
        <Table/>
        <SideBar/>
        <FilterMenu/>
      </main>
      

     
    </>
  )
}