import React, { useState } from 'react';
import useMyOrders from '../hooks/useMyOrders';
import '../Components/page.css';
const MySubmissions = () => {
    const [orders] = useMyOrders();
    const submissions = orders.length;
    console.log(submissions);
    const [items, setItems] = useState(5);
    const itemsPerPage = items;
    const totalPages = Math.ceil(submissions / itemsPerPage);
    const pages = [...Array(totalPages).keys()];
    const [currentPage, setCurrentPage] = useState(0);
    console.log(pages);
    console.log(orders);
    const handlePageChange = (e) => {
        setCurrentPage(0);
        setItems(e.target.value)
    }
    return (
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
                            <th>Buyer</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, indx) => <tr key={indx}>
                                <th>
                                    <label>
                                        {indx + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={order.photo}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {order.title}
                                </td>
                                <td>{order.amount}</td>
                                <td>{order.buyerEmail}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">{order.status}</button>
                                </th>
                            </tr>)
                        }


                    </tbody>


                </table>


                <p>{currentPage}</p>



                <div>

           
                    
                    {
                        pages.map(page => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? 'btn btn-outline selected' : 'btn btn-outline'}>{page}</button>)
                    }

                    


                    <select onChange={handlePageChange} className='ml-2  dropdown ' defaultValue={items} name="" id="">
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default MySubmissions;