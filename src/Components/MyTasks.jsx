import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../Provider/AuthProvider';
import axiosPublic from '../hooks/useAxiosPublic';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useCurrentUser from './useCurrentUser';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyTasks = () => {
    const axiosSecure = useAxiosSecure();
const [currentUser, refetch] = useCurrentUser();
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axiosSecure.get(`/tasks/${user?.email}`)
            .then(res => {
                setTasks(res.data);
                console.log(res.data);
            })
    }, [user?.email])

    const handleTaskDelete = (task) => {
        const addAmount = (task?.amount*task.worker);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const modifiedAmount = {
                    amount: addAmount

                }

                axiosPublic.patch(`/users/${user?.email}`, modifiedAmount)
                    .then(res => {
                        console.log('amount updated successfully');
                        axiosPublic.delete(`/tasks/${task._id}`)
                            .then(res => {
                                if (res.data.deletedCount > 0) {
                                    setTasks(tasks.filter(t => t._id !== task._id));
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });

                                    refetch()


                                   


                                }
                            })

                    })
                    .catch(err => {
                        console.log('User update problem');
                    })




            }
        });


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
                            <th>Price</th>
                            <th>Submission Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}

                        {
                            tasks?.map((task, indx) =>
                                <tr key={indx}>
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
                                                        src={task.task_image_url}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {task.task_title}
                                    </td>
                                    <td>{task.amount} $</td>
                                    <td>
                                        {task.completion_date}
                                    </td>
                                    <td >
                                        <FaEdit className='text-2xl text-orange-300'></FaEdit>
                                    </td>
                                    <td onClick={() => handleTaskDelete(task)}>
                                        <FaTrashAlt className='text-lg text-orange-300'></FaTrashAlt>
                                    </td>
                                </tr>
                            )
                        }



                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyTasks;