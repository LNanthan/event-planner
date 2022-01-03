import DaysDiv from './components/Days';
import Header from './components/Header';
import InfoSubHeader from './components/InfoSubHeader';
import SelectWeek from './components/SelectWeek';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/pages/Home';
import Create from './components/pages/Create';
import Join from './components/pages/Join';
import Planner from './components/pages/Planner';
import Event from './components/pages/Event';
import { EventContext } from './components/EventContext';

const startDate = new Date(2021, 7, 20);
const endDate = new Date(2021, 8, 6);
// var currentWeek = 3;

function App() {
  //data --> creatorName, eventName, sDate, eDate, auth 
  // const [data, setData] = useState([]);
  
    
//   const changeWeek = (numWeek) => {
//     setCWeek(numWeek);
//     console.log(currentWeek);
// }
  return (
    <div>
     <Header/>
      <Router>
      {/* <EventContext.Provider value ={{data,setData}}> */}
        <Switch>
          
            <Route exact path='/' component={Home} />
            <Route path='/create' component={Create} />
            <Route path='/join' component={Join} />
            <Route exact path = '/event' component = {Event} />
            <Route path = '/event/view' component = {Planner} />
          
        </Switch>
        {/* </EventContext.Provider> */}
      </Router>
     
     
     
     {/* <InfoSubHeader eName = "Picnic" cName = "Luxsa"/>
     <SelectWeek onSelectWeek = {changeWeek}/>
     <DaysDiv sDate = {startDate} eDate = {endDate} cWeek = {currentWeek}/> */}
    </div>
  );
}

export default App;
