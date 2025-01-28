import React, { useEffect } from 'react';
import useUsers from '../../hooks/useUsers';
import { FaEdit, FaTrash, FaTrashAlt, FaUserAlt } from 'react-icons/fa';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import axiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useCurrentUser from '../../Components/useCurrentUser';


const Users = () => {
  const [currentUser] = useCurrentUser();
  const [users, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();
  const handleMakeAdmin = (email,newRole) => {
    
   
    console.log('newRole',newRole);
    axiosSecure.patch(`/user/admin/${email}`, { role: newRole })
      .then(res => {
        console.log(res.data);
        refetch();
      })



  }

  const handleDeleteUser = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/users/${email}`)
          .then(res => {
            console.log(res.data);
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });

          })

      }
    });

  }

  console.log(users);
  return (
    <div className="w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                #
              </label>
            </th>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>

            <th>Delete</th>
          </tr>
        </thead>
        <tbody>


          {users.map((user, indx) =>
            <tr key={indx}>
              <th>
                {indx + 1}
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photo}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>

                </div>
              </td>
              <td>
                {user.name}
              </td>
              <td >
                {user.role}
                
                  <select  defaultValue={user?.role} onChange={(e) => handleMakeAdmin(user?.email, e.target.value)} id="role">
                    <option value="worker">
                      worker
                    </option>
                    <option value="buyer">
                      buyer
                    </option>
                    <option value="admin">
                      admin
                    </option>
                  </select>
              
              </td>
             
              <th>
                <button onClick={() => handleDeleteUser(user.email)} className=""><FaTrashAlt className='text-xl text-orange-500'></FaTrashAlt></button>
              </th>
            </tr>)}






        </tbody>


      </table>
    </div>
  );
};

export default Users;