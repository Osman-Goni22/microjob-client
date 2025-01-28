import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosPublic from './useAxiosPublic';

const useWorkers = () => {
    const {refetch, data : workers=[]}= useQuery({


        queryKey:['workers'],
        queryFn: async()=>{
        
          const drivenUsers = await axiosPublic.get('/workers');
          console.log(drivenUsers);
          return drivenUsers.data;
        }
      })
  
     return [workers, refetch]
   
};

export default useWorkers;