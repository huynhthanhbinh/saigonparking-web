import React from "react";
import ReactDOM from "react-dom";
import { GoogleLogin } from "react-google-login";



function LoginWithGoogle() {
  const responseGoogle = response => {
    // console.log(response);
  };

  return (
    <div className="App">
      <div>
        <GoogleLogin
          clientId="292488726821-9m26q61n04820i76vhb7fhk0r0lrbs0e.apps.googleusercontent.com"
       
          cookiePolicy={'single_host_origin'}
          buttonText="Sign in"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </div>
  );
}

export default LoginWithGoogle;