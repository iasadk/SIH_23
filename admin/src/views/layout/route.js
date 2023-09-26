import { DashboardOutlined, BankOutlined, ApartmentOutlined, CalendarOutlined } from '@ant-design/icons';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/admin/Profile';
import ChangePassword from '../pages/admin/Change-password';
import PickUp from '../pages/PickUp';



const routes = [
    { title: 'Dashboard', icon: DashboardOutlined, url: '/', component: Dashboard },
    // { title: 'File Uploader', icon: ApartmentOutlined, url: '/file-uploader', component: FileUploader },
    // { title: 'Product', icon: BankOutlined, url: '/products',children:[
    //     { title: 'LifeScience', icon: ApartmentOutlined, url: '/', component:()=> <Product categoryType={'lifeScience'} /> },
    //     { title: 'Gases', icon: ApartmentOutlined, url: '/gases', component:()=> <Product categoryType={'gases'} /> },
    //     { title: 'Labware', icon: ApartmentOutlined, url: '/labware', component:()=> <Product categoryType={'labware'} /> },
    //     { title: 'LabInstument', icon: ApartmentOutlined, url: '/lab-instument', component:()=> <Product categoryType={'labInstument'} /> },
    //     { title: 'Chemical', icon: ApartmentOutlined, url: '/chemicals', component: Chemical },
    // ] },
    // { title: 'Subscribe', icon: BankOutlined, url: '/subscribe', component: Subscribe },
    // { title: 'Orders', icon: BankOutlined, url: '/orders', component: Order },
    // { title: 'Offer', icon: DashboardOutlined, url: '/offer', component: Offer },
    // { title: 'Coupon', icon: ApartmentOutlined, url: '/coupon', component: Coupon },
    { title: 'Pick Up', icon: ApartmentOutlined, url: '/pick-up', component: PickUp },
    // {
    //     title: 'Home Page', icon: DashboardOutlined, url: '/home', children: [
    //         { title: 'Banner', icon: ApartmentOutlined, url: '/', component: Banner },
    //         { title: 'Category Images', icon: ApartmentOutlined, url: '/category-images', component: CategoryImage },
    //         { title: 'Product', icon: ApartmentOutlined, url: '/product', component: HomeProduct },
    //     ]
    // },
   
    // {
    //     title: 'Application', icon: CalendarOutlined, url: '/application', children: [
    //         { title: 'Application', icon: CalendarOutlined, url: '/', component: Application },
    //         { title: 'Customer Support', icon: CalendarOutlined, url: '/customer-support', component: CustomerSupport },
    //         { title: 'Feedbacks', icon: CalendarOutlined, url: '/feedbacks', component: Feedback },
    //         { title: 'Contact Us Query', icon: CalendarOutlined, url: '/contactus-query', component: ContactUsQuery },
    //         { title: 'FAQ', icon: BankOutlined, url: '/faq', component: Faq },
    //         { title: 'Settings', icon: BankOutlined, url: '/settings', component: ContactUs },
    //         { title: 'About Us', icon: BankOutlined, url: '/aboutus', component: Aboutus },
    //         { title: 'Team', icon: ApartmentOutlined, url: '/team', component: Team },
    //         { title: 'Gallery', icon: BankOutlined, url: '/gallery', component: Gallery },
    //         { title: 'Blog', icon: DashboardOutlined, url: '/blogs', component: Blogs },
    //     ]
    // },
    // {
    //     title: 'Career', icon: BankOutlined, url: '/career', children: [
    //         { title: 'Job', icon: ApartmentOutlined, url: '/', component: Jobs },
    //         { title: 'Job Application', icon: ApartmentOutlined, url: '/jobs-applicatiuons', component: JobApplication },
    //     ]
    // },
    {
        title: 'You', icon: ApartmentOutlined, url: '/profile', children: [
            { title: 'Profile', icon: ApartmentOutlined, url: '/', component: Profile },
            { title: 'Change Password', icon: ApartmentOutlined, url: '/change-password', component: ChangePassword },
        ]
    },
].filter(v => (!v.hidden) || v.children?.length);

export default routes;