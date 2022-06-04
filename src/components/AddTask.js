import React,{useState} from "react";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


var defaultStartDate = new Date();
var dd = String (defaultStartDate.getDate()).padStart(2,'0');
var mm = String (defaultStartDate.getMonth()+1).padStart(2,'0');
var yyyy = defaultStartDate.getFullYear();
defaultStartDate = yyyy+"-"+mm+"-"+dd;

var defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + parseInt(5));
dd = String (defaultEndDate.getDate()).padStart(2,'0');
mm = String (defaultEndDate.getMonth()+1).padStart(2,'0');
yyyy = defaultEndDate.getFullYear();
defaultEndDate = yyyy+"-"+mm+"-"+dd;


function AddTask({selfInfoId}) {
    
    // console.log(selfInfoId);
    const [addNewTask,setAddNewTask] = useState({
        title:"",
        createDate:defaultStartDate,
        startDate:defaultStartDate,
        endDate:defaultEndDate,
        progress:"0",
        priority:"Low"
    });

    let name, value;

    const handleInputs = (e) =>{ // To change data in form while saving the value in state
        //console.log(e);
        name = e.target.name;
        value = e.target.value;

        setAddNewTask({...addNewTask,[name]:value})
    }

    const PostData = async (e)=>{
        e.preventDefault();
        const {title,createDate,startDate,endDate,progress,priority} = addNewTask;
        
        const res = await fetch("/addTask",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                selfInfoId, title, createDate, startDate, endDate, progress, priority
            })
        });
        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Invalid one or more added task field");
        }else{
            window.alert("Task Added Successfully");
            window.location.reload(false);
            //history.push("/")
        }
    }
    
    return(
            <>
            <Form method="POST" className="itemTask" id="addTaskForm">
                <Form.Row>
                    <Col xs={3} >
                        <Form.Label >Task title</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control  type="text" name="title" id="title" value={addNewTask.title} onChange={handleInputs} placeholder="Enter a task title" />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={3} >
                        <Form.Label>Create date</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control type="date" name="createDate" id="createDate" value={addNewTask.createDate} onChange={handleInputs} />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={3} >
                        <Form.Label>Start date</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control type="date" name="startDate" id="startDate" value={addNewTask.startDate} onChange={handleInputs} />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={3}>
                        <Form.Label>End date</Form.Label>
                    </Col> 
                    <Col>    
                        <Form.Control type="date" name="endDate" id="endDate" value={addNewTask.endDate}  onChange={handleInputs} />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={3} >
                        <Form.Label >Progress</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control  type="number" name="progress" id="progress" min="0" max="100" 
                        value={addNewTask.progress} onChange={handleInputs} placeholder="Enter the progress" />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={3} >
                        <Form.Label>Priority</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control as="select" name="priority" value={addNewTask.priority} onChange={handleInputs}  id="priority" className="mr-sm-2" custom >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row style={{marginTop:20}}>
                    <Col>
                        <Button variant="primary" type="submit" onClick={PostData}
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

export default AddTask


//import { NavLink,useHistory } from "react-router-dom";
//const history = useHistory();
