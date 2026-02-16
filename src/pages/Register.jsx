import Button from "../components/Button";


function Register() {
  return (
    <div className="register-page">
        <h2>EcoLoop</h2>
      <form className="register-form">
        
        <label>
          Account Type:
          <select name="accountType">
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </select>
        </label>

        <label>
          Username:
          <input type="text" name="username" placeholder="Enter your username" />
        </label>

        <label>
          Email:
          <input type="email" name="email" placeholder="Enter your email" />
        </label>

        <label>
          Password:
          <input type="password" name="password" placeholder="Enter your password" />
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </label>

        <label className="checkbox-label">
          <input type="checkbox" name="agree" />
            I agree to the Terms and Conditions
        </label>
        <div className="register-form-btn">
        <Button text="Register" type="submit"/>
        
        </div>
      </form>
    </div>
  );
}

export default Register;
