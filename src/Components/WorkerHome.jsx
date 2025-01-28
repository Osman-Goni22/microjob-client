import React from 'react';
import useMyOrders from '../hooks/useMyOrders';

const WorkerHome = () => {
    const [orders, refetch] = useMyOrders()

    const pandingSubmission = orders.filter(order => order.status === 'panding');
    const completedSubmission = orders.filter(order => order.status === 'accepted')
    const rejectedSubmission = orders.filter(order => order.status === 'rejected')
    const totalEarning = completedSubmission.reduce((total, task) => {
        return total + parseInt(task.amount)
    }, 0)

    return (
        <div>
            <div className='flex justify-evenly items-center'>
                <h2>Total Submission {orders.length}</h2>
                <h2>Panding Task  {pandingSubmission.length}</h2>
                <h2>Accepted Task  {completedSubmission.length}</h2>
                <h2>Rejected Task  {rejectedSubmission.length}</h2>
                <h2>Total Earning: {totalEarning}</h2>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                     #
                                    </label>
                                </th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            completedSubmission.map((task, indx) =>
                                <tr>
                            <th>
                                {indx+1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={task.photo}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                   
                                </div>
                            </td>
                            <td>
                            {task.title}
                            </td>
                            <td>
                                {task.amount}
                            </td>
                            <td>{task.status}</td>
                            
                        </tr>


                            )
                           }
                          
                       
                            
                        </tbody>
                        {/* foot */}
                       
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;