import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import JobDetails from "../Pages/JobDetails/JobDetails";
import AddJob from "../Pages/AddJob/AddJob";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyPostedJobs from "../Pages/MyPostedJobs/MyPostedJobs";
import MyBids from "../Pages/MyBids/MyBids";
import UpdateJob from "../Pages/UpdateJob/UpdateJob";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<ErrorPage></ErrorPage>,
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/jobDetails/:id",
                element: <JobDetails></JobDetails>,
                loader:({params})=> fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
            },
            {
                path: "/update/:id",
                element: <UpdateJob></UpdateJob>,
                loader:({params})=> fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
            },
            {
                path: "/addJob",
                element: <AddJob></AddJob>,
            },
            {
                path: '/myPostedJobs',
                element: <MyPostedJobs></MyPostedJobs>
            },
            {
                path: '/myBids',
                element: <MyBids></MyBids>
            },
            {
                path: '/bidRequests',
                element: <MyBids></MyBids>
            },
        ]
    },
]);

export default router