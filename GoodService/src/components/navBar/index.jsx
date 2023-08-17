import './styles.css'
import NoticeIcon from '@rsuite/icons/Notice';
import { Avatar, Whisper, Badge, IconButton, Popover } from "rsuite";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';



const renderMenuNotifiations = ({ onClose, left, top, className }, ref) => {
   
    return (
    <Popover ref={ref} className={className} style={{ left, top, padding: 5}} title='Notificações' full>
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        
        </div>
    </Popover>
    );
  }; 


const NavBar = () =>{

   

    return(
        <nav>
        <h6>Home</h6>    
        <div>
            <Whisper placement="bottomEnd" trigger="click" speaker={renderMenuNotifiations}>
                <Badge content={10}>
                <IconButton icon={<NoticeIcon/>} size="sm" style={{margin: 0, background: '#fff'}}/>
                </Badge>
            </Whisper>
            <Avatar style={{ background: 'blue', marginLeft: 5 }} circle size="sm">Usr</Avatar>
        </div>
        </nav>
    )
}
export default NavBar;