import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../../Layout/Main";
import Register from "./Register";
import Login from "../Login";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Dashboard/Users";
import AddTask from "../../Components/AddTask";
import MyTasks from "../../Components/MyTasks";
import PrivateRoute from "../../Components/PrivateRoute";
import Home from "../../Components/Home";
import AvailableTask from "../../Components/AvailableTask";
import TaskDetails from "../../Components/TaskDetails";
import MySubmissions from "../../Components/MySubmissions";
import BuyerHome from "../../Components/BuyerHome";
import Payment from "../../Components/Payment";
import PaymentHistory from "../../Components/PaymentHistory";
import WorkerHome from "../../Components/WorkerHome";
import Withdrawals from "../../Components/Withdrawals";
import WithdrawalHistory from "../../Components/WithdrawalHistory";
import AdminHome from "../../Components/AdminHome";
import TaskManage from "../../Components/TaskManage";
 
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        }
        ,
        {
            path:'register',
            element:<Register></Register>
        },
        {
          path:'login',
          element:<Login></Login>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
       
       {
        path:'users',
        element:<PrivateRoute><Users></Users></PrivateRoute>
       },
       {
        path:'addTask',
        element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
       },
       {
        path:'myTask',
        element:<PrivateRoute><MyTasks></MyTasks></PrivateRoute>
       },
       {
        path:'AvailableTask',
        element:<PrivateRoute><AvailableTask></AvailableTask></PrivateRoute>,
       },
       {
        path:'tasks/:id',
        
      
        element:<PrivateRoute><TaskDetails></TaskDetails></PrivateRoute>,
        
       },
       {
        path:'mySubmission',
        element:<PrivateRoute><MySubmissions></MySubmissions></PrivateRoute>
       },
       {
        path:'buyerHome',
        element:<PrivateRoute><BuyerHome></BuyerHome></PrivateRoute>
       },
       {
        path:'purchaseCoin',
        element:<PrivateRoute><Payment></Payment></PrivateRoute>
       },
       {
        path:'paymentHistory',
        element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
       },
       {
        path:'workerHome',
        element:<PrivateRoute><WorkerHome></WorkerHome></PrivateRoute>
       },
       {
        path:'withdrawal',
        element:<PrivateRoute><Withdrawals></Withdrawals></PrivateRoute>

       },
       {
        path:'withdrawalHistory',
        element: <PrivateRoute><WithdrawalHistory></WithdrawalHistory></PrivateRoute>
       },
       {
        path:'adminHome',
        element:<PrivateRoute><AdminHome></AdminHome></PrivateRoute>
       }
       ,
       {
        path:'manageTask',
        element:<PrivateRoute><TaskManage></TaskManage></PrivateRoute>
       }
      ]
    }
  ]);

  export default router;