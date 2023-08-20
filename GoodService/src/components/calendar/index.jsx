import { Calendar, Badge } from 'rsuite';
import { useEffect, useState } from 'react';


const CalendarCompontent = (props) =>{
    const [events, setEvents] = useState({});


    useEffect(() => {
        if (Array.isArray(props?.data)) {
            const newEvents = props?.data?.reduce((acc, event) => {
                
                const date = event?.date?.split('/').reverse().join('-');
    
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date]?.push(event);
                return acc;
            }, {});
            setEvents(newEvents);
        }
    }, [props]);





    const getTodoList = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        return events[formattedDate] || [];
      };
    
      const renderCell = (date) => {
        const list = getTodoList(date);
    
        if (list.length) {
          return <Badge className="calendar-todo-item-badge" />;
        }
    
        return null;
    };
    
    
    return(
        <div style={{width: '100%'}}>
            <Calendar compact renderCell={renderCell} />
        </div>
    )   
}
export default CalendarCompontent