import React from 'react';
import useCurrentUser from '../Components/useCurrentUser';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from './useAxiosPublic';

const useWithdrawalsHistory = () => {
    const [currentUser] = useCurrentUser();
    const {refetch, data : withdrawals=[]}= useQuery({


        queryKey:['jobs'],
        queryFn: async()=>{
        
          const drivenUsers = await axiosPublic.get(`/withdrawals/${currentUser?.email}`);
          console.log(drivenUsers);
          return drivenUsers.data;
        }
      })
  
     return [withdrawals, refetch]
};

export default useWithdrawalsHistory;