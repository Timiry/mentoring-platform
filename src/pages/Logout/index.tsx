import MainLayout from "../../components/layout/Main";
import LogoutForm from "./components/LogoutForm";

const LoginPage: React.FC = () => {
  return (
    <MainLayout>
      <LogoutForm />
    </MainLayout>
  );
};

export default LoginPage;
