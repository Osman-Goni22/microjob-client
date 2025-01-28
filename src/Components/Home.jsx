
import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Workers from './Workers';
import Reviews from './Reviews';
import Tasks from './Tasks';

const Home = () => {

  return (
    <div>
      <div className='my-10'>
        <Carousel>
          <div className='h-[400px]' >
            <img src="https://i.ibb.co.com/zn4DqdX/Cover-6.png" />

          </div>
          <div className='h-[400px]'>
            <img src="https://i.ibb.co.com/frF63sf/long-shot-people-walking-desert.jpg" />

          </div>
          <div className='h-[400px]'>
            <img src="https://i.ibb.co.com/YhFbdSW/Cover-17.png" />

          </div>
        </Carousel>
      </div>
      <div>
        <Workers></Workers>
      </div>

      <div className='my-10'>
        <h2 className='text-3xl font-bold text-center'>FAQ Section</h2>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">  How Can I apply the jobs?</div>
          <div className="collapse-content">
            <p>Register as worker and Go your dashboard and apply from task List.</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">How can I withdraw the payments?</div>
          <div className="collapse-content">
            <p>Go your Dashboard withdrawals and make a request to Admin to withdraw the money</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">How can I post a job?</div>
          <div className="collapse-content">
            <p>Register as a Buyer and go your dashboard to add a Task</p>
          </div>
        </div>
      </div>

      <div>
        <h2>Available Task</h2>
        <Tasks></Tasks>
      </div>
      <div>
        <Reviews></Reviews>
      </div>
      <div>
        <label className="flex cursor-pointer gap-2">
          <span className="label-text">Current</span>
          <input type="checkbox" value="synthwave" className="toggle theme-controller" />
          <span className="label-text">Synthwave</span>
        </label>
      </div>
    </div>
  );
};

export default Home;