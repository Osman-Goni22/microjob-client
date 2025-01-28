import React from 'react';
import DashNav from './DashNav';
import { Link, Outlet } from 'react-router-dom';
import { FaAd, FaCoins, FaHistory, FaHome, FaList, FaNetworkWired, FaTasks, FaUser } from 'react-icons/fa';
import Footer from '../Footer';
import useCurrentUser from '../../Components/useCurrentUser';
import { BiMoneyWithdraw } from "react-icons/bi";

const Dashboard = () => {
    const [currentUser] = useCurrentUser();
    console.log(currentUser);
    return (
        <div>
            <DashNav></DashNav>
            <div className='flex'>
              <div>
                {
                    (currentUser?.role=='buyer')&&<div className='w-[300px] bg-orange-400 h-screen'>
                    <Link to='/dashboard/buyerHome' className='flex justify-center items-center py-2 gap-2'>
                        <FaHome></FaHome>
                       Buyer Home
                    </Link>
                   
                    <Link to='/dashboard/myTask' className='flex justify-center items-center py-2 gap-2'>

              
                    <FaList></FaList>
                        My Task
                    </Link>
                    <Link to='/dashboard/purchaseCoin' className='flex justify-center items-center py-2 gap-2'>

              
                       <FaCoins></FaCoins>
                        Purchase Coin
                    </Link>
                    <Link to='/dashboard/addTask' className='flex justify-center items-center py-2 gap-2'>

             
                        <FaAd></FaAd>
                        Add New Task
                    </Link>
                    <Link to='/dashboard/paymentHistory' className='flex justify-center items-center py-2 gap-2'>

              
                       <FaHistory></FaHistory>
                        Payment History
                    </Link>
                </div>
                
                }

                {
                    (currentUser?.role=='worker')&&<div className='w-[300px] bg-orange-400 min-h-screen'>
                    <Link to='/dashboard/workerHome' className='flex justify-center items-center py-2 gap-2'>
                        <FaHome className='text-2xl'></FaHome>
                       Worker Home
                    </Link>
                  
                    <Link to='/dashboard/AvailableTask' className='flex justify-center items-center py-2 gap-2'>

              
                       <FaTasks></FaTasks>
                        Task List
                    </Link>
                    <Link to='/dashboard/mySubmission' className='flex justify-center items-center py-2 gap-2'>

              
                     <FaList></FaList>
                        My Submission
                    </Link>

                    <Link to='/dashboard/withdrawal' className='flex justify-center items-center py-2 gap-2'>

             
                       <BiMoneyWithdraw className='text-2xl'></BiMoneyWithdraw>
                      WithDraw
                    </Link>

                    <Link to='/dashboard/withdrawalHistory' className='flex justify-center items-center py-2 gap-2'>

             
                       <BiMoneyWithdraw className='text-2xl'></BiMoneyWithdraw>
                      WithDrawal History
                    </Link>
                    
                </div>
                
                }
                {
                    (currentUser?.role=='admin')&&<div className='w-[300px] bg-orange-400 h-screen'>
                    <Link to='/dashboard/adminHome' className='flex justify-center items-center py-2 gap-2'>
                        <FaHome className='text-xl'></FaHome>
                      Admin  Home
                    </Link>
                    <Link to='/dashboard/users' className='flex justify-center items-center py-2 gap-2'>

              
                        <FaUser></FaUser>
                       Manage Users
                    </Link>
                    <Link to='/dashboard/manageTask' className='flex justify-center items-center py-2 gap-2'>

              
                        <FaTasks></FaTasks>
                        Manage Tasks
                    </Link>

                    <hr className='border-b border-1 border-white' />

                    <Link to='/' className='flex justify-center items-center py-2 gap-2'>
                        <FaHome className='text-xl'></FaHome>
                       Home
                    </Link>
                 

                   
                   
                </div>
                
                }
              
              </div>
                <div className='flex-1 min-h-screen '>
                   <div className='flex flex-col h-screen'>
                   <div className='flex-1' >
                   <Outlet></Outlet>
                   </div>
                    
                 <div className=''>
                 <Footer></Footer>
                 </div>
                   
                   </div>
                 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;