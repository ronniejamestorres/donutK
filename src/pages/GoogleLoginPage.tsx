import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginPage() {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);
    navigate("/showall");
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <GoogleLogin
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
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
