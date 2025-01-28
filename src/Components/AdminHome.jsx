import React from 'react';
import useUsers from '../hooks/useUsers';


import useWithdrawReq from '../hooks/useWithdrawReq';
import axiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [users] = useUsers();
    const buyers = users?.filter(user => user.role == 'buyer');
    const workers = users?.filter(user => user.role == 'worker');
    const availableCoin = buyers?.reduce((total, buyer) => {
        return total + buyer.coin
    }, 0)

    const [requests, refetch] = useWithdrawReq();
    const pendingWithdrawals = requests?.filter(withdrawal=>withdrawal.status=='pending')

    const handleAcceptPayment = (withdrawal)=>{
        console.log(withdrawal);

        const updatedWithdraw = {
            id:withdrawal._id,
            status:'accepted',
            coin:withdrawal.coin,

        }

        axiosSecure.patch(`/reduceUserCoin/${withdrawal?.email}`, updatedWithdraw)
        .then(coinRes=>{
            console.log(coinRes.data);
            refetch();
            
        })
    }
    return (
        <div>
            <div className='flex justify-evenly items-center'>
                <h2> Total users {users?.length}</h2>
                <h2>Buyers {buyers.length}</h2>
                <h2>Workers {workers.length}</h2>
                <h2>Coins {availableCoin}</h2>
                <h2>Coins {availableCoin}</h2>
            </div>

            <h2>{requests?.length}</h2>

            <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Coins</th>
                            <th>Dollar</th>
                            <th>Accept Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests && requests.length > 0 ? (
                            pendingWithdrawals.map((withdrawal, index) => (
                                <tr key={withdrawal.id || index}>
                                    <th>{index + 1}</th>
                                    <td>{withdrawal.email}</td>
                                    <td>{withdrawal.coin}</td>
                                    <td>{withdrawal.dollar}</td>
                                    <td onClick={()=>handleAcceptPayment(withdrawal)} className='btn btn-success'>Payment Success</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No withdrawals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>

        </div>
    );
};

export default AdminHome;