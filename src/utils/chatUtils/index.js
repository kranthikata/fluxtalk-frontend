export const getChatDetails = (loggedInUserId, chatDetails) => {
  let chatName;
  let chatImage;

  if (!chatDetails.isGroupChat) {
    const [firstUser, secondUser] = chatDetails.users;
    chatName =
      loggedInUserId === firstUser._id ? secondUser.name : firstUser.name;
    chatImage =
      loggedInUserId === firstUser._id ? secondUser.image : firstUser.image;
  } else {
    chatName = chatDetails.chatName;
  }

  return [chatName, chatImage];
};

export const getTimeStamp = (timeStamp) => {
  const date = new Date(timeStamp);
  const now = new Date();

  //Helper function to get the difference in days
  const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  //Check if the message was sent today
  if (daysDifference === 0) {
    return date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else if (daysDifference === 1) {
    //If yesterday
    return "Yesterday";
  } else {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-IN", options);
  }
};

export const isSameSender = (messages, message, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== message.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const getUserName = (loggedUser, activeItem, user) => {
  if (user._id === activeItem.groupAdmin._id && user._id === loggedUser._id) {
    return user.name + " (You) (Admin)";
  } else if (loggedUser._id === user._id) {
    return user.name + " (You)";
  } else if (user._id === activeItem.groupAdmin._id) {
    return user.name + " (Admin)";
  } else {
    return user.name;
  }
};
