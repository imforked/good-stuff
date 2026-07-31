import { Login as LoginComponent } from "../components/Login";
import { Page } from "../components/Page";

export const Login = () => {
  return (
    <Page hasPadding={false}>
      <LoginComponent />
    </Page>
  );
};
