import { useState } from "react";

const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState();

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

      //Uploading to cloudinary
      fetch("https://api.cloudinary.com/v1_1/duqopzabn/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.url);
        })
        .catch((error) => {
          console.log("Error uploading image:", error);
        });
    } else {
      console.log(
        "Unsupported file type. Please upload an image in PNG, JPEG, or JPG format."
      );
    }
  };
  return [imageUrl, handleImageUpload];
};

export default useImageUpload;
