import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {
    const navigate = useNavigate();
    const {signUp,updateUserProfile} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) =>{

        if(data.role==='buyer'){
            data.coin=50;
        }
        else{
            data.coin=10;
        }
        
        signUp(data.email, data.password)
        .then(res=>{

            updateUserProfile(data.name, data.photo)
            .then(res=>{
                console.log('User profile updated successfully');
                const user ={
                    email:data.email,
                    name:data.name,
                    photo:data.photo,
                    role:data.role,
                    coin:data.coin
                    

                }

                axiosPublic.post('/users', user)
                .then(res=>{
                    console.log(res.data);
                    navigate('/');
                    
                })
            })

        })
    };

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input {...register('name', { required: true })} type="text" placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register('email', { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input {...register('photo', { required: true })} type="text" placeholder="Photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Role</span>
                    </label>


                    <select {...register('role')} className="select select-bordered w-full max-w-xs">
                        
                        <option value='worker'>Worker</option>
                        <option value='buyer'>Buyer</option>
                    </select>

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input {...register('password', {
                        required: true, minLength: {
                            value: 6,
                            message: 'Password must be 8 characters or larger'
                        }
                    })}  placeholder="password" className="input input-bordered" required />

                </div>
                {errors.password && <p>{errors.password.message}</p>}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Resister</button>
                </div>
            </form>

            <p>Already have account? <Link className='text-red-500' to='/login'>Login</Link></p>
        </div>
    )
};

export default Register;