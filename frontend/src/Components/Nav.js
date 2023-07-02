import { Route, Link } from "react-router-dom";
import { useState } from "react";

export const Nav = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/Home">
            Home
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/doctor">
                  Doctor
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Patient
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#appointment">
                  Appointment
                </a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <div className="d-flex align-items-center">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/about"
                    >
                      About us
                    </Link>
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      <button type="button" className="btn btn-primary">
                        Sign in
                      </button>
                    </Link>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
