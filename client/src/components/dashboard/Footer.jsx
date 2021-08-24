import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-center text-white fixed-bottom">
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Social media --> */}
          <section className="mb-4">
            {/* <!-- Facebook --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-facebook-f" />
            </a>

            {/* <!-- Twitter --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-twitter" />
            </a>

            {/* <!-- Google --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-google" />
            </a>

            {/* <!-- Instagram --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-instagram" />
            </a>

            {/* <!-- Linkedin --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-linkedin-in" />
            </a>

            {/* <!-- Github --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-github" />
            </a>
          </section>
          {/* <!-- Section: Social media --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center p-3" style={{ backgroundColor: 'black' }}>
          © 2021 Copyright:
          <a className="text-white" href="#!"> phanton-poc.com </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>

    </div>
  );
}

export default Footer;
