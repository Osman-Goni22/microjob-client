import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axiosPublic from './useAxiosPublic';



const useUsers = () => {


    const {refetch, data : users=[]}= useQuery({


      queryKey:['users'],
      queryFn: async()=>{
      
        const drivenUsers = await axiosPublic.get('/users');
        console.log(drivenUsers);
        return drivenUsers.data;
      }
    })

   return [users, refetch]
};

export default useUsers;