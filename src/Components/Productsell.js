import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import noproductavailable from "../noproductavailable.jpg";
export default function Productsell({ data, email }) {
  const [statussell, setproductSellStatus] = useState(true);
  const [statusdetail, setproductDetailStatus] = useState(false);
  const [product, setProduct] = useState();
  const HandleClick = (product) => {
    setProduct(product);
    setproductSellStatus(false);
    setproductDetailStatus(true);
  };
  const HandleDelete = (product, email) => {
    try {
      fetch(
        `http://127.0.0.1:2022/olx_clone/deleteProduct?email=${email}&title=${product.title}&brand=${product.brand}`
      )
        .then((response) => {
          if (response.ok) {
            alert("Product Deleted successfully");
          }
        })
        .catch((error) => {
          alert("error occur in removing the product " + error);
        });
    } catch (error) {
      alert("Error in removing the product " + error);
    }
    window.location.reload();
  };
  return (
    <div>
      {statussell && (
        <div className="row row-cols-1 row-cols-md-5 mb-3">
          {data.length === 0 && email === "1" && (
            <img id="notavailable" src={noproductavailable} alt="Not Found" />
          )}
          {data.length === 0 && email !== "1" && (
            <img id="notavailable" src={noproductavailable} alt="Not Found" />
          )}
          {data.map((product) => (
            <div className="col bg-black">
              <div className="card mb-3 rounded-3 h">
                <div className="card-header">
                  <img
                    className="card-img mb-3"
                    src={`${product.image1}`}
                    alt="not found"
                  />
                  <h4 className="my-0 fw-normal">₹ {product.price}</h4>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className="fw-medium">
                      <span className="fw-semibold fs-5">Title : </span>
                      {product.title}
                    </li>
                    <li className="fw-medium">
                      {" "}
                      <span className="fw-semibold fs-5">Brand : </span>
                      {product.brand}
                    </li>
                  </ul>
                  <a
                    className="text-black"
                    href="#"
                    onClick={() => {
                      HandleClick(product);
                    }}
                  >
                    Buy Now
                  </a>
                  {email !== "1" && (
                    <a
                      className="text-black m-3"
                      href="#"
                      onClick={() => {
                        HandleDelete(product, email);
                      }}
                    >
                      Remove Product
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {statusdetail && <ProductDetail Product={product} />}
    </div>
  );
}
