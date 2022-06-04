import AttendeesList from './components/AttendeesList';
import HostsList from "./components/HostsList"
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useEffect,useState } from 'react';

function App() {
  const [dbAttendees,setDbAttendees] = useState(null);
  const [dbHosts,setDbHosts] = useState(null);

  const dataCalling = async () => {
    try{
        const res = await fetch('/data',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
        });
        const data = await res.json();
        setDbAttendees(data.attendees);
        setDbHosts(data.hosts);
        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
        }
    }
    catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
      dataCalling();
  },[]);
  
  //console.log(dbAttendees);
  //console.log(dbHosts);
  
const attendeesList = dbAttendees;
const hostsList = dbHosts;

  return (
    <Router>{ dbHosts && 
    <div className="header">
      <Switch>
        <Route path="/" >
          <HostsList hostsList={hostsList} />
          <AttendeesList attendeesList={attendeesList} />
          </Route>
      </Switch>
    </div>}
    </Router>
  );
}
export default App;


//const attendeesList = db.attendees;
//const hostsList = db.hosts;
//let location = useLocation();
//{console.log(location.pathname)} 
//import db from "./db.json";
//<Route path="/attendees/:id" component={TasksList}/> 