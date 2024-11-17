import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function AuthenticationPage({ setIsAuthenticated }) {
  return (
    <div className="relative authentication-page full-height y-center">
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
