import './styles.css';
import { Drawer, Button, Avatar, List } from 'rsuite';
import { useState, useEffect } from 'react';
import {getScheduledId} from '../../utils/api'



const DrawerComponent = (props) =>{
    const[data, setData] = useState([]);


    useEffect(()=>{
        
        const fetchScheduleId = async () => {
            try {
              const response = await getScheduledId(props.data.id);
              setData(response);
              
            } catch (error) {
              console.log(error)
            }
          };
      
          fetchScheduleId();
    },[props?.data?.id])


    

    return(
        <Drawer open={props.open}  onClose={() => props.setOpen(false)} className='drawer'>  
            <Drawer.Header>
            <Drawer.Title>Detalhes</Drawer.Title>
            <Drawer.Actions>
                <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
                <Button appearance="primary">
                Confirm
                </Button>
            </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body className='drawer-body'>
            <div className='drawer-container'>
                <div>
                    <Avatar style={{ background: '#0099ff' }}>{props?.data?.professional?.slice(0, 2)}</Avatar>
                    <div>
                        <strong>{props?.data?.professional}</strong>
                        <span><i className="fa fa-map-marker" aria-hidden="true"></i> {props?.data?.location}</span>
                    </div>
                </div>
                
                <div className='drawer-row'>
                    <div className='drawer-column'>
                        <strong>Scheduled</strong>
                        <span>{data.length}</span>
                    </div>
                    <div className='drawer-column'>
                        <strong>Availability</strong>
                        <span>{props?.data?.availability}</span>
                    </div>
                    <div className='drawer-column'>
                        <strong>Price</strong>
                        <span>{props?.data?.price}</span>
                    </div>
                </div>
                <div className="appointment-container">
                    <strong className={data?.length > 0? 'appointment-title': 'appointment-title-none'}>last appointments</strong>
                    <ul className="appointment-list">
                        {data.slice(0,4).map(item => (
                        <li key={item?.id} className="appointment-item">
                            <span>{item?.date}</span>
                            <span>{item?.time}</span>
                        </li>
                        ))}
                    </ul>
                </div>

                
            </div>
            </Drawer.Body>
        </Drawer>
    )
}
export default DrawerComponent;