import './styles.css'
import { SideBar, Footer, ButtonNav, InputSearch, NavBar } from '../components'
 
const Layout = ({children}) =>{



    return(
        <div className="layout-container">
            <SideBar/>
            <div className='layout-child'>
                <NavBar/>
                {children}
                <Footer/>
                <ButtonNav/>
            </div>
            
        </div>
    )

}
export default Layout