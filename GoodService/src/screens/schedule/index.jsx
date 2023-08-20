import './styles.css';
import { InputSearch, DropdownFilter, ModalComponent, FormComponent } from '../../components';
import { Button } from 'rsuite';
import { useState } from 'react';



 const ScheduledScrenn = () =>{
    const[open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});




    return(
        <div className='container-schedule'> 
            <div>
                <InputSearch/>
                <div className='div-row-one'>
                    <DropdownFilter/>
                    <Button appearance='primary' color='green' onClick={()=>setOpen(true)}>New</Button>
                </div>
            </div>
            <ModalComponent open={open} setOpen={setOpen}>
                <FormComponent setFormData={setFormData}/>
            </ModalComponent>
        </div>
    )
}
export default ScheduledScrenn
