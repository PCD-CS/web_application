import React, { useState } from 'react';

import DashboardIcon from '../../../assets/icons/sidebar/DashboardIcon.jsx';
import AssignmentIcon from '../../../assets/icons/sidebar/AssignmentIcon.jsx';
import CalendarIcon from '../../../assets/icons/sidebar/CalendarIcon.jsx';
import EaselIcon from '../../../assets/icons/sidebar/EaselIcon.jsx';
import HourglassIcon from '../../../assets/icons/sidebar/HourglassIcon.jsx';
import PeopleIcon from '../../../assets/icons/sidebar/PeopleIcon.jsx';
import BusinessIcon from '../../../assets/icons/sidebar/BusinessIcon.jsx';
import HelpIcon from '../../../assets/icons/sidebar/HelpIcon.jsx';

const Sidebar = ({ setSelectedPage }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleItemClick = (page, index, icon) => {
    setSelectedPage(page);
    setSelectedItem(index);
    setSelectedIcon(icon);
  };

  const createIcon = (text, selected) => {
    switch (text) {
      case 'New Employee':
        return <DashboardIcon selected={selected} />;
      case 'New Company':
        return <PeopleIcon selected={selected} />;
      case 'Company List':
        return <AssignmentIcon selected={selected} />;
      case 'Employee Details':
        return <CalendarIcon selected={selected} />;
      case 'New Signup':
        return <EaselIcon selected={selected} />;
      case 'Password Requests':
        return <HourglassIcon selected={selected} />;
      case 'Communication':
        return <BusinessIcon selected={selected} />;
      case 'Help':
        return <HelpIcon selected={selected} />;
      default:
        return null;
    }
  };

  const items = [
    {
      text: 'New Employee',
    },
    {
      text: 'New Company',
    },
    {
      text: 'Company List',
    },
    {
      text: 'Employee Details',
    },
    // {
    //   text: 'New Signup',
    // },
    // {
    //   text: 'Password Requests',
    // },
    // {
    //   text: 'Communication',
    // },
    // {
    //   text: 'Help',
    // },
  ];

  return (
    <div className='fixed w-56 bg-white shadow-xl rounded-2xl shadow-blue-gray-900/5'>
      <ul className='bg-white rounded-xl px-4 py-4'>
        {items.map((item, index) => {
          const { text } = item;
          const isSelected = index === selectedItem;

          return (
            <div className='py-1' key={index}>
              <li
                key={index}
                onClick={() => handleItemClick(text.replace(' ', ''), index)}
                className={`flex items-center uppercase py-2 px-2 font-semibold text-sm rounded-md cursor-pointer ${isSelected ? 'bg-blue-50 text-[#2F80ED]' : ''} hover:bg-gray-100 focus:shadow-md`}
              >
                <span className={`w-5 h-5 mr-4 font-semibold text-sm`}>
                  {createIcon(text, isSelected)}
                </span>
                {text}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
