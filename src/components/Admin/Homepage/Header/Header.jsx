import React, { useState, useRef, useEffect } from 'react'
import default_image from '../../../../assets/images/default_image.svg'
import { ArrowDropdownIcon, Menu } from '../../../UI/Icons'
import NotificationIcon from '../../../../assets/icons/sidebar/NotificationIcon.jsx';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/Context';
import Notification from './Notification';
import AccountModal from './AccountModal';
import Person from '../../../../assets/icons/Person';
import Logout from '../../../../assets/icons/Logout';
import { getNotifications, markReadNotifications } from '../../../../network/agent'

const Header = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [newNotifications, setNewNotifications] = useState([]);
  const [oldNotifications, setOldNotifications] = useState([]);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const { logoutUser, userCred } = useGlobalContext();
  const [openAccount, setOpenAccount] = useState(false);


  let name = userCred?.user?.name ? userCred?.user?.name : 'Guest';
  let profilePic = userCred?.user?.profile_pic ? userCred?.user?.profile_pic : default_image;

  const navigate = useNavigate();

  const userLogoutHandler = () => {
    logoutUser();
    navigate('/auth/login');
  }

  const handleOpenAccount = () => {
    setOpenAccount(!openAccount)
  };

  useEffect(() => {

    const handleOutsideClick = (event) => {
      if (
        (profileRef.current && !profileRef.current.contains(event.target)) ||
        (notificationRef.current && !notificationRef.current.contains(event.target))
      ) {
        // setIsNotificationOpen(false);
        // setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };

  }, []);

  const handleReadNotification = (id, isRead) => {
    markReadNotifications(id)
      .then((response) => {
        if (response.error === false) {
          if (isRead === false) {
            // console.log(response.message)
            setNewNotificationCount((prevCount) => prevCount - 1);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNotifications().then((response) => {
      if (response.error === false) {
        setNewNotificationCount(response.data.newNotification.length);
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotificationDropdown = () => {
    setIsNotificationOpen(false);
  };

  return (
    <header className='fixed w-full top-0 z-10 bg-white shadow-md'>
      <div className='grid grid-cols-12 px-4 py-2'>

        {/* Mobile Menu (Shown in mobile screen sizes) */}
        <div
          className='md:hidden col-span-2 cursor-pointer self-center'
          onClick={toggleProfileDropdown}
        >
          <button>
            <Menu />
          </button>

          {isProfileOpen && (
            <div ref={profileRef} className='absolute left-4 mt-8 bg-white drop-shadow-md rounded-xl w-32'>
              <div className='px-4 py-2 space-y-2'>

                <div
                  className='flex items-center space-x-1 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                  onClick={(handleOpenAccount)}
                >
                  <div className='w-4'>
                    <Person />
                  </div>
                  <p className='text-sm'>
                    Account
                  </p>
                </div>

                <div
                  className='flex items-center space-x-1 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                  onClick={userLogoutHandler}
                >
                  <div className='w-4'>
                    <Logout />
                  </div>
                  <p className='text-sm'>
                    Logout
                  </p>
                </div>

              </div>
            </div>
          )}

          {
            openAccount &&
            <AccountModal open={openAccount} handleOpen={handleOpenAccount} />
          }
        </div>

        {/* Logo and Name */}
        <div
          className='flex items-center col-span-8 md:col-span-2 justify-center md:justify-around cursor-pointer'
        >
          <div>
            <img
              src={profilePic}
              alt='logo'
              className='text-xs border rounded-full w-11 h-11 object-cover'
            />
          </div>
          <p className='font-semibold px-1 text-center md:text-left uppercase inter'>{name}</p>
        </div>

        {/* Profile Dropdown (Hidden in mobile screen sizes) */}
        <div
          className='hidden md:flex items-center justify-center md:col-span-1 cursor-pointer'
          onClick={toggleProfileDropdown}
        >
          <div className='relative'>

            <button>
              <ArrowDropdownIcon />
            </button>

            {isProfileOpen && (
              <div ref={profileRef} className='absolute right-0 mt-8 bg-white drop-shadow-md rounded-xl w-40'>
                <div className='px-4 py-2 space-y-2'>

                  <div
                    className='flex items-center space-x-2 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                    onClick={handleOpenAccount}
                  >
                    <div className='w-5'>
                      <Person />
                    </div>
                    <p>
                      Account
                    </p>
                  </div>

                  <div
                    className='flex items-center space-x-2 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-lg hover:shadow-md cursor-pointer hover:text-[#2F80ED] hover:font-medium'
                    onClick={userLogoutHandler}
                  >
                    <div className='w-5'>
                      <Logout />
                    </div>
                    <p>
                      Logout
                    </p>
                  </div>

                </div>
              </div>
            )}

            {
              !openAccount &&
              <AccountModal open={openAccount} handleOpen={handleOpenAccount} />
            }

          </div>
        </div>

        {/* Notification Icon (Hidden in mobile screen sizes) */}
        <div className='hidden md:flex items-center justify-end md:col-span-9 cursor-pointer mr-5'>
          <div className='relative'>
            <button onClick={toggleNotificationDropdown}>
              <NotificationIcon selected={isNotificationOpen} />
              {newNotificationCount > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-4 dark:border-gray-900">
                  {newNotificationCount}
                </div>
              )}
            </button>
            {isNotificationOpen && (
              <div ref={notificationRef} className='absolute right-0 mt-8 bg-white drop-shadow-md rounded-xl w-96'>
                <Notification handleReadNotification={handleReadNotification} setNewNotifications={setNewNotifications} newNotifications={newNotifications} oldNotifications={oldNotifications} setOldNotifications={setOldNotifications} />
              </div>
            )}
          </div>
        </div>

        {/*  Notification Icon  (Shown in mobile screen sizes)  */}
        <div className='md:hidden col-span-2 cursor-pointer text-end self-center'>
          <div className='relative'>
            <button onClick={toggleNotificationDropdown}>
              <NotificationIcon selected={isNotificationOpen} />

              {newNotificationCount > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-4 dark:border-gray-900">
                  {newNotificationCount}
                </div>
              )}

            </button>
          </div>
          {isNotificationOpen && (
            <div ref={notificationRef} className='absolute right-4 mt-8 bg-white drop-shadow-md rounded-xl w-5/6'>
              <Notification handleReadNotification={handleReadNotification} setNewNotifications={setNewNotifications} newNotifications={newNotifications} oldNotifications={oldNotifications} setOldNotifications={setOldNotifications} />
            </div>
          )}
        </div>


      </div>
    </header>

  )
}

export default Header;