import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editprofile from "./Editprofile";
import "../App.css";
import "../addItem.css";
export default function Userlogin() {
  const redirect = useNavigate();
  const [email, setName] = useState("");
  const [pwd, setAge] = useState("");
  const [statuseditadd, setStatusEditAdd] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const detail = { email: email, pwd: pwd };
    try {
      const response = await fetch(
        `http://127.0.0.1:2022/olx_clone/userLogin?data2=${detail.email}&data3=${detail.pwd}`
      );
      const mess = await response.json();
      if (mess.message === "yes") {
        alert("Login Succesfull");
        const queryParams = new URLSearchParams(detail).toString();
        redirect(`/products?${queryParams}`);
      } else if (mess.message === "no") {
        alert("Plzz create a account first");
        setStatusEditAdd(true);
      } else {
        alert("something went wrong try again");
        window.location.reload();
      }
    } catch (error) {
      alert("Error in  login to the site Try again!! " + error);
      window.location.reload();
    }
  };
  return (
    <div>
      {!statuseditadd && (
        <form
          className="row g-3 border border-2 border-black formcol rounded-4 form2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center">User Login</h1>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control w-75"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              className="form-control w-75"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-50">
            Submit
          </button>
          <br />
          <span>
            Don't have an account?
            <a
              href="#"
              className="text-black"
              onClick={() => {
                setStatusEditAdd(true);
              }}
            >
              Click me
            </a>
          </span>
        </form>
      )}
      {statuseditadd && (
        <Editprofile
          userdetail={""}
          page={false}
          btn="Register"
          header="Register User"
          setStatusEditAdd={setStatusEditAdd}
        />
      )}
    </div>
  );
}
