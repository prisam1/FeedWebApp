import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

interface GoogleOAuthProps {
  action: string;
  onSuccess: (credentialResponse:any)=> void; 
  onError:any;

}

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const GoogleOAuth = ({ action, onSuccess, onError }:GoogleOAuthProps) => {

  if (!clientId) {
    console.error("Google Client ID is missing!");
    return null;
  } 
 
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col items-center mt-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (onSuccess) onSuccess(credentialResponse);
          }}
          onError={() => {
            console.error(`${action} Failed`);
            if (onError) onError();
          }}
          useOneTap={action === "signup"}
          theme="filled_blue"
          text={action === "signup" ? "signup_with" : "signin_with"}
        />
      </div>
    </GoogleOAuthProvider>
  );
};
