import { useState } from "react";
import { messages } from "../../utils/messages";

const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState();
  const [imageError, setImageError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("idle");

  //Handling The Image Upload
  const handleImageUpload = (event) => {
    const { files } = event.target;

    //Checking if the file uploaded or not
    if (files.length === 0) {
      console.log("No file selected");
      return;
    }

    //Validating file type
    const fileType = files[0].type;
    if (["image/png", "image/jpeg", "image/jpg"].includes(fileType)) {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "FluxTalk");
      data.append("cloud_name", "duqopzabn");

      console.log(data);

      //Clearing error if exists
      setImageError("");
      setUploadStatus("uploading");
      //Uploading to cloudinary
      fetch("https://api.cloudinary.com/v1_1/duqopzabn/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.url);
          setUploadStatus("success");
        })
        .catch((error) => {
          console.log("Error uploading image:", error);
          setImageError(messages.errors.imageUploadError);
          setUploadStatus("error");
        });
    } else {
      console.log(messages.errors.unsupportedFileType);
      setImageError(messages.errors.unsupportedFileType);
      setUploadStatus("error");
    }
  };
  return [imageUrl, handleImageUpload, imageError, uploadStatus];
};

export default useImageUpload;
