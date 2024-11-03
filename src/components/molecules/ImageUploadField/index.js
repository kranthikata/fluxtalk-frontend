import PropTypes from "prop-types";
import { MdCloudDone } from "react-icons/md";
import Input from "../../atoms/Input";
import Icon from "../../atoms/Icon";
import Paragraph from "../../atoms/Paragraph";

const ImageUploadField = ({ type, name, accept, onChange, className }) => {
  return (
    <>
      <div className="relative">
        <Input
          type={type}
          name={name}
          accept={accept}
          onChange={onChange}
          className={className}
        />
        <Icon icon={MdCloudDone} />
      </div>
      <Paragraph className="text-xs text-red-500 mt-[-10px]">
        Error Uploading
      </Paragraph>
    </>
  );
};

ImageUploadField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ImageUploadField;
