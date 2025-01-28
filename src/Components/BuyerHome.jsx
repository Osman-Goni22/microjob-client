import React, { useEffect, useState } from 'react';
import useCurrentUser from './useCurrentUser';
import axiosPublic from '../hooks/useAxiosPublic';
import Workers from './Workers';
import PendingJobs from './PendingJobs';

const BuyerHome = () => {
    const [tasks, setTasks] = useState([]);
    const [currentUser] = useCurrentUser();
    const totalWorkers = tasks?.reduce((total,task)=>{
        return total+parseInt(task.worker)
    },0)
    const totalAmount = tasks?.reduce((total,task)=>{
        return total+parseInt(task.amount)
    },0)
    useEffect(()=>{
        axiosPublic.get(`/tasks/${currentUser?.email}`)
        .then(res => {
            setTasks(res.data);
            console.log(res.data);
        })

    },[currentUser.email])
    return (
        <div>
            <div className='flex justify-evenly mt-4'>
                <p>Total Task: {tasks.length}</p>
                <p>Total Workers: {totalWorkers}</p>
                <p>Payable Amount: {totalAmount}</p>
            </div>
            <PendingJobs></PendingJobs>
        </div>
    );
};

export default BuyerHome;