import ListWorkOrderPage from '../Pages/WorkOrder/ListWorkOrderPage';
import ListProduk from '../Pages/Produk/ListProdukPage';
import ListMekanik from '../Pages/Mekanik/ListMekanikPage';
import ListService from '../Pages/Servis/ListServisPage';

const SideBar = [
  // {
  //     icon:"assignment_ind",
  //     text:"Staff",
  //     link:"/staff",
  //     page: ListStaffPage
  // },
  {
    icon: 'content_paste',
    text: 'Perintah Kerja',
    link: '/work-order',
    page: ListWorkOrderPage
  },
  {
    icon: 'inventory_2',
    text: 'Produk',
    link: '/produk',
    page: ListProduk
  },
  {
    icon: 'badge',
    text: 'Mekanik',
    link: '/mekanik',
    page: ListMekanik
  },
  {
    icon: 'home_repair_service',
    text: 'Service',
    link: '/service',
    page: ListService
  }
];
export default SideBar;
