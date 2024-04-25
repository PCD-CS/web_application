import React, { useEffect, useState } from 'react'
import { getUserRegisters, sendRegisterStatus } from '../../../network/agent'
import { DownloadIcon } from '../../UI/Icons'
import CreateAccountModal from './CreateAccountModal'

const NewSignup = () => {

  const [registers, setRegisters] = useState([])
  const [open, setOpen] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpenAccountModal = () => setOpenAccountModal(!openAccountModal);

  useEffect(() => {

    getUserRegisters().then((response) => {
      // console.log(response.data)
      if (response.error === false) {
        setRegisters(response.data)
      }
    }).catch((error) => {
      console.log(error)
    })

  }, [])

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const data = {
        id: _id,
        status: newStatus,
      };

      const response = await sendRegisterStatus(data);
      console.log(response);

      // Filter out the card with the updated status.
      const updatedRegisters = registers.filter((item) => item._id !== _id);
      setRegisters(updatedRegisters);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadResume = (fileUrl) => {
    if (fileUrl) {
      const downloadLink = document.createElement('a');
      downloadLink.href = fileUrl;
      downloadLink.download;
      downloadLink.click();
    }
  };

  return (
    <div>
      <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>New Signup</h1>

      {registers.length === 0 && (
        <div className='text-red-500 text-center font-semibold mb-4 capitalize poppins'>No new account registered!</div>
      )}

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-36 place-items-center mx-auto my-5'>
        {
          registers.map((item, index) => {
            const { _id, name, contact_no, email_id, resume, status } = item
            return (
              <div
                key={_id}
                className='border border-[#2F80EF] rounded-[2.5rem] py-6 px-6 mb-4 h-[10rem] w-[18rem] text-xs bg-white shadow-lg'
              >

                <div className='flex justify-between items-center'>
                  <p>
                    <span className='text-lg uppercase font-bold plusJakartaSans'>{name}</span>
                  </p>
                </div>
                <div className='leading-relaxed py-2'>
                  {/* <p className='inter'> <span className='font-bold inter'>Name: </span> {name}</p> */}
                  <p className='inter'> <span className='font-bold inter'>Contact No: </span>{contact_no}</p>
                  <p className='inter'> <span className='font-bold inter'>Email ID: </span> {email_id}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <button
                    type='button'
                    className='flex justify-center items-center gap-1 rounded-lg bg-gray-300 text-xs font-medium py-1 px-2'
                    onClick={() => handleDownloadResume(resume)}
                  >
                    <div className='w-4 h-4'>
                      <DownloadIcon />
                    </div>
                    Resume
                  </button>
                  <button
                    type='button'
                    className='rounded-lg bg-green-500 text-xs text-white font-medium py-1 px-2'
                    // onClick={handleOpenAccountModal}
                    // onClick={() => handleStatusChange(_id, 0)}
                  >
                    Done
                  </button>
                  <button
                    type='button'
                    className='rounded-lg bg-red-400 text-xs text-white font-medium py-1 px-2 '
                    onClick={() => handleStatusChange(_id, 1)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
      <CreateAccountModal openAccountModal={openAccountModal} handleOpenAccountModal={handleOpenAccountModal} handleStatusChange={handleStatusChange} registers={registers} />

    </div>
  )
}

export default NewSignup