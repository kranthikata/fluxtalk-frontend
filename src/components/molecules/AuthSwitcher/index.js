import React from "react";
import Paragraph from "../../atoms/Paragraph";
import Button from "../../atoms/Button";

const AuthSwitcher = ({ messageText, buttonText, onClick }) => {
  return (
    <>
      {/* ------------------------Line Breaker------------------------ */}
      <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
        <hr className="border-gray-500" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-500" />
      </div>

      {/* -------------------------------Auth Switcher-------------------------- */}
      <div className="mt-3 text-xs flex justify-between items-center">
        <Paragraph>{messageText}</Paragraph>
        <Button
          onClick={onClick}
          className="py-2 px-5 bg-gradient-to-r from-customBlue to-customGreen rounded-xl border hover:scale-105 duration-300"
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default AuthSwitcher;