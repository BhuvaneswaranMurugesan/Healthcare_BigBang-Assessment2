import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import jwt_decode from "jwt-decode";



export const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  /*const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      if (username == "Bhuvi") {
        if (password == 123) {
          usenavigate("/Home");
        } else {
          window.alert("Incorrect password");
        }
      } else {
        window.alert("Incorrect Username");
      }
    }
  };*/
  
  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      let inpobj = {
        userName: username,
        password: password,
      };
      //let inputobj = { username: username, password: password };
      fetch("http://localhost:5193/api/Token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inpobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            console.log(resp.length)
            toast.error("Login failed, invalid credentials");
          }
           else {
            toast.success('Login successful!');
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("jwttoken", resp.token);
            console.log(resp.token);
            const decodedToken = jwt_decode(resp.token);
            console.log(decodedToken);
            const role =
              decodedToken[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ];
            console.log(role); 
            if(resp.token)
            {
              if(role==="doctor")
            {
              usenavigate("/patient");
            }
            else if(role==="patient"){
              usenavigate("/doctor");
            }
            else{
              usenavigate("/admin")
            }
            }
            else{
              toast.error("invalid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
    else{
      toast.error("Enter the credentials");
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
    }
    if (password === "" || password === null) {
      result = false;
    }
    return result;
  };

  return (
    <div className="row">
      <ToastContainer />
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={ProceedLoginusingAPI} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link className="btn btn-success" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
