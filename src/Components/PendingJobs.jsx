import React from 'react';
import usePendingTasks from '../hooks/usePendingTasks';
import axiosPublic from '../hooks/useAxiosPublic';
import useCurrentUser from './useCurrentUser';

const PendingJobs = () => {
  const [jobs, refetch2] = usePendingTasks();
  console.log('Pending jobs:', jobs);
  
  const [currentUser,refetch] = useCurrentUser();
  const handleReject = (job)=>{
    const newWorker = parseInt(job.worker);

    const updatedJob = {
      status:'rejected',
      worker:newWorker+1,
      taskId:job.taskId

    }
    axiosPublic.patch(`/ordered/${job._id}`, updatedJob)
    .then(res=>{
      console.log(res.data);
    })
  }
  
  const handleAccept = (job)=>{
   
    const updatedJob = {
      status:'accepted',

    }
    axiosPublic.patch(`/orderAccept/${job._id}`, updatedJob)
    .then(res=>{
      refetch2();
      console.log(res.data);
      axiosPublic.patch(`/worker/${currentUser.email}`, job)
      .then(res=>{
        console.log(res.data);
        // axiosPublic.delete(`/task/${job._id}`)
        // .then(res=>{
        //   console.log(res.data);
        // })
        refetch()
      })
      .catch(err=>console.log(err.message))
    })
  }
  return (
    <div className="overflow-x-auto">
      {/* Open the modal using document.getElementById('ID').showModal() method */}


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
            <th>Title</th>
            <th>Worker</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {
            jobs?.map((job, indx) => <tr key={job._id}>
              <th>
                <label>
                  {indx + 1}
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={job.photo}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>

                </div>
              </td>
              <td>
                {
                  job.title
                }
              </td>
              <td>
                {
                  job.workerName
                }
              </td>
              <td onClick={()=>handleAccept(job)} className='btn bg-slate-400'>Accept</td>
              <td onClick={()=>handleReject(job)} className='btn bg-slate-400'>Reject</td>
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg"></h3>
                  <p className="py-4">{job.
                    submission_details}</p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>

              <td onClick={() => document.getElementById('my_modal_5').showModal()} className='btn bg-slate-400'>View details</td>

            </tr>)
          }

        </tbody>

      </table>
    </div>
  );
};

export default PendingJobs;