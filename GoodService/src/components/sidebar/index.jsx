import './styles.css'
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AvatarGroup, Avatar } from 'rsuite';
import ExploreIcon from '@rsuite/icons/Explore';
import TagAuthorizeIcon from '@rsuite/icons/TagAuthorize';
import AdminIcon from '@rsuite/icons/Admin';
const SideBar = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [nav, setNav] = useState(null)


    useEffect(()=>{
        setNav(location?.pathname)
    },[location])

    return(
        <div className="container-sidebar">
            <div className='sidebar-title'>
                <Avatar>Gs</Avatar>
                <strong>
                    GoodServices
                </strong>
            </div>
            <ul className="sidebar-links">
                <li className={nav === '/' ? 'links actived': 'links'} onClick={()=>navigate('/')}>
                <ExploreIcon style={{color: nav === '/' ? '#4d4dff': ''}}/><span>Explore</span>
                </li>
                <li className={nav === '/Scheduled' ? 'links actived': 'links'}>
                    <TagAuthorizeIcon/><span>Scheduled</span>
                </li>
                <li className={nav === '/Profile' ? 'links actived': 'links'}>
                <AdminIcon style={{color: location.pathname === '/Profile' ? '#4d4dff': ''}}/><span>Profile</span>
                </li>

                
            </ul>
        </div>
    )
}
export default SideBar