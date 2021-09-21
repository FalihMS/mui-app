import ListStaffPage from "../Pages/Staff/ListStaffPage";
import ListWorkOrderPage from "../Pages/WorkOrder/ListWorkOrderPage";
import ListProduk from "../Pages/Produk/ListProdukPage";


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
    
]
export default SideBar;