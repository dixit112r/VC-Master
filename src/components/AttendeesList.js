import React,{useState} from "react";
import TasksList from './TasksList';
import Button from "react-bootstrap/Button";


function AttendeesList ({attendeesList}) {
     const [toggleAttendeeList, setToggleAttendeeList] = useState(null);
    
        
        const toggle = (i) => {
            if(toggleAttendeeList === i){
                return setToggleAttendeeList(null)
            }
            setToggleAttendeeList(i);
            
        }
        
    return(
        <div className='wrapper'>
            <div className='accordion'>
                {attendeesList.map((attendees,i)=>(
                    
                    <div key={i} className='item'>
                        <div className='title' >
                            <h2>{attendees.name}</h2>
                            <Button variant="secondary" style={{backgroundColor:'#85662b'}} onClick={()=>toggle(i)}>
                                Tasks</Button>
                        </div>
                        <div className={toggleAttendeeList===i?'content show':'content'} style={{marginTop:10}}>
                            <TasksList selfInfo={attendees} flag="attendees"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}

export default AttendeesList