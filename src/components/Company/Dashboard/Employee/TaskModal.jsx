import React from 'react'
import {
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import workproofSampleImage from '../../../../assets/images/default.png'

const TaskModal = ({ openTask, handleOpenTask, task, formatTimestamp }) => {

    return (
        <Dialog open={openTask} handler={handleOpenTask} className='rounded-3xl p-4'>
            <DialogHeader>
                <p className='inter capitalize text-lg sm:text-lg md:text-2xl lg:text-2xl'>Daily Work Proof</p>
            </DialogHeader>
            <DialogBody>

                <div className='flex flex-grow items-center justify-between my-2'>
                    <p className='capitalize plusJakartaSans font-semibold text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md'>Date:</p>
                    <p className='plusJakartaSans font-semibold text-black text-sm sm:text-base md:text-md lg:text-lg ml-2 sm:ml-2 md:ml-10 lg:ml-10'>{formatTimestamp(task?.date)}</p>
                </div>
                <div className='flex flex-grow items-center justify-between my-2'>
                    <p className='capitalize plusJakartaSans font-semibold text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md'>Name:</p>
                    <p className='plusJakartaSans font-semibold text-black text-sm sm:text-base md:text-md lg:text-lg text-justify ml-2 sm:ml-2 md:ml-10 lg:ml-10'>{task?.task_name}</p>
                </div>

                {task?.workproof && (
                    <>
                        <div className='flex flex-grow items-center justify-between my-2'>
                            <div>
                                <p className='capitalize plusJakartaSans font-semibold text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md'>Before:</p>
                                <div className='my-2'>
                                    <img src={task?.workproof.before ? task?.workproof.before : workproofSampleImage} alt="before" className='text-sm object-contain rounded-xl sm:w-52 md:w-52 lg:w-52 sm:h-52 md:h-52 lg:h-52 border' />
                                </div>
                            </div>
                            <div>
                                <p className='capitalize plusJakartaSans font-semibold text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md'>After:</p>
                                <div className='my-2'>
                                    <img src={task?.workproof.after ? task?.workproof.after : workproofSampleImage} alt="after" className='text-sm object-contain rounded-xl sm:w-52 md:w-52 lg:w-52 sm:h-52 md:h-52 lg:h-52 border' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-grow items-center justify-between my-2'>
                            <p className='capitalize plusJakartaSans font-semibold text-black opacity-60 text-sm sm:text-base md:text-md lg:text-md'>Workproof Description:</p>
                            <p className='plusJakartaSans font-semibold text-black text-sm sm:text-base md:text-md lg:text-lg text-justify ml-2 sm:ml-2 md:ml-10 lg:ml-10'>{task?.workproof.description}</p>
                        </div>
                    </>
                )}
            </DialogBody>
        </Dialog>
    )
}

export default TaskModal