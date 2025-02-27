import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BudgetFiltering from './budget_filtering/budget_filtering'
import Checklist from './checklist/checklist'
import Home_page from './components/home_page/home_page'
import Home from './components/home_page/home'
import Event_Organizer_Login from './components/log_in/event_organizer_login/event_organizer_login'
import Event_Planner_Login from './components/log_in/event_planner_login/event_planner_login'
import EventInvitation from "./invitation_send/invitation_send";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Event_Organizer_Signin from './components/sign_in/event_organizer_signin/event_organizer_signin'
import Event_Planner_Signin from './components/sign_in/event_planner_signin/event_planner_signin'
import Navigation from './event_planner_site/navigation/navigation'
import Home_PAGE from './event_planner_site/home_page/home_page'
import Packages from './event_planner_site/packages/packages'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      {/* <Home/> */}
      {/* {<Event_Organizer_Signin/>} */}
      {/* {<Event_Planner_Signin/>} */}
      {/* {<BudgetFiltering/>} */}
      {/* {<Home_Page/>} */}
      {/* {<Navigation/>} */}
      {/* {<Packages/>}  */}
      {/* {<Event_Organizer_Signin/>} */}
      <Routes>
        <Route path='/' element={<Home_page/>} />
        <Route path='/organizer_login' element={<Event_Organizer_Login/>} />
        <Route path='/planner_login' element={<Event_Planner_Login/>} />
        <Route path='/organizer_signin' element={<Event_Organizer_Signin/>}/>
        <Route path='/planner_signin' element={<Event_Planner_Signin/>}/>
        <Route path='/Home' element={<Home/>} />
        <Route path='/Budget_Filtering' element={<BudgetFiltering/>} />
        <Route path='/Home_PAGE' element={<Home_PAGE/>} />
        <Route path='/Packages' element={<Packages/>} />



        {/* { <EventInvitation/> }
        { <BudgetFiltering/> }
        { <Checklist/> } */}
      </Routes>
    </Router>

    
  </StrictMode>
)
