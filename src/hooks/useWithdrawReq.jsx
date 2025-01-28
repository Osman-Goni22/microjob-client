import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosPublic from './useAxiosPublic';

const useWithdrawReq = () => {
    const {refetch, data : requests=[]}= useQuery({


        queryKey:['workers'],
        queryFn: async()=>{
        
          const drivenUsers = await axiosPublic.get('/requests');
          console.log(drivenUsers);
          return drivenUsers.data;
        }
      })
  
     return [requests, refetch]
};

export default useWithdrawReq;