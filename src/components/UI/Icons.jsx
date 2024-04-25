import React from 'react';

// Import your SVG files
import search from '../../assets/icons/search.svg';
import menu from '../../assets/icons/menu.svg';

import upload from '../../assets/icons/upload.svg';
import download from '../../assets/icons/download.svg';
import double_arrow_down from '../../assets/icons/double_arrow_down.svg';
import arrow_down from '../../assets/icons/arrow_down.svg';
import add from '../../assets/icons/add.svg';
import cross from '../../assets/icons/cross.svg';
import arrow_drop_down from '../../assets/icons/arrow_drop_down.svg';
import date from '../../assets/icons/date.svg';
import double_overlapping_right_arrow from '../../assets/icons/double_overlapping_right_arrow.svg';
import arrow_direction_right from '../../assets/icons/arrow_direction_right.svg';
import copy from '../../assets/icons/copy.svg';
import copy_done from '../../assets/icons/copy_done.svg';
import search_2 from '../../assets/icons/search_2.svg';
import spin from '../../assets/icons/spin.svg';
import plusSign from '../../assets/icons/plusSign.svg';
import subtractSign from '../../assets/icons/subtractSign.svg';
import divideSign from '../../assets/icons/divideSign.svg';
import multiplySign from '../../assets/icons/multiplySign.svg';
import percentageSign from '../../assets/icons/percentageSign.svg';

import filter from '../../assets/icons/filter.svg';
import camera from '../../assets/icons/camera.svg';
import downloadCompany from '../../assets/icons/downloadCompany.svg';
import arrow_up_down from '../../assets/icons/arrow_up_down.svg';
import next from '../../assets/icons/next.svg';
import previous from '../../assets/icons/previous.svg';
import send from '../../assets/icons/send.svg';
import downloadPayslip from '../../assets/icons/downloadPayslip.svg';
import single_arrow_up from '../../assets/icons/single_arrow_up.svg';
import single_arrow_down from '../../assets/icons/single_arrow_down.svg';

import deleteIcon from '../../assets/icons/delete.svg'
import create from '../../assets/icons/create.svg'
import edit from '../../assets/icons/edit.svg'
import save from '../../assets/icons/save.svg'

// Convert the SVGs to React components using @svgr/webpack
const DashboardIcon = () => <img src={dashboard} alt="Dashboard Icon" />;
const DashboardBlueIcon = () => <img src={dashboard_blue} alt="Dashboard Blue Icon" />;

const AssignmentIcon = () => <img src={assignment} alt="Assignment Icon" />;
const AssignmentBlueIcon = () => <img src={assignment_blue} alt="Assignment Blue Icon" />;

const CalendarIcon = () => <img src={calendar} alt="Calendar Icon" />;
const CalendarBlueIcon = () => <img src={calendar_blue} alt="Calendar Blue Icon" />;

const ChatbubblesIcon = () => <img src={chatbubbles} alt="Chatbubbles Icon" />;
const ChatbubblesBlueIcon = () => <img src={chatbubbles_blue} alt="Chatbubbles Blue Icon" />;

const EaselIcon = () => <img src={easel} alt="Easel Icon" />;
const EaselBlueIcon = () => <img src={easel_blue} alt="Easel Blue Icon" />;

const HourglassIcon = () => <img src={hourglass} alt="Hourglass Icon" />;
const HourglassBlueIcon = () => <img src={hourglass_blue} alt="Hourglass Blue Icon" />;

const PeopleIcon = () => <img src={people} alt="People Icon" />;
const PeopleBlueIcon = () => <img src={people_blue} alt="People Blue Icon" />;

const BusinessIcon = () => <img src={business} alt="Business Icon" />;
const BusinessBlueIcon = () => <img src={business_blue} alt="Business Blue Icon" />;

const HelpIcon = () => <img src={help} alt="Help Icon" />;
const HelpBlueIcon = () => <img src={help_blue} alt="Help Blue Icon" />;

const UploadIcon = () => <img src={upload} alt="Upload Icon" />;
const DownloadIcon = () => <img src={download} alt="Download Icon" />;
const DoubleArrowDropdownIcon = () => <img src={double_arrow_down} alt="Arrow Down Icon" />;
const ArrowDownIcon = () => <img src={arrow_down} alt="Arrow Down Icon" />;
const AddIcon = () => <img src={add} alt="Add Icon" />;
const CrossIcon = () => <img src={cross} alt="Cross Icon" />;
const NotificationIcon = () => <img src={notification} alt="Notification Icon" />;
const NotificationBlueIcon = () => <img src={notification_blue} alt="Notification Blue Icon" />;
const SearchIcon = () => <img src={search} alt="Search Icon" />;
const SearchIcon2 = () => <img src={search_2} alt="Search Icon 2" />;
const ArrowDropdownIcon = () => <img src={arrow_drop_down} alt="ArrowDropdown Icon" />;
const DateIcon = () => <img src={date} alt="Date Icon" />;
const DoubleOverlappingRightArrow = () => <img src={double_overlapping_right_arrow} alt="Double Overlapping Right Arrow" />;
const ArrowDirectionRight = () => <img src={arrow_direction_right} alt="Arrow Direction Right" />;
const Copy = () => <img src={copy} alt="Copy" />;
const CopyDone = () => <img src={copy_done} alt="Copy Done" />;
const Filter = () => <img src={filter} alt="Filter" />;
const Spin = () => <img src={spin} alt="Spin" />;
const Camera = () => <img src={camera} alt="Camera" />;
const Previous = () => <img src={previous} alt="Previous" />;
const Next = () => <img src={next} alt="Next" />;

const Create = () => <img src={create} alt="Create" />;
const Edit = () => <img src={edit} alt="Edit" />;
const Delete = () => <img src={deleteIcon} alt="Delete" />;
const Save = () => <img src={save} alt="Save" />;

const PlusSign = () => <img src={plusSign} alt="Plus" />;
const SubtractSign = () => <img src={subtractSign} alt="Subtract" />;
const MultiplySign = () => <img src={multiplySign} alt="Multiply" />;
const DivideSign = () => <img src={divideSign} alt="Divide" />;
const PercentageSign = () => <img src={percentageSign} alt="Percentage" />;
const Menu = () => <img src={menu} alt="Menu" />;
const Download = () => <img src={downloadCompany} alt="Download" />;
const ArrowUpDown = () => <img src={arrow_up_down} alt="ArrowUpDown" />;
const DownloadPayslipIcon = () => <img src={downloadPayslip} alt="Download Payslip Icon" />;
const SendPayslipIcon = () => <img src={send} alt="Send Payslip" />;
const SingleArrowUp = () => <img src={single_arrow_up} alt="Single Arrow Up" />;
const SingleArrowDown = () => <img src={single_arrow_down} alt="Single Arrow Down" />;


export {
    DashboardIcon,
    DashboardBlueIcon,
    AssignmentIcon,
    AssignmentBlueIcon,
    CalendarIcon,
    CalendarBlueIcon,
    ChatbubblesIcon,
    ChatbubblesBlueIcon,
    EaselIcon,
    EaselBlueIcon,
    HourglassIcon,
    HourglassBlueIcon,
    PeopleIcon,
    PeopleBlueIcon,
    BusinessIcon,
    BusinessBlueIcon,
    HelpIcon,
    HelpBlueIcon,
    UploadIcon,
    DownloadIcon,
    DoubleArrowDropdownIcon,
    ArrowDownIcon,
    AddIcon,
    CrossIcon,
    NotificationIcon,
    NotificationBlueIcon,
    SearchIcon,
    SearchIcon2,
    ArrowDropdownIcon,
    DateIcon,
    DoubleOverlappingRightArrow,
    ArrowDirectionRight,
    Copy,
    CopyDone,
    Filter,
    Spin,
    Menu,
    PlusSign,
    SubtractSign,
    MultiplySign,
    DivideSign,
    PercentageSign,
    Camera,
    Download,
    ArrowUpDown,
    Next,
    Previous,
    DownloadPayslipIcon,
    SendPayslipIcon,
    SingleArrowUp,
    SingleArrowDown,
    Create,
    Edit,
    Delete,
    Save,
};
