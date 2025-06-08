import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./AuthTabs.css";

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
          <div className="auth-tabs">
            <button
              className={`auth-tab${SignUpModal ? " active" : ""}`}
              onClick={HandleModal}
              id="register"
              type="button"
            >
              S'inscrire
            </button>
            <button
              className={`auth-tab${SignInModal ? " active" : ""}`}
              onClick={HandleModal}
              id="login"
              type="button"
            >
              Se connecter
            </button>
          </div>
          {SignInModal && <LoginForm />}
          {SignUpModal && <SignupForm />}
        </div>
      </div>
    </>
  );
};

export default Index;
