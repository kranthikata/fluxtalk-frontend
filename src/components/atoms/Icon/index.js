const Icon = ({ icon, ...others }) => {
  const Tag = icon;
  return (
    <Tag className="absolute top-1/2 right-3 -translate-y-1/2" {...others} />
  );
};

export default Icon;
