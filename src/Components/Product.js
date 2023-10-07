import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Productsell from "./Productsell";
import { useNavigate } from "react-router";
import "../addItem.css";
import Contactowner from "./Contactowner";
import Editprofile from "./Editprofile";
import Searchdata from "./Searchdata";
export default function Product() {
  const redirect = useNavigate();
  const [searchproduct, setProductSearch] = useState();
  const [searchproductStatus, setProductSearchStatus] = useState(false);
  const [myads, setmyAds] = useState([]);
  const [myadsstatus, setmyAdsstatus] = useState(false);
  const [productstatus, setProductstatus] = useState(true);
  const [productdetail, setProductdetail] = useState([]);
  const [navstatus, setNavstatus] = useState(true);
  const [userdetail, setUserdetail] = useState([]);
  const [statusEdit, setStatusedit] = useState(false);
  const [searchText, setSearchText] = useState();
  const [statusowner, setstatusowner] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const emailObj = { email: email};
  useEffect(() => {
    fetch(
      `http://127.0.0.1:2022/olx_clone/getItemDetail?email=${encodeURIComponent(
        email
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setmyAds(data.myAds);
        setProductdetail(data.productDetail);
        setUserdetail(data.userDetail);
      })
      .catch((error) => {
        alert("error occur in to find products " + error);
        window.location.reload();
      });
  }, []);
  const Handleads = () => {
    setmyAdsstatus(true);
    setProductstatus(false);
    setStatusedit(false);
    setProductSearchStatus(false);
  };
  const Handlesearch = (e) => {
    setSearchText(e.target.value);
  };
  const Handlesubmit = (e) => {
    e.preventDefault();
    let url="";
    if(!myadsstatus)
    {
      url=`http://127.0.0.1:2022/olx_clone/searchItem?email=${encodeURIComponent(
        email
      )}&searchtext=${encodeURIComponent(searchText)}`
    }
    else{
      url=`http://127.0.0.1:2022/olx_clone/searchItemAds?email=${encodeURIComponent(
        email
      )}&searchtext=${encodeURIComponent(searchText)}`
    }
    fetch(
      url
    )
      .then((response) => response.json())
      .then((data) => {
        setProductSearch(data.searchDetail);
        setProductSearchStatus(true);
        setmyAdsstatus(false);
        setProductstatus(false);
        setStatusedit(false);
        setSearchText("");
      })
      .catch((error) => {
        alert("error occur in searching the product " + error);
        window.location.reload();
      });
  };
  const Handledelete = () => {
    const resp = window.confirm("Are you sure you want to delete Account?");
    if (resp) {
      try {
        fetch("http://127.0.0.1:2022/olx_clone/deleteAccount", {
          method: "POST",
          body: JSON.stringify(emailObj),
        })
          .then((response) => {
            if (response.ok) {
              alert("Account Deleted successfully");
              redirect("/");
            }
          })
          .catch((error) => {
            alert("error occur in deleting the account " + error);
            window.location.reload();
          });
      } catch (error) {
        alert("problem in deleting the account try again!! " + error);
        window.location.reload();
      }
    } else {
      return;
    }
  };
  return (
    <>
      {navstatus && (
        <div>
          {userdetail.length !== 0 && (
            <nav
              className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark"
              data-bs-theme="dark"
            >
              <div className="container-fluid">
                <a
                  className="navbar-brand"
                  href="#"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  SecondHandSquare
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarColor01"
                  aria-controls="navbarColor01"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link active border-bottom border-bottom-white border-top bg-body-secondary rounded-3 w-100"
                        aria-current="page"
                        href="#"
                        onClick={() => {
                          const queryParams = new URLSearchParams(
                            emailObj
                          ).toString();
                          redirect(`/addproduct?${queryParams}`);
                        }}
                      >
                        <span className="fw-bolder">+</span> SELL PRODUCT
                      </a>
                    </li>
                  </ul>

                  <img
                    className="card-img userimage fw-semibold"
                    src={`${userdetail[0].image}`}
                    alt="Not Found"
                  ></img>
                  <div className="dropdown m-lg-2">
                    <button
                      className="btn btn-secondary dropdown-toggle nav-item"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userdetail[0].username}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item text-white"
                          href="#"
                          onClick={() => {
                            setStatusedit(true);
                            setProductstatus(false);
                            setNavstatus(false);
                            setProductSearchStatus(false);
                            setmyAdsstatus(false);
                          }}
                        >
                          View and Edit Profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-white"
                          href="#"
                          onClick={() => {
                            Handleads();
                          }}
                        >
                          My Ads
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-white"
                          href="#"
                          onClick={() => {
                            setstatusowner(true);
                          }}
                        >
                          Report
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-white"
                          href="#"
                          onClick={Handledelete}
                        >
                          Delete Account
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item text-white"
                          href="#"
                          onClick={() => {
                            redirect("/");
                          }}
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                  <form
                    className="d-flex"
                    role="search"
                    onSubmit={Handlesubmit}
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      value={searchText}
                      onChange={Handlesearch}
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-light" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </nav>
          )}
        </div>
      )}
      {productstatus && (
        <div>{<Productsell data={productdetail} email="1" />}</div>
      )}
      <div>{myadsstatus && <Productsell data={myads} email={email} />}</div>
      <div>
        {statusEdit && (
          <Editprofile
            userdetail={userdetail}
            page={true}
            btn="Update"
            header="Profile Updation"
            setStatusEditAdd={setStatusedit}
            setProductstatus={setProductstatus}
            setNavstatus={setNavstatus}
          />
        )}
      </div>
      {searchproductStatus && <Searchdata searchproduct={searchproduct} />}
      {statusowner && <Contactowner setstatusowner={setstatusowner} />}
    </>
  );
}
