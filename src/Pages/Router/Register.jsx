import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axiosPublic from '../../hooks/useAxiosPublic';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Register = () => {
    const navigate = useNavigate();
    const {signUp,updateUserProfile} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = async(data) =>{
        if (!data.photo || !data.photo[0]) {
            console.error("No file selected.");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (passwordRegex.test(password)){
            
        const formData = new FormData();

        formData.append('image',data.photo[0]);

        const res = await axiosPublic.post(image_hosting_api,formData,{
            headers:{
                'content-Type':'multipart/form-data'
            }
        })

        console.log(res);
        if(res.data.success){
            const photo=res.data.data.display_url
            if(data.role==='buyer'){
                data.coin=50;
            }
            else{
                data.coin=10;
            }
            
            signUp(data.email, data.password)
            .then(res=>{
    
                updateUserProfile(data.name, photo)
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

        }
        
        }

        
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
                    <input className="w-full h-full text-lg" {...register('photo', { required: true })} type="file" placeholder="Photo" className="input input-bordered" required />
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