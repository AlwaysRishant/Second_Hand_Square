import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../addItem.css";
import { useNavigate } from "react-router-dom";
export default function Additem() {
  const redirect = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const emailObj = { email: email };
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [overview, setOverview] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const handleFileChange = (event, setImage) => {
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
        alert("Please select a valid JPG or PNG or JPEG image file");
        event.target.value = "";
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      image1: image1,
      image2: image2,
      image3: image3,
      image4: image4,
      overview: overview,
      title: title,
      brand: brand,
      price: price,
      email: email,
    };
    setDetail(data);
    try {
      fetch("http://127.0.0.1:2022/olx_clone/insertProductDetail", {
        method: "POST",
        body: JSON.stringify(detail),
      })
        .then((response) => {
          if (response.ok) {
            alert("Product Added Succesfully");
            const queryParams = new URLSearchParams(emailObj).toString();
            redirect(`/products?${queryParams}`);
          }
        })
        .catch((error) => {
          alert("error occur:" + error);
          window.location.reload();
        });
    } catch (error) {
      alert("Something went Wrong:" + error);
      window.location.reload();
    }
  };
  return (
    <form
      id="additem"
      className="row g-1 border border-2 border-black rounded-2 m-auto additem"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-white">Add Product</h1>
      <hr />
      <div className="mb-1 flex-nowrap">
        <label for="formFile" className="form-label text-white">
          upload photo of your product
        </label>
        <br></br>
        <input
          className="form-control w-50 d-inline"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          required
          id="formFile"
          onChange={(e) => {
            handleFileChange(e, setImage1);
          }}
        />
        <input
          className="form-control w-50 d-inline"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          required
          id="formFile"
          onChange={(e) => {
            handleFileChange(e, setImage2);
          }}
        />
        <input
          className="form-control w-50 d-inline"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          required
          id="formFile"
          onChange={(e) => {
            handleFileChange(e, setImage3);
          }}
        />
        <input
          className="form-control w-50 d-inline"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          required
          id="formFile"
          onChange={(e) => {
            handleFileChange(e, setImage4);
          }}
        />
      </div>
      <div className="mb-1">
        <label for="exampleFormControlInput1" className="form-label text-white">
          Brand
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          required
        />
      </div>
      <div className="mb-1">
        <label for="exampleFormControlInput2" className="form-label text-white">
          Add Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput2"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
      </div>
      <div className="mb-1">
        <label
          for="exampleFormControlTextarea1"
          className="form-label text-white"
        >
          Description of your product
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={(e) => {
            setOverview(e.target.value);
          }}
          required
        ></textarea>
      </div>
      <div className="mb-2">
        <label for="exampleFormControlInput3" className="form-label text-white">
          Enter Price
        </label>
        <input
          type="number"
          min="0"
          max="1000000000000000000000000000"
          className="form-control"
          id="exampleFormControlInput3"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required
        />
      </div>
      <button type="submit" className="btn m-lg-auto btn-dark w-50 button">
        Sumbit
      </button>
    </form>
  );
}
