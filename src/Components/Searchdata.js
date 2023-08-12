import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import noproductfound from "../noproductfound.png";
export default function Searchdata({ searchproduct }) {
  const [product, setProduct] = useState();
  const [productstatus, setProductstatus] = useState(true);
  const [statusdetail, setproductDetailStatus] = useState(false);
  const HandleClick = (product) => {
    setProduct(product);
    setproductDetailStatus(true);
    setProductstatus(false);
  };
  return (
    <div>
      {productstatus && (
        <div className="row row-cols-1 row-cols-md-5 mb-3">
          {searchproduct.length === 0 && (
            <img id="notfound" src={noproductfound} alt="Not Found" />
          )}
          {searchproduct &&
            searchproduct.map((product) => (
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
                        <span className="fw-semibold fs-5">Brand : </span>
                        {product.brand}
                      </li>
                    </ul>
                    <a
                      className="text-black"
                      onClick={() => {
                        HandleClick(product);
                      }}
                    >
                      Buy Now
                    </a>
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
