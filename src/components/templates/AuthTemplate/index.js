import PropTypes from "prop-types";
import Heading from "../../atoms/Heading";
import Image from "../../atoms/Image";
import FormTemplate from "../FormTemplate";
import Header from "../../organisms/Header";

const AuthTemplate = ({ title, imageSrc, children, quote }) => {
  return (
    <div className="h-screen">
      <Header logo="https://res.cloudinary.com/duqopzabn/image/upload/v1729093871/ChatApplication/appLogo.png" />
      <div className="bg-gradient-to-r from-cyan-200 to-green-200 min-h-[91%] flex items-center justify-center mt-3">
        <div className="bg-white flex rounded-2xl shadow-lg items-center py-5 md:max-w-[90%] lg:max-w-3xl">
          <div className="md:w-1/2 px-4">
            <FormTemplate title={title}>{children}</FormTemplate>
          </div>
          <div className="w-1/2 md:block hidden">
            <Heading
              level={1}
              className="font-mont bg-gradient-to-r from-slate-700 via-cyan-800 to-gray-600 bg-clip-text text-transparent text-4xl font-extrabold"
            >
              {quote}
            </Heading>
            <Image src={imageSrc} alt={title} className="rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

AuthTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  quote: PropTypes.string.isRequired,
};

export default AuthTemplate;
