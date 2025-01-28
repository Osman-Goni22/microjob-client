import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import axiosPublic from '../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import useCurrentUser from './useCurrentUser';

const TaskDetails = () => {

    const navigate = useNavigate()
    const [currentUser] = useCurrentUser();
    const [task, setTask] = useState(null)
    const [buyer, setBuyer] = useState(null)
    console.log(buyer);
    const neededWorker = parseInt(task?.worker)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {

        const OrderedTask={
            taskId:task?._id,
            title:task?.task_title,
            photo:task?.task_image_url,
            workerName:currentUser.name,
            amount:task?.amount,
            status:'panding',
            worker_email:currentUser.email,

            buyerName:buyer?.name,
            buyerEmail:buyer?.email,
            currentDate: new Date(),
            submission_details:data.details
        }

        axiosPublic.post(`/ordered`, OrderedTask)
        .then(res=>{
            console.log(res.data);
            axiosPublic.patch(`workerChange/${task?._id}`, {worker:neededWorker})
            .then(res=>{
                console.log(res.data);
            })
        
            navigate('/dashboard/mySubmission')

        })

        console.log(OrderedTask);
    }

    const params = useParams()            //  loader:({params})=>fetch(`/tasks/${params.id}`),
    useEffect(() => {
        axiosPublic.get(`/task/${params.id}`)
            .then(res => {
                setTask(res.data)
                axiosPublic.get(`/users/${res.data?.addedBy}`)
                    .then(Buyerres => {
                        setBuyer(Buyerres.data);
                    })
            })
            .catch(err => console.log(err.message))
    }, [params.id])
    console.log(params);
    console.log(task);
    return (
        <div className='flex justify-center items-center'>
            <div className="card bg-base-100 w-[600px] shadow-xl">
                <figure className="">
                    <img
                        src={task?.task_image_url}
                        alt="Shoes"
                        className="rounded-xl w-[250px] h-[150px]" />
                </figure>
                <div className="card-body items-center text-center">

                    <div className='flex justify-between gap-5 items-center'>
                        <p className=' uppercase'>Vacancies : {task?.worker}</p>
                        <p>Amount       <span className='btn'>{task?.amount}</span></p>

                    </div>
                    <h2 className="card-title">{task?.task_title}</h2>

                    <div className='flex justify-between gap-5 items-center'>

                        <p className='text-red-300'>Submission Date:</p>

                        <p>{task?.completion_date}</p>
                    </div>



                    <p className='text-left'>{task?.details}</p>

                    <p className='text-red-500 text-left'>$ USD {task?.amount}</p>


                    <p className='text-left'>{task?.submission_info}</p>

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Details</span>
                                </label>

                                <textarea
                                {...register('details')}
                                    placeholder="Details"
                                    className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Apply</button>
                            </div>
                        </form>
                    </div>


                
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;