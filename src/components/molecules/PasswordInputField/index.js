import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Paragraph from "../../atoms/Paragraph";

const PasswordInputField = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <>
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <Button type="button">
          <Icon icon={FaEye} />
        </Button>
      </div>
      <Paragraph className="text-xs text-red-500 mt-[-10px]">
        {errorMessage}
      </Paragraph>
    </>
  );
};

PasswordInputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
export default PasswordInputField;
