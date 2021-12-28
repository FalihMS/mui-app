/* eslint-disable react/jsx-key */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddNewStaff from '../Pages/Staff/AddNewStaff';
import DetailStaff from '../Pages/Staff/DetailStaff';
import AddNewWorkOrder from '../Pages/WorkOrder/AddNewWorkOrder';
import AddNewProduk from '../Pages/Produk/AddNewProduk';
import DetailProduk from '../Pages/Produk/DetailProduk';
import DetailMekanik from '../Pages/Mekanik/DetailMekanik';
import AddNewMekanik from '../Pages/Mekanik/AddNewMekanik';
import AddNewService from '../Pages/Servis/AddNewServis';
import DetailService from '../Pages/Servis/DetailServis';
import PrinterPKB from '../Pages/Printer/PrinterPKB';
import AddNewPKB from '../Pages/PKB/AddNewPKB';

import SideBar from './Sidebar';

function App() {
  const Sidebar = SideBar;
  return (
    <Router>
      <Switch>
        <Route path="/staff/create">
          <AddNewStaff />
        </Route>
        <Route path="/staff/:id">
          <DetailStaff />
        </Route>
        <Route path="/work-order/create">
          <AddNewWorkOrder />
        </Route>
        <Route path="/staff/:id">
          <DetailStaff />
        </Route>
        <Route path="/produk/create">
          <AddNewProduk />
        </Route>
        <Route path="/produk/:id">
          <DetailProduk />
        </Route>
        <Route path="/mekanik/create">
          <AddNewMekanik />
        </Route>
        <Route path="/mekanik/:id">
          <DetailMekanik />
        </Route>
        <Route path="/service/create">
          <AddNewService />
        </Route>
        <Route path="/service/:id">
          <DetailService />
        </Route>
        <Route path="/printer/pkb/:id">
          <PrinterPKB />
        </Route>
        <Route path="/pkb/create/:id">
          <AddNewPKB />
        </Route>

        {Sidebar.map((item) => {
          return (
            <Route path={item.link} exact="true">
              {item.page}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
