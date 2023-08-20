import { Form, InputPicker, Button} from 'rsuite';
import { getSearchService, scheduleService } from '../../utils/api';
import { useEffect, useState } from 'react';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import moment from 'moment';



const FormComponent = () => {
    const[value, setValue] = useState('');
    const[data,setData] = useState([]);
    const[loading, setLoading] = useState(false)
    const [formValue, setFormValue] = useState({
        availability: [],
        createdAt: '',
        description: '',
        duration: '',
        id: '',
        name: '',
        price: '',
        professional: '',
        date: '',
    });


    useEffect(() => {
        setLoading(true)
        
        const getService = async () => {
            try {
                const response = await getSearchService(value);
                setData(response.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        if(value.length > 0){
            getService(); 
        }
        
        
           
      }, [value]);


    const handleSelect = (name, value) => {
        const selected = data.find(service => service?.id === value);
        setFormValue(prevState =>({
            availability: selected.availability,
            createdAt: selected.createdAt,
            description: selected.description,
            duration: selected.duration,
            id: selected.id,
            name: selected.name,
            price: selected.price,
            professional: selected.professional,
        }));
    };

    const handleDateChange = (value) =>{
        const formattedDate = moment(value).format('DD/MM/YYYY');
        setFormValue(prevState => ({
            ...prevState,
            date: formattedDate
        }));
        
    }



    const handleSubmit = async () =>{
        const selectedDate = moment(formValue.date, 'DD/MM/YYYY');
        const dayOfWeek = moment(selectedDate).format('dddd');
        const isAvailable = formValue.availability.some(item => {
            const [availableDay] = item.split(' ');
            return availableDay === dayOfWeek;
        });

        if(!isAvailable){
            alert('error, day of the week not available')
            
        }
        const data = {
            id: formValue.id,
            date: formValue.date,
            time: formValue.availability[0],
          };
        
        const response = await scheduleService(data);
        if(response.status === 201){
            setFormValue(prevState =>({
                availability: [],
                createdAt: '',
                description: '',
                duration: '',
                id: '',
                name: '',
                price: '',
                professional: '',
                date: ''
            }));
        }

        
       
          
    }


    return(
        <Form fluid onSubmit={handleSubmit}>
            <Form.Group>
                <Form.ControlLabel>Service Name</Form.ControlLabel>
                    <Form.Control 
                        style={{width: '100%'}}
                        name="service" 
                        accepter={InputPicker}
                        data={data?.map(item => ({ label: item?.name, value: item?.id }))}
                        onSearch={(text)=>setValue(text)}
                        onChange={(value)=>handleSelect('service', value)}
                        placeholder='search service name'
                        renderMenu={menu => {
                            if (loading) {
                              return (
                                <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
                                  <SpinnerIcon spin /> Loading...
                                </p>
                              );
                            }
                            return menu;
                          }}
                        />  
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Professinal</Form.ControlLabel>
                    <Form.Control 
                        name="professinal"
                        value={formValue.professional}
                    />
            </Form.Group>
            <Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '48%' }}>
                    <Form.ControlLabel>Price</Form.ControlLabel>
                    <Form.Control 
                        name="price" 
                        value={formValue?.price}
                    />
                </div>
                <div style={{ width: '48%' }}>
                    <Form.ControlLabel>Duration</Form.ControlLabel>
                    <Form.Control 
                        name="duration" 
                        value={formValue?.duration}
                    />
                </div>
            </div>
            </Form.Group>
            <Form.Group>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ width: '48%' }}>
                    <Form.ControlLabel>Availability</Form.ControlLabel>
                    <Form.Control 
                        style={{width: '100%'}}
                        name="availability" 
                        accepter={InputPicker}
                        data={formValue?.availability?.map((item, index)=>({label: item, value: index}))}
                        placeholder='select availability'
                        />
                    </div>
                    <div style={{ width: '48%' }}>
                    <Form.ControlLabel>Date</Form.ControlLabel>
                    <Form.Control 
                        name="duration" 
                        type='date'
                        format="DD/MM/YYYY"
                        onChange={(text)=>handleDateChange(text)}  
                    />
                    </div>
                </div>  
            </Form.Group>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button style={{marginRight: 5}} appearance='primary' type='submit'>Submint</Button>
                <Button>Cancel</Button>
            </div>
            
        </Form>
    )
}

export default FormComponent;

