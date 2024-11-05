import React from "react";
import Image from "../../atoms/Image";

const ContactImage = ({ userImage }) => {
  return (
    <div className="h-12 w-12 md:h-15 md:w-15 overflow-hidden rounded-full flex items-center">
      <Image
        className="rounded-full h-full w-full"
        src={userImage}
        alt="profile"
      />
    </div>
  );
};

export default ContactImage;
