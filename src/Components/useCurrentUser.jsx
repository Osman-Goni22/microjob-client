import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../hooks/useAxiosPublic';


const useCurrentUser = () => {
    const {user} = useContext(AuthContext)
    const {refetch, data :currentUser}= useQuery({


        queryKey:['user'],
        queryFn: async()=>{
        
          const drivenUser = await axiosPublic.get(`/users/${user?.email}`);
          
          return drivenUser.data;
        }
      })
  
     return [currentUser, refetch]
};

export default useCurrentUser;