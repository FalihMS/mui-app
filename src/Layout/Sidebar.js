import ListStaffPage from "../Pages/Staff/ListStaffPage";
import ListWorkOrderPage from "../Pages/WorkOrder/ListWorkOrderPage";
import ListProduk from "../Pages/Produk/ListProdukPage";
import ListMekanik from "../Pages/Mekanik/ListMekanikPage";
import ListService from "../Pages/Servis/ListServisPage";


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
    {
        icon:"assignment",
        text:"Produk",
        link:"/produk",
        page: ListProduk
    },
    {
        icon:"assignment",
        text:"Mekanik",
        link:"/mekanik",
        page: ListMekanik
    },
    {
        icon:"assignment",
        text:"Service",
        link:"/service",
        page: ListService
    },
    
]
export default SideBar;