import { ChangePassword } from "../components/ChangePassword";
import { ChangeUsername } from "../components/ChangeUsername";
import { HelmetTitle } from "../components/HelmetTitle";

export const MyAccount = () => {
  return (
    <>
      <HelmetTitle title={"My account"} />
      <ChangeUsername />
      <ChangePassword />
    </>
  );
};
