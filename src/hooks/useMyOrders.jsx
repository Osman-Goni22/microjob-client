import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosPublic from './useAxiosPublic';
import useCurrentUser from '../Components/useCurrentUser';
import useAxiosSecure from './useAxiosSecure';

const useMyOrders = () => {
    const [currentUser] = useCurrentUser()
    const axiosSecure = useAxiosSecure();
    const {refetch, data : orders=[]}= useQuery({


        queryKey:['myTasks'],
        queryFn: async()=>{
        
          const drivenUsers = await axiosSecure.get(`/myOrders/${currentUser.email}`);
          console.log(drivenUsers);
          return drivenUsers.data;
        }
      })
  
     return [orders, refetch]
    }

export default useMyOrders;