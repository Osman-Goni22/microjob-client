import React, { useEffect, useState } from 'react';
import axiosPublic from '../hooks/useAxiosPublic';
import useCurrentUser from './useCurrentUser';

const PaymentHistory = () => {
    const [currentUser, refetch] = useCurrentUser();
    const [payments, setPayments] = useState([])
    useEffect(()=>{
        axiosPublic.get(`/payments/${currentUser.email}`)
        .then(res=>{
            setPayments(res.data)
        })
    },[currentUser.email])
    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Email</th>
        <th>Dollar</th>
        <th>Coins</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {
        payments?.map((payment,indx)=><tr>
        <th>{indx+1}</th>
        <td>Email: {payment.email}</td>
        <td> {payment.dolar} Dollar</td>
        <td>{payment.coins} Coins</td>
        <td>{payment.date} </td>
      </tr>
          
        )
      }
     
      
    </tbody>
  </table>
</div>
    );
};

export default PaymentHistory;