import ListStaffPage from "../Pages/Staff/ListStaffPage";
import ListWorkOrderPage from "../Pages/WorkOrder/ListWorkOrderPage";


const SideBar = [
    {
        icon:"assignment_ind",
        text:"Staff",
        link:"/staff",
        page: ListStaffPage
    },
    {
        icon:"assignment",
        text:"Perintah Kerja",
        link:"/work-order",
        page: ListWorkOrderPage
    },
    
]
export default SideBar;