import React from 'react';
import axiosPublic from '../hooks/useAxiosPublic';
import useCurrentUser from './useCurrentUser';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Payment = () => {
 const [currentUser, refetch] = useCurrentUser();
 const axiosSecure = useAxiosSecure();
    const handlePurchaseCoin = e=>{
        e.preventDefault();
        const email = e.target.email.value;
        const dolar = e.target.dolar.value;
        const coins = dolar*10;
        console.log(coins, email, dolar);
        e.target.reset();
       const paymentData = {
        email:currentUser.email,
        dolar:dolar,
        coins:coins,
        date: new Date()
       }

        axiosSecure.patch(`/addCoin/${currentUser?.email}`, {coin:coins} )
        .then(res=>{
            console.log("Added");
            refetch();

            axiosSecure.post(`/paymentHistory`, paymentData)
            .then(res =>{
                console.log(res.data);
            })

        })



    }
    return (
        <div className='mx-auto'>
            <h2>1 dollar = 10 coins</h2>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handlePurchaseCoin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Dollar</span>
                        </label>
                        <input type="number"  name='dolar' placeholder="Dollar " className="input input-bordered" required />
                        
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-indigo-400">Purchase Coin</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;