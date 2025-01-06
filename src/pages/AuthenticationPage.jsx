import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import useScreenSize from "../hooks/useScreenSize";

export default function AuthenticationPage({ setIsAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useScreenSize();

  return (
    <div className="relative authentication-page">
      <div className={`mosaic ${isOpen && "expand"}`}>
        <div className="info-container">
          <div className="info">
            <h1>Welcome to Virtual Petter!</h1>
            {isMobile && !isOpen && <button onClick={() => setIsOpen(true)} className="btn btn-outline-primary expand">Read more ⬇️</button>}
            <p>
              Here you can have your pets grow happy... unless you forget about them : (<br />
              Try to check in on them at least once a day!
              <br />
              <span className="small-font">(If they get too sad they&apos;ll eventually leave you)</span>
            </p>
            <p>
              Do you want to take care of a <b>dog</b>? A <b>cat</b>? Maybe a <b>duck</b>!<br />
              Maybe <b>LOTS OF DUCKS!</b>
            </p>
            <p>
              Each pet will have a unique personality and enjoy or dislike the accessories you make them wear.
              <br />
              Make sure you play with them. See how happy they are?
            </p>
            {isMobile && isOpen && <button onClick={() => setIsOpen(false)} className="btn btn-outline-primary">See less ⬆️</button>}
          </div>
        </div>
      </div>

      <div className="accordion" id="authAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Login
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#authAccordion">
            <div className="accordion-body">
              <Login setIsAuthenticated={setIsAuthenticated} />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Sign Up
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#authAccordion">
            <div className="accordion-body">
              <SignUp setIsAuthenticated={setIsAuthenticated} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
