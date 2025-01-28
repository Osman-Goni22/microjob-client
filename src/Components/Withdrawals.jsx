import React, { useState } from 'react';
import useCurrentUser from './useCurrentUser';
import axiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Withdrawals = () => {
    const axiosSecure = useAxiosSecure();
    const [currentUser,refetch] = useCurrentUser();
    const [coin, setCoin] = useState(0)
    const [dollar, setDollar] = useState(coin/20)
    const handleWithDraw = e=>{
        e.preventDefault();
        const coins = e.target.coin.value;
        const dollars = e.target.dollar.value;
      console.log(coins, dollars);
      const withDrawalsObject = {
        coin:coins,
        dollar:dollars,
        email:currentUser.email,
        status:'pending'
      }

      axiosSecure.post(`/withdrawals`, withDrawalsObject)
      .then(res=>{
        console.log(res.data);
        
      })
    }
    return (
        <div>
            <div className='flex justify-evenly items-center'>
                <h2>This is withdrawal page</h2>
                <h2>Available Coin  {currentUser?.coin}</h2>
                <h2>Equivalent dollar {currentUser.coin / 20}</h2>
            </div>
            <div className='mx-auto'>
                <div className="card bg-base-100  w-1/2 mx-auto shrink-0 shadow-2xl">
                    <form onSubmit={handleWithDraw} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Coin</span>
                            </label>
                            <input onChange={e=>setCoin(e.target.value)}  name='coin' type="number" placeholder="Coin" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Dollar</span>
                            </label>
                            <input value={coin/20} name='dollar' readOnly type="number" placeholder="dollar" className="input input-bordered" required />
                        </div>
                        
                        
                        <div className="form-control mt-6">
                            <button className={`btn bg-cyan-600 ${coin>currentUser.coin && 'btn-disabled'}`}>WithDraw</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Withdrawals;