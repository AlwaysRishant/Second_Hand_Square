import React, { useEffect, useState } from "react";
import "../addItem.css";
import Sendmessage from "../Components/Sendmessage";
export default function ProductDetail({ Product }) {
  const [data, setData] = useState("");
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `http://127.0.0.1:2022/olx_clone/getSellerDetail?brand=${Product.brand}&title=${Product.title}`
        )
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
      } catch (error) {
        alert("Error in fetching data:", error);
        window.location.reload();
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container bg-black w-75">
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={Product.image1}
              className="d-block w-100"
              alt="..."
              style={{ height: 500 + "px" }}
            />
            <div className="carousel-caption">
              <h5>First slide</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={Product.image2}
              className="d-block w-100"
              alt="..."
              style={{ height: 500 + "px" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={Product.image3}
              className="d-block w-100"
              alt="..."
              style={{ height: 500 + "px" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide</h5>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={Product.image4}
              className="d-block w-100 text-center"
              alt="..."
              style={{ height: 500 + "px" }}
            />
            <div className="carousel-caption">
              <h5>Fourth slide</h5>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <hr className="text-white" />
      <div className="row">
        <div className="col-sm-4 mb-5">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Details</h2>
              <hr />
              <p className="card-text fw-semibold">
                <span className=" fs-4">Price </span>: ₹ {Product.price}
              </p>
              <p className="card-text fw-semibold">
                <span className=" fs-4">Brand </span>: {Product.brand}
              </p>
              <p className="card-text fw-semibold">
                <span className=" fs-4">Title </span>: {Product.title}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-5">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title fw-semibold">Description</h2>
              <hr />
              <p className="card-text fw-semibold overflow-auto">
                {Product.description}
              </p>
            </div>
          </div>
        </div>
        {data && (
          <div className="col-sm-4 mb-5">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Seller Information</h2>
                <hr />
                <img
                  className="card-img mb-3 sellimage fw-semibold"
                  src={`${data.image}`}
                  alt="not found"
                ></img>
                <span className="fs-4 m-lg-3">{data.name}</span>
                <p className="card-text fw-semibold">
                  <span className=" fs-4">Mobile Number </span>: {data.mno}
                </p>
                <p className="card-text fw-semibold">
                  <span className=" fs-4">Email-ID </span>: {data.email}
                </p>
                {Product.email !== data.email && (
                  <button
                    className="card-text fw-semibold"
                    onClick={() => {
                      setStatus(true);
                    }}
                  >
                    Send Message to seller
                  </button>
                )}
              </div>
            </div>
            {status && <Sendmessage data={data} setStatus={setStatus} />}
          </div>
        )}
      </div>
    </div>
  );
}
