import React from 'react';

import useAllJobs from '../hooks/useAllJobs';
import useJobs from './useJobs';

const Tasks = () => {
    const [tasks] = useJobs();
    return (
        <div>
            <h2>{tasks.length}</h2>
          <div className='grid grid-cols-3 gap-4'>
          {
                tasks?.map((task,indx)=><div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                  <img
                    src={task.task_image_url}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="text-2xl font-bold">
                   {task?.task_title}
                    <div className="badge badge-secondary">Amount: {task?.amount}</div>
                  </h2>
                  <p className='text-left'>{task.submission_info}</p>
                  
                    <div className="text-left">{task?.details}</div>
                    <p className='btn bg-red-300'>VACANCIES: {task.worker}</p>
                 
                </div>
              </div>)
            }
          </div>
        </div>
    );
};

export default Tasks;