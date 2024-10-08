import './SideBar.css'
import '../SVGs/PistonSVG'
import PistonSVG from '../SVGs/PistonSVG'
import HamburgerSVG from '../SVGs/HamburgerSVG'


export default function SideBar(){
  return(
    <>
      <div className='container__sidebar'>

      <div className='hamburger__sidebar'>
        <HamburgerSVG/>
      </div>
        <nav className='nav__sidebar'>
          <ul>
            <li>
              Pistons
              <span><PistonSVG/></span>
            </li>
            <li>Second</li>
            <li>Third</li>
            <li>Fourth</li>
          </ul>
        </nav>

      </div>
    
    </>
  )
}

