import React, { useEffect, useState } from 'react'
import { getCompanyList, payrollDownloadCompanyDetails } from '../../../../network/agent'
import { Download } from '../../../UI/Icons'
import DropEmployeeDetails from './DropEmployeeDetails/DropEmployeeDetails'
import DropPaymentConfig from './DropPaymentConfig/DropPaymentConfig'
import Search from './Search'
import CompanyCard from './CompanyCard'
import { useGlobalContext } from '../../../../context/Context'

const CompanyList = () => {

  const { setCompanyId } = useGlobalContext()

  const [error, setError] = useState('')
  const [message, setMessage] = useState(false)

  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [companyUserId, setCompanyUserId] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [isCompanyDetailsDownloading, setIsCompanyDetailsDownloading] = useState(false);
  const [companyUrl, setCompanyUrl] = useState('')

  useEffect(() => {
    getCompanyList()
      .then((response) => {
        if (response.error === false) {
          // console.log(response.data)
          setCompanies(response.data);
          setFilteredCompanies(response.data);
        } else {
          setError('Unable to fetch companies!')
        }
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCompanyCardClick = (companyId, companyUserId, companyName) => {
    setSelectedCompanyId(companyId);
    setCompanyId(companyId)
    setCompanyUserId(companyUserId)
    setCompanyName(companyName)
    localStorage.setItem('companyId', companyId)
  }

  // Function to handle Download Company Details
  const handleDownloadCompanyDetails = () => {
    setIsCompanyDetailsDownloading(true);
    payrollDownloadCompanyDetails().then((response) => {
      if (response.error === false) {
        // console.log(response.data)
        // window.open(response.data);
        setCompanyUrl(response.data)
      }
    }).catch((error) => {
      setError('Unable to download file!')
      setTimeout(() => {
        setError('');
      }, 2000);
      console.log(error);
    }).finally(() => {
      setIsCompanyDetailsDownloading(false);
    });
  };

  useEffect(() => {
    if (companyUrl) {
      const downloadLink = document.createElement('a');
      downloadLink.href = companyUrl;
      downloadLink.download;
      downloadLink.click();

      setCompanyUrl('');
    }
  }, [companyUrl]);

  return (
    <div>
      <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>COMPANY LIST'S</h1>

      {/* Search input */}
      <Search setFilteredCompanies={setFilteredCompanies} companies={companies} />

      <div className='flex justify-between items-center my-2'>

        {/* Download Company details */}
        <div>
          <button
            className='flex items-center justify-between w-24 px-3 py-1 rounded-xl text-[0.6rem] font-semibold plusJakartaSans bg-[#D9D9D9]'
            onClick={handleDownloadCompanyDetails}
          >
            Download
            <div className={`${isCompanyDetailsDownloading ? 'animate-bounce' : ''}`}>
              <Download />
            </div>
          </button>
        </div>



        {/* Error */}
        {error && (
          <div>
            <p className='text-red-500 font-semibold capitalize poppins mx-4'>{error}</p>
          </div>
        )}

        {/* Warning */}
        {filteredCompanies.length === 0 && (
          <div>
            <p className='text-red-500 font-semibold capitalize poppins mx-4'>No Companies available!</p>
          </div>
        )}

        {/* Company User ID */}
        {companyUserId && companyName && (
          <div className='flex items-center bg-white shadow-md rounded-lg py-1'>
            <p className='text-blue-600 font-semibold capitalize plusJakartaSans mx-4'>{companyUserId}</p>/
            <p className='text-gray-500 font-medium capitalize plusJakartaSans mx-4'>{companyName}</p>
          </div>
        )
        }

      </div>




      <div className='grid grid-cols-12  gap-10'>

        <div className='col-span-4 w-full'>

          {/* Company Card */}
          <CompanyCard filteredCompanies={filteredCompanies} handleCompanyCardClick={handleCompanyCardClick} />

        </div>


        {
          selectedCompanyId &&
          <>
            <div className='col-span-4 w-full '>
              {/* Employee Details */}
              <DropEmployeeDetails
                setError={setError}
              />
            </div>

            <div className='col-span-4 w-full'>
              {/* Payment Configuration */}
              <DropPaymentConfig
                message={message}
                setMessage={setMessage}
                setError={setError}
              />
            </div>
          </>
        }
      </div>



    </div>
  )
}

export default CompanyList