import React from "react";
import { useState} from "react";
import "../addItem.css";
export default function Editprofile({
  userdetail,
  page,
  btn,
  header,
  setStatusEditAdd,
  setProductstatus,
  setNavstatus,
}) {
  const [name, setName] = useState(page ? userdetail[0].name : "");
  const [email, setEmail] = useState(page ? userdetail[0].email : "");
  const [number, setNumber] = useState(page ? userdetail[0].mno : "");
  const [username, setUsername] = useState(page ? userdetail[0].username : "");
  const [city, setCity] = useState(page ? userdetail[0].city : "");
  const [password, setPassword] = useState(page ? userdetail[0].pwd : "");
  const [statename, setStatename] = useState(page ? userdetail[0].state : "");
  const [cpassword, setCpassword] = useState(page ? userdetail[0].pwd : "");
  const [image, setImage] = useState(page ? userdetail[0].image : "");
  const [detail, setDetail] = useState(null);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword || password.length <= 4) {
      alert("password should be Same or length greater than 4");
      return;
    }
    if (
      image === "" &&
      (password === "") & (cpassword === "") &&
      name === "" &&
      email === "" &&
      number === "" &&
      city === "" &&
      statename === "" &&
      username === ""
    ) {
      alert("plzz the fields first");
      return;
    }
    const userUpdatedetail = {
      name: name,
      email: email,
      number: number,
      username: username,
      city: city,
      password: password,
      statename: statename,
      image: image,
    };
    setDetail(userUpdatedetail);
    if (!page) {
      try {
        fetch("http://127.0.0.1:2022/olx_clone/insertDetail", {
          method: "POST",
          body: JSON.stringify(detail),
        })
          .then((response) => {
            if (response.ok) {
              alert(name + " you have registered successfully");
              setStatusEditAdd(false);
            }
          })
          .catch((error) => {
            alert("error occur" + error);
            window.location.reload();
          });
      } catch (error) {
        alert("Error in register user Try Again:", error);
        window.location.reload();
      }
    } else {
      if (
        image === userdetail[0].image &&
        password === userdetail[0].pwd &&
        name === userdetail[0].name &&
        email === userdetail[0].email &&
        number === userdetail[0].mno &&
        city === userdetail[0].city &&
        statename === userdetail[0].state &&
        username === userdetail[0].username
      ) {
        alert("you have not changed anything yet");
        return;
      } else {
        try {
          fetch("http://127.0.0.1:2022/olx_clone/UpdateDetails", {
            method: "POST",
            body: JSON.stringify(detail),
          })
            .then((response) => {
              if (response.ok) {
                alert("Details Uploaded successfully");
                setStatusEditAdd(false);
                setNavstatus(true);
                setProductstatus(true);
                window.location.reload();
              }
            })
            .catch((error) => {
              alert("error occur " + error);
              window.location.reload();
            });
        } catch (error) {
          alert("Error in uploading detail Try Again:", error);
          window.location.reload();
        }
      }
    }
  
  };
  return (
    <>
      {
        <form
          className="row g-3 border border-2 border-black rounded-4 formcol form"
          onSubmit={HandleSubmit}
        >
          
          <h1 className="text-center">{header}</h1>
          <span className="text-danger info">double click to register or update</span>
          <hr />
          <div className="col-md-4">
            <label htmlFor="image" className="form-label">
              Upload Profile Photo
            </label>
            <input
              className="form-control d-inline"
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              id="formFile"
              onChange={(event) => {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                  if (
                    selectedFile.type === "image/jpeg" ||
                    selectedFile.type === "image/png" ||
                    selectedFile.type === "image/jpg"
                  ) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const imageContent = e.target.result;
                      setImage(imageContent);
                    };
                    reader.readAsDataURL(selectedFile);
                  } else {
                    alert(
                      "Please select a valid JPG or PNG or JPEG image file"
                    );
                    event.target.value = "";
                  }
                }
              }}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="fname" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="fname"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="email"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="mno" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              className="form-control"
              id="mno"
              pattern="[0-9]{10}"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="Username" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="form-control"
                id="Username"
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className="form-control"
              id="city"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="pwd" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              id="pwd"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="cpwd" className="form-label">
              confirm Password
            </label>
            <input
              type="password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              className="form-control"
              id="cpwd"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              className="form-select"
              value={statename}
              onChange={(e) => {
                setStatename(e.target.value);
              }}
              id="state"
            >
              <option defaultValue={"Andhra pradesh"}>Andhra pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka </option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Sikkim</option>
              <option>Tamilnadu</option>
              <option>Telangana</option>
              <option>Tripura</option>
              <option>Uttar Pradesh</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </select>
          </div>
          <div className="col-15 text-center">
            <button
              className="btn btn-primary w-50 justify-content-center"
              type="submit"
            >
              {btn}
            </button>
          </div>
        </form>
      }
    </>
  );
}
