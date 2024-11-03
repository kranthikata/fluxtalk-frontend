import PropTypes from "prop-types";

const Icon = ({ icon, ...others }) => {
  const Tag = icon;
  return (
    <Tag className="absolute top-1/2 right-3 -translate-y-1/2" {...others} />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
