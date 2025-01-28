import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';

const useJobs = () => {
  const axiosSecure = useAxiosSecure();
    const {refetch, data : tasks=[]}= useQuery({


        queryKey:['tasksid'],
        queryFn: async()=>{
        
          const drivenUsers = await axiosSecure.get('/jobs');
          console.log(drivenUsers);
          return drivenUsers.data;
        }
      })
  
     return [tasks, refetch]
   
};

export default useJobs;