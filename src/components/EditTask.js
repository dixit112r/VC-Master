import React,{useState} from "react";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useLocation} from 'react-router-dom';
import Button from "react-bootstrap/Button";


function EditTask({taskData,selfInfoId,flag}) {
    
    let location = useLocation();
    const [editTask,setEditTask] = useState({
        _id:taskData._id,
        title:taskData.title,
        createDate:taskData.createDate,
        startDate:taskData.startDate,
        endDate:taskData.endDate,
        progress:taskData.progress,
        priority:taskData.priority
    });
    let name, value;

    const handleInputs = (e) =>{ // To change data in form while saving the value in state
        //console.log(e);
        name = e.target.name;
        value = e.target.value;

        setEditTask({...editTask,[name]:value})
    }

    const PostEditData = async (e)=>{
        e.preventDefault();
        const {_id, title, createDate, startDate, endDate, progress, priority} = editTask;
        //console.log(_id);
        const res = await fetch("/editTask",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                selfInfoId, _id, title, createDate, startDate, endDate, progress, priority
            })
        });
        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Invalid one or more added task field");
        }else{
            window.alert("Task Updated Successfully");
            window.location.reload(false);
            //history.push("/")
        }
    }

    return (
        <>
            <Form method="POST" className="editTask" id="editTaskForm">
                {/* <Form.Row>
                    <Col xs={3} >
                        <Form.Label >Task title</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control  type="text" name="title" id="title" value={editTask.title} onChange={handleInputs} placeholder="Enter an updated task title" />
                    </Col>
                </Form.Row> */}                
                {/* <Form.Row>
                    <Col xs={3} >
                        <Form.Label>Create date</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control type="date" name="createDate" id="createDate" value={editTask.createDate} onChange={handleInputs} />
                    </Col>
                </Form.Row> */}
                <Form.Row>
                    <Col xs={3} >
                        <Form.Label>Start date</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control type="date" name="startDate" id="startDate" value={editTask.startDate} onChange={handleInputs} />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={3}>
                        <Form.Label>End date</Form.Label>
                    </Col> 
                    <Col>    
                        <Form.Control type="date" name="endDate" id="endDate" value={editTask.endDate}  onChange={handleInputs} />
                    </Col>
                </Form.Row>
                {/* <Form.Row>
                    <Col xs={3} >
                        <Form.Label >Progress</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control  type="number" name="progress" id="progress" min="0" max="100" 
                        value={editTask.progress} onChange={handleInputs} placeholder="Enter the progress" />
                    </Col>
                </Form.Row> */}
                
                <Form.Row className={location.pathname ===`/${flag}/${selfInfoId}`?'content show':location.pathname.search(`/hosts/h`) >= 0 ?'content show':'content'}>
                    <Col xs={3} >
                        <Form.Label>Priority</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control as="select" name="priority" value={editTask.priority} onChange={handleInputs}  id="priority" className="mr-sm-2" custom >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
                
                <Form.Row style={{marginTop:20}}>
                    <Col>
                        <Button variant="primary" type="submit" onClick={PostEditData}
                        >
                            Submit
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" type="reset">
                            Reset
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
            </>
    )
}

export default EditTask
