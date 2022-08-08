import { ChangePassword } from "../components/ChangePassword";
import { ChangeUsername } from "../components/ChangeUsername";
import { HelmetTitle } from "../components/HelmetTitle";

export const MyAccount = () => {
  return (
    <>
      <ChangeUsername />
      <ChangePassword />
    </>
  );
};
