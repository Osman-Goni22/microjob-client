import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosPublic from './useAxiosPublic';
import useAxiosSecure from './useAxiosSecure';

const useAllJobs = () => {
  const axiosSecure = useAxiosSecure();
    const {refetch, data : jobs=[]}= useQuery({


        queryKey:['users'],
        queryFn: async()=>{
        
          const drivenUsers = await axiosSecure.get('/allJobs');
          console.log(drivenUsers);
          return drivenUsers.data;
        }
      })
  
     return [jobs, refetch]
};

export default useAllJobs;