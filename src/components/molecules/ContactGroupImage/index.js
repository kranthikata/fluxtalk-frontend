import React from "react";
import Image from "../../atoms/Image";

const ContactGroupImage = ({ userDetails }) => {
  const userName1 = userDetails?.users[0]?.name;
  const userImage1 = userDetails?.users[0]?.image;
  const userName2 = userDetails?.users[0]?.name;
  const userImage2 = userDetails?.users[0]?.image;
  console.log(userName1, userName2, userImage2, userImage1);
  return (
    <div className="h-14 w-16 flex items-center relative md:pr-5">
      <Image
        className="rounded-full h-10 w-10 absolute"
        src={userImage1}
        alt={userName1}
      />
      <Image
        className="rounded-full h-10 w-10 absolute"
        src={userImage2}
        alt={userName2}
      />
      {userDetails.users.length - 2 !== 0 && (
        <div className="rounded-full h-10 w-10 absolute bg-gradient-to-tr from-custom-blue to-custom-green flex items-center justify-center text-white text-sm ml-4">
          +{userDetails.users.length - 2}
        </div>
      )}
    </div>
  );
};

export default ContactGroupImage;
