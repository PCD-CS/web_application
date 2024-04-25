import React, { useEffect, useState, useRef } from 'react';
import { getCommunications, getDetailMessages, sendMessage, markMessagesRead } from '../../../network/agent';
import { useGlobalContext } from '../../../context/Context';
import default_image from '../../../assets/images/default_image.svg'

const Communication = () => {
  const { userCred } = useGlobalContext();

  let accountId; // Initialize accountId

  if (userCred.user_roles === "Admin") {
    accountId = userCred?._id; // For Admin, use userCred._id
  } else {
    accountId = userCred?.user?._id; // For employees, use userCred.user._id
  }

  const [communicates, setCommunicates] = useState([]);
  const [showUnread, setShowUnread] = useState(true);
  const [detailedMessages, setDetailedMessages] = useState([]);
  const [messageInputs, setMessageInputs] = useState({
    issue: '',
  });

  const messageContainerRef = useRef(null); // Reference to the message container for auto-scrolling

  useEffect(() => {

    getCommunications().then((response) => {
      if (response.error === false) {
        setCommunicates(response.data);
      }
    }).catch((error) => {
      console.log(error)
    })

  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message container when detailedMessages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [detailedMessages]);

  const fetchDetailedMessages = async (messageId) => {
    try {
      const response = await getDetailMessages(messageId);
      if (response.error === false) {
        // console.log(response.data._id)
        setDetailedMessages(response.data);
      } else {
        console.log('Error fetching details.');
      }
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  // Function to mark messages as read
  const markMessagesAsRead = async (messages) => {
    try {
      const response = await markMessagesRead({ messages });
      if (response.error === false) {
        console.log('Messages marked as read successfully.', response);
      } else {
        console.log('Error marking messages as read.');
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Function to toggle between showing unread and read messages
  const toggleMessages = () => {
    setShowUnread(!showUnread);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    date.setMinutes(date.getMinutes() - 5.5 * 60);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    // return `${day}/${month}/${year} at ${hours}:${minutes} ${period}`;
    return `${day}/${month}/${year} - ${hours}:${minutes} ${period}`;
    // return `${hours}:${minutes} ${period}`;

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageInputs({
      ...messageInputs,
      [name]: value,
    });
  };

  const handleSendMessage = async () => {
    // You can add validation for issue and reason inputs here if needed
    const { issue } = messageInputs;
    const receiver = detailedMessages?.participants?.find((participant) => participant.user_id !== userCred.user_id);

    if (issue && receiver) {

      sendMessage({ issue, receiver: receiver._id }).then((response) => {
        if (response.error === false) {
          console.log('Message sent successfully.');
          setMessageInputs({
            issue: '',
          });
          fetchDetailedMessages(detailedMessages._id);
        } else {
          console.log('Error sending message.');
        }
      })
    } else {
      console.log('Please fill in all fields and select a valid receiver.');
    }
  };

  return (
    <div>
      <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>Communication</h1>

      <div className='grid grid-cols-12'>
        <div className='col-span-5'>
          {/* Read & Unread Messages */}
          <div className='flex justify-evenly overflow-y-scroll no-scrollbar'>
            <button
              type='button'
              className={`plusJakartaSans hover:bg-gray-200 rounded-lg py-1 px-3 mx-2 ${showUnread ? 'bg-gray-200 focus:bg-gray-200 border-b-2 border-b-blue-500 text-black font-semibold' : 'border-b text-black'
                }`}
              onClick={toggleMessages}
            >
              Unread Messages
            </button>
            <button
              type='button'
              className={` plusJakartaSans hover:bg-gray-200  rounded-lg py-1 px-3 mx-2 ${showUnread ? 'border-b text-black' : 'border-b-2 border-b-blue-500 bg-gray-200 focus:bg-gray-200 text-black font-semibold'
                }`}
              onClick={toggleMessages}
            >
              Read Messages
            </button>
          </div>

          {/* Message Preview */}
          <div>
            {showUnread ? (
              <div className='my-5'>
                {communicates && communicates?.unread && communicates?.unread?.length > 0 ? (
                  communicates.unread.map((message) => {
                    {/* console.log("Unread: ", message) */ }

                    // Get the count of unread messages
                    const unreadCount = message.messages.length;

                    // Get the last received message
                    const lastReceivedMessage = message.messages[unreadCount - 1];

                    return (
                      <div
                        key={message._id}
                        className={`border border-l-4 border-[#F70000] rounded-xl shadow-md shadow-gray-500 px-4 py-3 bg-white my-4 cursor-pointer no-scrollbar overflow-scroll`}
                        onClick={() => {
                          fetchDetailedMessages(message._id);
                          markMessagesAsRead(message.messages); // Mark messages as read
                        }}
                      >
                        <div className="flex flex-wrap justify-between items-center">
                          {/* Message Pic & Name */}
                          <div>
                            {message?.participants?.map((prct) => {
                              const isCurrentUser = prct._id === accountId;
                              if (!isCurrentUser) {
                                return (
                                  <div key={prct._id} className='flex space-x-4 items-center'>
                                    <img src={prct?.profile_pic ? prct?.profile_pic : default_image} alt="profile" className='w-10 h-10 text-xs rounded-full ring-[#F70000] ring-1 ring-offset-2' />
                                    <p className={`plusJakartaSans font-bold`}>
                                      {prct.name}
                                    </p>
                                  </div>
                                )
                              }
                            })}
                          </div>
                          {/* Message Time */}
                          <div className="text-right">
                            <p className={`plusJakartaSans text-xs font-medium`}>
                              {formatTimestamp(lastReceivedMessage.timestamp)}
                            </p>
                          </div>
                        </div>
                        {/* Message Text */}
                        <div>
                          <div key={lastReceivedMessage._id} className='flex justify-between items-center pt-2'>
                            <p className='plusJakartaSans text-sm font-semibold pr-2 line-clamp-2'>{lastReceivedMessage.issue}</p>
                            <p className="plusJakartaSans text-xs bg-red-100 text-center px-2 py-1 font-bold rounded-full">
                              {unreadCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className='text-center'>
                    <p className='plusJakartaSans font-bold capitalize'>No messages available.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className='my-5'>
                {communicates && communicates?.read && communicates?.read?.length > 0 ? (
                  communicates?.read.map((message) => {
                    {/* console.log("read: ", message) */ }

                    // Get the count of unread messages
                    const readCount = message.messages.length;

                    // Get the last received message
                    const lastReceivedMessage = message.messages[readCount - 1];

                    return (
                      <div
                        key={message._id}
                        className={`border border-l-4 border-[#07FF5C] rounded-xl shadow-md shadow-gray-500 px-4 py-3 bg-white my-4 cursor-pointer no-scrollbar overflow-scroll`}
                        onClick={() => {
                          fetchDetailedMessages(message._id);
                        }}
                      >
                        <div className="flex flex-wrap justify-between items-center">
                          {/* Message Pic & Name */}
                          <div>
                            {message?.participants?.map((prct) => {
                              const isCurrentUser = prct._id === accountId;

                              if (!isCurrentUser) {
                                return (
                                  <div key={prct._id} className='flex space-x-4 items-center'>
                                    <img src={prct?.profile_pic ? prct?.profile_pic : default_image} alt="profile" className='w-10 h-10 text-xs rounded-full ring-[#07FF5C] ring-1 ring-offset-2' />
                                    <p className="plusJakartaSans font-bold">
                                      {prct.name}
                                    </p>
                                  </div>
                                )
                              }
                            })}
                          </div>
                          {/* Message Time */}
                          <div className="text-right">
                            <p className={`plusJakartaSans text-xs font-medium`}>
                              {formatTimestamp(lastReceivedMessage.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div>
                          {/* Message Text */}
                          <div key={lastReceivedMessage._id} className='flex justify-between items-center pt-2'>
                            <p className='plusJakartaSans text-sm font-semibold pr-2 pt-1 line-clamp-2'>{lastReceivedMessage.issue}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className='text-center'>
                    <p className='plusJakartaSans font-bold capitalize'>No messages available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='col-span-7'>
          <div className='border bg-white rounded-2xl mx-4 pt-2 pb-4 overflow-hidden'>
            {detailedMessages && detailedMessages?.messages && detailedMessages?.messages?.length > 0 ? (
              <>
                {/* User Name, Pic */}
                <div className="sticky top-0 bg-white">
                  {detailedMessages?.participants?.map((prct) => {
                    {/* console.log(detailedMessages) */ }
                    const isCurrentUserDetailed = prct._id === accountId;

                    if (!isCurrentUserDetailed) {
                      return (
                        <div key={prct._id} className='flex pt-3 pb-4 px-4 justify-between items-center border-b border-b-gray-500'>
                          <img src={prct?.profile_pic ? prct?.profile_pic : default_image} alt="profile" className='w-10 h-10 text-xs rounded-full ring-1 ring-offset-2' />
                          <p className={`plusJakartaSans font-bold text-lg `}>
                            {prct?.name}
                          </p>
                          <div className='text-end'>
                            <p className={`plusJakartaSans text-sm font-normal`}>
                              {prct?.user_id}
                            </p>
                            <p className={`plusJakartaSans text-sm font-normal`}>
                              {prct?.user_roles}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>

                {/* Chat Box */}
                <div ref={messageContainerRef} className="overflow-y-scroll no-scrollbar h-[22rem] py-2">
                  {detailedMessages?.messages?.map((msg) => {

                    const isSentByCurrentUser = msg.sender === accountId;

                    return (
                      <div key={msg._id} className={`${isSentByCurrentUser ? 'flex justify-end' : 'flex justify-start'}`}>
                        <div className={`px-4 py-1 mx-4 w-72 rounded-xl my-2 leading-loose ${isSentByCurrentUser ? 'justify-end bg-[#615EF0] text-white' : 'bg-[#F1F1F1]'}`}>
                          <p className={`plusJakartaSans text-sm font-semibold break-words hyphens-auto`}>{msg?.issue}</p>
                          <p className={`plusJakartaSans text-[0.6rem] text-end `}>
                            {formatTimestamp(msg?.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t px-4 pt-4 border-gray-300">
                  <div className="flex items-center no-scrollbar overflow-y-scroll">
                    <input
                      name="issue"
                      type="text"
                      placeholder="Tell me about your issue..."
                      className="flex-1 px-4 py-2 border rounded-full border-gray-400 focus:outline-none"
                      onChange={handleInputChange}
                      value={messageInputs.issue}
                    />
                    <button
                      className={`plusJakartaSans bg-[#23B0E2] text-white rounded-full py-2 px-3 ml-2 ${!messageInputs.issue ? 'cursor-not-allowed opacity-50' : ''}`}
                      onClick={handleSendMessage}
                      disabled={!messageInputs.issue}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="h-96 flex justify-center items-center p-4">
                  <p className='plusJakartaSans font-bold'>View Messages</p>
                </div>
              </>
            )
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default Communication;
