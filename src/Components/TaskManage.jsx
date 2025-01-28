import React from 'react';
import useAllJobs from '../hooks/useAllJobs';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const TaskManage = () => {
    const [jobs, refetch] = useAllJobs();

const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {

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

                axiosSecure.delete(`/deleteJob/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        console.log(res.data);
                        refetch();
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
                            <th>worker Need</th>
                            <th>Amount Per Employee</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            jobs?.map((job, indx) => <tr>
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
                                                    src={job.task_image_url}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {job.task_title}
                                </td>
                                <td>{job.worker}</td>
                                <td>{job.amount}</td>
                                <th>
                                    <button onClick={() => handleDelete(job._id)} className="btn btn-ghost btn-xs">delete</button>
                                </th>
                            </tr>)
                        }



                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default TaskManage;