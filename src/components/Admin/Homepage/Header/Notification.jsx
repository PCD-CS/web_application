import React, { useEffect } from 'react'
import { getNotifications } from '../../../../network/agent'

const Notification = ({ handleReadNotification, setNewNotifications, newNotifications, oldNotifications, setOldNotifications }) => {

    useEffect(() => {
        getNotifications().then((response) => {
            if (response.error === false) {
                setNewNotifications(response.data.newNotification);
                setOldNotifications(response.data.oldNotifications);
                // console.log(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        date.setMinutes(date.getMinutes() - 5.5 * 60);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = date.getHours() >= 12 ? 'PM' : 'AM';

        return `${hours}:${minutes} ${period} - ${day}/${month}/${year}`;

    };

    return (
        <div className='p-2 md:p-4 lg:p-4 space-y-4 relative z-50 overflow-y-auto max-h-96'>

            {newNotifications.length === 0 && oldNotifications.length === 0 && (
                <div className='flex justify-center my-2 md:my-4 lg:my-4'>
                    <p className='text-red-500 text-sm md:text-base font-medium md:font-semibold lg:font-semibold capitalize poppins'>
                        No New Notifications!
                    </p>
                </div>
            )}

            {newNotifications.map((item, index) => {
                const { content, timestamp, type, ItemId, user, isRead, _id } = item;


                return (
                    <div
                        key={_id}
                        className='relative bg-blue-300/10 px-3 py-3 rounded-lg hover:shadow-md hover:ring-1 hover:ring-[#2F80ED]-500/50 cursor-pointer'
                        onClick={() => handleReadNotification(_id, isRead)}
                    >
                        <p className='text-justify text-sm md:text-sm mb-1 lg:text-sm text-[#2F80ED] inter'>{content}</p>
                        <p className='absolute -top-2 -right-2 ring-2 ring-white inline-block whitespace-nowrap rounded-full px-2 pb-1 pt-1 text-center align-baseline text-xs font-semibold leading-none bg-blue-50 text-blue-500 plusJakartaSans'>{type}</p>
                        <p className='text-xs text-end text-[#2F80ED] opacity-60 poppins'>{formatTimestamp(timestamp)}</p>
                    </div>
                );

            })}

            {oldNotifications.map((item, index) => {
                const { content, timestamp, type, ItemId, user, isRead, _id } = item;

                return (
                    <div
                        key={_id}
                        className='relative bg-gray-100 px-3 py-3 rounded-lg hover:ring-1 hover:ring-gray-500/50'
                        onClick={() => handleReadNotification(_id)}
                    >
                        <p className='text-justify text-sm md:text-sm mb-1 lg:text-sm inter'>{content}</p>
                        <p className='absolute -top-2 -right-2 ring-2 ring-white inline-block whitespace-nowrap rounded-full px-2 pb-1 pt-1 text-center align-baseline text-xs font-semibold leading-none bg-gray-200 plusJakartaSans'>{type}</p>
                        <p className='text-xs text-end opacity-60 poppins'>{formatTimestamp(timestamp)}</p>
                    </div>
                );

            })}

        </div>
    )
}

export default Notification