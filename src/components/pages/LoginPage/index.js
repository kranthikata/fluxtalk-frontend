import LoginForm from "../../organisms/LoginForm";
import AuthTemplate from "../../templates/AuthTemplate";

const LoginPage = () => {
  return (
    <AuthTemplate
      title="Login"
      imageSrc="https://res.cloudinary.com/duqopzabn/image/upload/c_crop,ar_4:3/v1728101545/ChatApplication/login_image.jpg"
      quote="Life’s better when we’re connected. Ready to chat?"
    >
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
