import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const GoogleOAuth = ({ action, onSuccess, onError }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center mt-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(`${action} Success:`, credentialResponse);
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
