import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
const Index = ({ Signup, Login }) => {
  const [SignUpModal, setSignUpModal] = useState(Signup);
  const [SignInModal, setSignInModal] = useState(Login);

  const HandleModal = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
      setSignInModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  return (
    <>
      <div className="">
        {/* <div className="profil-container">
            <LeftNAV page={"profil"} />
          </div> */}
        <div className="">
          <ul>
            <li onClick={HandleModal} id="register">
              S&apos;inscrire{" "}
            </li>
            <li onClick={HandleModal} id="login">
              Se connecter
            </li>
          </ul>
          {SignInModal && <LoginForm />}
          {SignUpModal && <SignupForm />}
        </div>
      </div>
    </>
  );
};

export default Index;
