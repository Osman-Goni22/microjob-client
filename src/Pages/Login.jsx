import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import axiosPublic from '../hooks/useAxiosPublic';

const Login = () => {
    const {signInWithGoogle,  login} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const handleGoogleLogin = e=>{
        signInWithGoogle()
        .then((res)=>{
            console.log('Login successful');
            const user = {
                email:res.user.email,
                name:res.user.displayName,
                photo:res.user.photoURL,
                role:'worker',
                coin:10
            }
            axiosPublic.post('/users/google', user)
            .then(loginRes=>{
                console.log(loginRes.data);
                navigate('/')
            })
        })
    }
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
        } = useForm();
    
    
        const onSubmit = (data) =>{
            console.log(data)
         
            login(data.email, data.password)
            .then(res=>{
                navigate('/');
            })
          
        };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
               
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register('email', { required: true })} type="email" placeholder="email" className="input input-bordered" required />
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
                    <button className="btn btn-primary">Login</button>
                </div>
                
            </form>

           <div>
           <button onClick={handleGoogleLogin} className="btn btn-wide bg-amber-300">

            LoginWithGoogle
           </button>
           </div>
            <p>Don't have account ? <Link to='/register'>Please <span className='text-red-500'>Register</span></Link></p>
        </div>
    );
};

export default Login;