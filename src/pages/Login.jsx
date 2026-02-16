import Button from "../components/Button";


function Login() {
  return (
    <div className="register-page">
        <h2>EcoLoop</h2>
      <form className="register-form">  

        <label>
          Email:
          <input type="email" name="email" placeholder="Enter your email" />
        </label>

        <label>
          Password:
          <input type="password" name="password" placeholder="Enter your password" />
        </label>

        <a>Forgot Password?</a>

        <div className="register-form-btn">
        <Button text="Log In" type="submit"/>
        
        </div>
      </form>
    </div>
  );
}

export default Login;
