import ExploreIcon from '@rsuite/icons/Explore';
import TagAuthorizeIcon from '@rsuite/icons/TagAuthorize';
import AdminIcon from '@rsuite/icons/Admin';
import { Button} from 'rsuite';
import './styles.css';
import { useNavigate } from 'react-router-dom';


const ButtomNav = () =>{
    const navigate = useNavigate();
    


    return(
        <div className="container-nav-button">
          <nav className="menu-nav">
            
            <Button className="menu-item tow">
              <span className="material-icons"><TagAuthorizeIcon/></span>
              <span className="menu-item-label">Scheduled</span>
            </Button>

            <Button  className="menu-item one" onClick={()=>navigate('/')}>
              <span className="material-icons"><ExploreIcon/></span>
              <span className="menu-item-label">Explorar</span>
            </Button>


            <Button className="menu-item tree">
              <span className="material-icons"><AdminIcon/></span>
              <span className="menu-item-label">Profile</span>
            </Button>
          </nav>
        </div>
    )
}
export default ButtomNav
