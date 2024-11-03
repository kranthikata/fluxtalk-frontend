import PropTypes from "prop-types";
import Input from "../../atoms/Input";
import Paragraph from "../../atoms/Paragraph";

const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      <Paragraph className="text-xs text-red-500 mt-[-10px]">
        NameError
      </Paragraph>
    </>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
