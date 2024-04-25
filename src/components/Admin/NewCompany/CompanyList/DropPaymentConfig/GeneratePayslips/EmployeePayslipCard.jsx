import React, { useState } from 'react'
import { DownloadPayslipIcon, SendPayslipIcon } from '../../../../../UI/Icons';
import { payrollDownloadPayslip, payrollSendPayslip } from '../../../../../../network/agent';
import { Checkbox } from "@material-tailwind/react";
import { useGlobalContext } from '../../../../../../context/Context'

const EmployeePayslipCard = ({ masterSheetData }) => {

    const companyId = localStorage.getItem('companyId')

    const [selectedCards, setSelectedCards] = useState(Array(masterSheetData.length).fill(false));
    const [selectedCardData, setSelectedCardData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [payslipUrl, setPayslipUrl] = useState('');
    const [sendingPayslip, setSendingPayslip] = useState(false);
    const [sendPayslipMessage, setSendPayslipMessage] = useState(false);
    const [downloadingPayslip, setDownloadingPayslip] = useState(false);

    // Function to remove spaces from object keys
    const removeSpacesFromKeys = (obj) => {
        const newObj = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const newKey = key.replace(/\s/g, ''); // Remove spaces from the key
                newObj[newKey] = obj[key];
            }
        }
        return newObj;
    };

    const updatedMasterSheetData = masterSheetData.map((item) => removeSpacesFromKeys(item));

    // Function to handle individual card selection
    const handleCardSelection = (index) => {
        const updatedSelectedCards = [...selectedCards];
        updatedSelectedCards[index] = !updatedSelectedCards[index];
        setSelectedCards(updatedSelectedCards);

        // Update selected card data
        const selectedData = [];
        updatedSelectedCards.forEach((isSelected, idx) => {
            if (isSelected) {
                selectedData.push(masterSheetData[idx]);
            }
        });

        setSelectedCardData(selectedData);
    };

    // Function to select/deselect all cards
    const handleSelectAll = () => {
        if (selectAll) {
            // Deselect all
            setSelectedCards(Array(masterSheetData.length).fill(false));
            setSelectedCardData([]);
        } else {
            // Select all
            setSelectedCards(Array(masterSheetData.length).fill(true));
            setSelectedCardData([...masterSheetData]);
        }

        setSelectAll(!selectAll);
    };


    // Function to send selected card data
    const handleSendSelected = (index) => {
        const updatedSelectedCards = [...selectedCards];
        updatedSelectedCards[index] = true;
        setSelectedCards(updatedSelectedCards);

        const dataToSend = {
            id: companyId,
            payslips: [masterSheetData[index]],
        };

        console.log(dataToSend)

        payrollSendPayslip(dataToSend).then((response) => {
            if (response.error === false) {
                // console.log(response.data)
                setSendPayslipMessage(true)

                setTimeout(() => {
                    setSendPayslipMessage(false)
                }, [2000])
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    // Function to download selected card data
    const handleDownloadSelected = (index) => {
        const updatedSelectedCards = [...selectedCards];
        updatedSelectedCards[index] = true;
        setSelectedCards(updatedSelectedCards);


        const dataToSend = {
            id: companyId,
            payslips: [masterSheetData[index]],
        };

        setDownloadingPayslip(true)

        payrollDownloadPayslip(dataToSend).then((response) => {
            if (response.error === false) {
                // console.log(response.data)

                const payslipDownloadUrl = response.data[0].payslip;
                setPayslipUrl(payslipDownloadUrl);

                // function to Download the payslip
                downloadPayslip(payslipDownloadUrl);
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setDownloadingPayslip(false)
        })

    };

    // Function to download payslip
    const downloadPayslip = (url) => {
        if (url) {
            const documentLink = document.createElement('a');
            documentLink.href = url;
            documentLink.download;
            documentLink.click();

            setPayslipUrl('')
        }
    };

    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const day = String(todayDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div className='shadow-lg p-4 mt-8 mb-5 rounded-xl border'>
            <p className='text-xl text-center font-medium uppercase'>Payslips</p>
            <div className='flex justify-between mx-5'>
                {updatedMasterSheetData.length > 0 && (
                    <button
                        className="text-sm plusJakartaSans px-2 py-1 rounded-lg font-medium text-white bg-blue-500 flex items-center gap-1"
                        onClick={handleSelectAll}
                    >
                        {selectAll ? 'Deselect All' : 'Select All'}
                    </button>
                )}

                {sendPayslipMessage && (
                    <p className='text-center font-medium text-xs italic text-green-500'>
                        Payslip Sent Successfully!
                    </p>
                )}

                {selectedCardData.length > 0 && (
                    <button
                        className='text-sm plusJakartaSans font-medium text-blue-500 flex items-center gap-1'
                        onClick={handleSendSelected}
                    >
                        Send <SendPayslipIcon />
                    </button>
                )}
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {updatedMasterSheetData.map((item, index) => {
                    const { SN, EmployeeId, EmployeeName, NetPay } = item;

                    return (
                        <div
                            key={EmployeeId}
                            className='border bg-white shadow-lg py-4 px-5 rounded-2xl my-4'
                        >
                            <div className="flex items-center justify-between">
                                <p className='font-bold text-lg uppercase plusJakartaSans'>{EmployeeName}</p>
                                <Checkbox
                                    onChange={() => handleCardSelection(index)}
                                    checked={selectedCards[index]}
                                    ripple={true}
                                    color="blue"
                                    className="h-4 w-4 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                />
                            </div>
                            <div>
                                <span className='plusJakartaSans text-sm'>Generated Date:</span>
                                <span className='plusJakartaSans text-sm'>{formattedDate}</span>
                            </div>
                            <div>
                                <span className='plusJakartaSans text-sm'>For the month:</span>
                                <span className='plusJakartaSans text-sm'>{month}/{year}</span>
                            </div>
                            <div>
                                <span className='plusJakartaSans text-sm'>Net Pay:</span>
                                <span className='plusJakartaSans text-sm'>₹ {NetPay}/-</span>
                            </div>
                            <div className='flex items-center justify-around mt-2'>
                                <button
                                    className='text-sm inter text-blue-500 flex items-center gap-1 mx-1'
                                    onClick={() => handleSendSelected(index)}
                                >
                                    Send <SendPayslipIcon />
                                </button>
                                <button
                                    className={`text-sm inter text-blue-500 flex items-center gap-1 mx-1 ${downloadingPayslip ? 'cursor-wait' : 'cursor-pointer'} `}
                                    onClick={() => handleDownloadSelected(index)}
                                >
                                    Download <DownloadPayslipIcon />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default EmployeePayslipCard