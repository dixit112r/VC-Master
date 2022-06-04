import React,{useState} from "react";
import {Button,ProgressBar} from "react-bootstrap";
import AddTask from "./AddTask";
import {useLocation} from 'react-router-dom';
import EditTask from "./EditTask";

var defaultDate = new Date();
var dd = String (defaultDate.getDate()).padStart(2,'0');
var mm = String (defaultDate.getMonth()+1).padStart(2,'0');
var yyyy = defaultDate.getFullYear();
defaultDate = yyyy+"-"+mm+"-"+dd;
var finalProgress;

function TasksList ({selfInfo,flag}) {
    let location = useLocation();
    const [toggleAddTaskForm, setToggleAddTaskForm] = useState(false);
    const [toggleEditTaskForm, setToggleEditTaskForm] = useState(null);
    const toggle = (i) => {
        if(toggleEditTaskForm === i){
            return setToggleEditTaskForm(null)
        }
        setToggleEditTaskForm(i);
        
    }

    const updateProgress = (startDate,endDate)=>{
        if(startDate === defaultDate){
            finalProgress=0;
            // console.log("same date");
        }
        else{
            var defaultDate1 = new Date(defaultDate);
            let startDate1 = new Date(startDate);
            let endDate1 = new Date(endDate);              
            finalProgress = Math.round( 100 / (endDate1.getDate() - startDate1.getDate()) )*(defaultDate1.getDate() - startDate1.getDate());
            // console.log(finalProgress);
            // console.log("different date");
        }
    }
    const taskList = selfInfo.tasks;
    const attendeeId = selfInfo.id;
    return(
                <>
                <div className={location.pathname ===`/${flag}/${attendeeId}`?'content show':location.pathname.search(`/hosts/h`) >= 0 ?'content show':'content'}
                 style={{marginTop:10}}>
                <div className={toggleAddTaskForm? 'itemAddTask':'itemTask'} style={{height:78.24,alignItems:'center'}}>
                        <Button style={{width:420,marginTop:6}} onClick={()=> setToggleAddTaskForm(!toggleAddTaskForm)}><h5>Add Task</h5></Button>
                </div>
                {
                toggleAddTaskForm &&
                <AddTask selfInfoId={attendeeId} />
                }
                </div>
                {taskList.map((task,i)=>(
                    <div key={i} className='itemTask'>
                        <div className='titleTask' >
                            <h5>{task.title}</h5>
                            <div style={{alignItems:'center'}}>
                            <div className={location.pathname ===`/${flag}/${attendeeId}`?'content show':location.pathname.search(`/hosts/h`) >= 0 ?'content show':'content'}>
                        <Button style={{marginTop:6}} onClick={()=> toggle(i)}>Edit Task</Button>
                        </div>
                        </div>
                        </div>
                        {updateProgress(task.startDate,task.endDate)}
                        <div className={toggleEditTaskForm===i?'content show':'content'} style={{marginTop:10}}>
                        <EditTask taskData={task} selfInfoId={attendeeId} flag={flag}/>
                        </div>
                        
                        <div className='content show' style={{marginTop:10}}>
                        <div style={{display: "flex",justifyContent: "space-between"}}>
                            <h6>Create Date:&nbsp;
                            {task.createDate}</h6>
                        </div>
                        <div style={{display: "flex",justifyContent: "space-between"}}>
                            <h6>Start Date:&nbsp;
                            {task.startDate}</h6>
                            <h6>End Date:&nbsp;
                            {task.endDate}</h6>
                        </div>
                        <div style={{display: "flex",justifyContent: "space-between"}}>
                            <ProgressBar style={{width:150,height:30}} now={finalProgress} label={`${finalProgress}%`} />
                            { 
                                (task.priority === "High")
                                ?<div className='priority' style={{backgroundColor:"#e34444"}}>
                                    <label>{task.priority}</label>
                                </div>
                                :(task.priority !== "Low")
                                ?<div style={{backgroundColor:"#e38e44",color:"white",width:150}}>
                                    <label>{task.priority}</label>
                                </div>
                                :<div style={{backgroundColor:"#44e369",color:"white",width:150}}>
                                    <label>{task.priority}</label>
                                </div>
                            }
                        </div>
                        </div>
                    </div>
                ))}
            </>
)
}

export default TasksList

/*
If update date == today date:
	pass
else:
	progress = ( 100 / (end date - start date) ) * (today date - start date)
*/

