import { useState } from "react";
import InputField from "../../molecules/InputField";
import Paragraph from "../../atoms/Paragraph";
import PasswordInputField from "../../molecules/PasswordInputField";
import ImageUploadField from "../../molecules/ImageUploadField";
import AuthButton from "../../molecules/AuthButton";
import useImageUpload from "../../../hooks/useImageUpload";
import AuthSwitcher from "../../molecules/AuthSwitcher";
import { signUpUser } from "../../../api/authApi";
import validateRegistrationForm from "../../../utils/validateRegistrationForm";
import { messages } from "../../../utils/messages";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [imageUrl, handleImageUpload, imageError, uploadStatus] =
    useImageUpload();
  const [errors, setErrors] = useState({});
  const [inProgress, setInProgress] = useState({
    loading: false,
    progressText: "Sign Up",
  });

  //Handling The Input Changes
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  //SignUp logic
  const onSignUp = async (event) => {
    event.preventDefault();

    //Checking all fields are provided
    const errors = validateRegistrationForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      setErrors({});
      setInProgress({ loading: true, progressText: "Signing Up..." });
      const response = await signUpUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: imageUrl,
      });
      console.log(response);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        signUp: error.response.data.message || messages.errors.signUpFailed,
      }));
    } finally {
      setInProgress({ loading: false, progressText: "Sign Up" });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={onSignUp}>
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          errorMessage={errors.name}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          errorMessage={errors.email}
        />
        <PasswordInputField
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          errorMessage={errors.password}
        />
        <PasswordInputField
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          errorMessage={errors.passwordMismatched}
        />
        <Paragraph className="text-xs ml-3 mb-[-10px]">
          Upload a profile image (optional)
        </Paragraph>
        <ImageUploadField
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageUpload}
          className="cursor-pointer file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          errorMessage={imageError}
          uploadStatus={uploadStatus}
        />
        <AuthButton
          type="submit"
          className="flex justify-center items-center bg-gradient-to-r from-cyan-300 to-green-300 rounded-xl text-white py-2  hover:scale-105 duration-300"
          isLoading={inProgress.loading}
          buttonText={inProgress.progressText}
        />
      </form>
      {errors.signUp && (
        <Paragraph className="text-red-500 text-xs text-center font-bold mt-3 animate-shake">
          {errors.signUp}
        </Paragraph>
      )}
      <AuthSwitcher messageText="Already a member?" buttonText="Login" />
    </>
  );
};

export default RegistrationForm;
