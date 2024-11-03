import PropTypes from "prop-types";
import { TailSpin } from "react-loader-spinner";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Paragraph from "../../atoms/Paragraph";

const AuthButton = ({ type, className }) => {
  return (
    <Button type={type} className={className}>
      <Icon icon={TailSpin} height={14} color="black" />
      <Paragraph className="ml-2">Signing Up...</Paragraph>
    </Button>
  );
};

AuthButton.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AuthButton;
