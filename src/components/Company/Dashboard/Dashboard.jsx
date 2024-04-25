import React from 'react'
import AttendanceChart from './AttendanceChart'
import Emp from './Employee/Emp'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-12 gap-4 px-5 py-5'>
      <div className='sm:col-span-2 mt-16 md:mt-16 lg:mt-16'>
        <AttendanceChart />
      </div>

      <div className='sm:col-span-10 md:mt-16 lg:mt-16'>
        <Emp />
      </div>
    </div>
  )
}

export default Dashboard