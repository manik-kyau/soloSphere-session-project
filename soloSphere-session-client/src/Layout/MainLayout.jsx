import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
                <div className='min-h-[calc(100vh-306px)]'>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;