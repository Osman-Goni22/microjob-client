import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosPublic from './useAxiosPublic';
import useCurrentUser from '../Components/useCurrentUser';

const usePendingTasks = () => {
    const [currentUser] = useCurrentUser();
    const {refetch, data : jobs=[]}= useQuery({


        queryKey:['jobs'],
        queryFn: async()=>{
        
          const drivenUsers = await axiosPublic.get(`/pendingJobs/${currentUser?.email}`);
          console.log(drivenUsers);
          return drivenUsers.data;
        }
      })
  
     return [jobs, refetch]
};

export default usePendingTasks;