import React from 'react';
import useJobs from './useJobs';
import { Link } from 'react-router-dom';

const AvailableTask = () => {
    const [tasks] = useJobs()
    return (
        <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
               #
              </th>
              <th>Image</th>
              <th>Title</th>
              
              <th>Needed Worker</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
           
           {
            tasks.map((task,indx)=> <tr key={indx}>
            <th>
             {indx+1}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={task.task_image_url}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                
              </div>
            </td>
            <td>
              
                {task.task_title}
             
            </td>
           
            
            <th>
              <button className="btn btn-ghost btn-xs">{task.worker}</button>
            </th>
            <th>
              <Link to={`/dashboard/tasks/${task._id}`}  className="btn btn-ghost ">details</Link>
            </th>
          </tr>

            )
           }
          
           
          </tbody>
          {/* foot */}
          
        </table>
      </div>
    );
};

export default AvailableTask;