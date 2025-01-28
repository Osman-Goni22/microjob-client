import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../Provider/AuthProvider';
import axiosPublic from '../hooks/useAxiosPublic';
import useCurrentUser from './useCurrentUser';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddTask = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [currentUser, refetch] = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    console.log(currentUser);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async(data) => {
        if ((data.worker * data.amount) > currentUser.coin) {

            toast('Insufficient Balance');
            return;
        }

       

      

        

        data.addedBy = user.email;
        axiosSecure.post('/tasks', data)
            .then(res => {
                console.log(res.data);

                currentUser.coin -= (data.amount * data.worker)

                axiosPublic.patch(`/users`, currentUser)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire("Task Added Successfully!");
                        navigate('/myTask');
                    })
                refetch();

            })

    }

    return (
        <div className="card bg-base-100 w-3/4 shrink-0 shadow mx-auto" >
            <form className="card-body grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control " >
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input {...register('task_title')} type="text" placeholder="Title" className="input input-bordered" required />
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Workers</span>
                    </label>
                    <input {...register('worker')} type="text" placeholder="Worker" className="input input-bordered" required />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <input {...register('amount')} type="text" placeholder="amount" className="input input-bordered" required />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Completion Date</span>
                    </label>
                    <input {...register('completion_date')} type="text" placeholder="Date" className="input input-bordered" required />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">submission_info</span>
                    </label>
                    <input {...register('submission_info')} type="text" placeholder="submission_info" className="input input-bordered" required />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input {...register('task_image_url')} type="text" placeholder="task_image_url" required />

                </div>

                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <textarea
                        placeholder="Details"
                        {...register('details')}
                        className="textarea textarea-bordered textarea-lg"></textarea>

                </div>


                <button className="btn-wide bg-amber-500 text-white px-4 py-2 rounded">
                    ADD TASK
                </button>


            </form>
        </div>
    )
};

export default AddTask;