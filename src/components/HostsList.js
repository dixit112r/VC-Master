import React,{useState} from "react";
import TasksList from './TasksList';
import Button from "react-bootstrap/Button";

function HostsList ({hostsList}){
    const [toggleHostList, setToggleHostList] = useState(null);
    
        
    const toggle = (i) => {
        if(toggleHostList === i){
            return setToggleHostList(null)
        }
        setToggleHostList(i);
        
    }
    return(
        <div className='wrapper'>
            <div className='accordion'>
                {hostsList.map((hosts,i)=>(
                    
                    <div key={i} className='item'>
                        <div className='title' >
                            <h2>{hosts.name}</h2>
                            <Button variant="secondary" style={{backgroundColor:'#85662b'}} onClick={()=>toggle(i)}>
                                Tasks</Button>
                        </div>
                        <div className={toggleHostList===i?'content show':'content'} style={{marginTop:10}}>
                            <TasksList selfInfo={hosts} flag="hosts"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HostsList

