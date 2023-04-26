import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginPage() {
  const navigate = useNavigate();
  const responseGoogleFailure = (response) => {
    console.log(response);
  };
  const responseGoogleSuccess = (response) => {
    console.log(response);
    navigate("/showall");
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          render={({ onClick }) => (
            <button onClick={onClick}>
              <FcGoogle />
            </button>
          )}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
