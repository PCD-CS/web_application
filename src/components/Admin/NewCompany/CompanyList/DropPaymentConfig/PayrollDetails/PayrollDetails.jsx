import React, { useState } from 'react'
import { getPayroll } from '../../../../../../network/agent';
import PayrollModal from './PayrollModal'

const PayrollDetails = () => {

    const companyId = localStorage.getItem('companyId')

    const [openPayroll, setOpenPayroll] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [payrollDetails, setPayrollDetails] = useState([]);

    const handleOpen = () => setOpenPayroll(!openPayroll);

    // Function to handle get Payroll Details
    const handlePayrollDetails = () => {
        if (companyId) {
            getPayroll({ company: companyId }).then((response) => {
                if (response.error === false) {
                    setPayrollDetails(response.data);
                    setOpenPayroll(true);
                    setDataLoaded(true)
                }
            }).catch((error) => {
                setError('Unable to view payroll details!')
                setTimeout(() => {
                    setError('');
                }, 2000);
                // console.log(error);
            });
        } else {
            console.log('No Company ID Selected!');
        }
    };

    return (
        <>
            <button
                type='button'
                className='flex items-center justify-center w-full bg-white border-[3px] border-[#FFC1078A] shadow-md rounded-2xl  py-2 px-4 lg:p-3 my-6'
                onClick={() => {
                    handlePayrollDetails()
                    handleOpen()
                }}
            >
                <p className='lexend font-medium text-md'>Payroll Details</p>
            </button>

            {/* Payroll Modal */}
            {
                dataLoaded && openPayroll && (
                    <PayrollModal
                        open={openPayroll}
                        handleOpen={() => setOpenPayroll(false)}
                        payrollDetails={payrollDetails}
                    />
                )
            }
        </>
    )
}

export default PayrollDetails