import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddNewStaff from '../Pages/Staff/AddNewStaff';
import DetailStaff from '../Pages/Staff/DetailStaff';
import AddNewWorkOrder from '../Pages/WorkOrder/AddNewWorkOrder';
import SideBar from './Sidebar';

function App() {
    const Sidebar = SideBar
  return (
    <Router>
        <Switch>
            
            <Route path="/staff/create">
                <AddNewStaff/>
            </Route>
            <Route path="/staff/:id" >
                <DetailStaff/>
            </Route>   

            <Route path="/work-order/create">
                <AddNewWorkOrder/>
            </Route>
            <Route path="/staff/:id" >
                <DetailStaff/>
            </Route>   
           
            {
                Sidebar.map(item =>{
                    return(
                    <Route path={item.link} exact="true">
                        {item.page}
                    </Route>                                
                    )
                })
            }
        </Switch>
    </Router>
  )
}

export default App;
