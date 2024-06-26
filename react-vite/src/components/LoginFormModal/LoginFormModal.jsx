import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useEffect(() => {
  //   setErrors({})
  // }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setIsSubmitted(false);
      setErrors(serverResponse);
    } else {
      setIsSubmitted(false);
      closeModal();
    }
  };

  return (
    <div className="profile-dropdown-login modalContainer">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value), (errors.email = "");
            }}
            required
            className="login-email-input"
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value), (errors.password = "");
            }}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <div className="login-button-wrapper">
          <button type="submit" disabled={isSubmitted}>
            Log In
          </button>

          <button
            className="demo-button"
            type="submit"
            disabled={isSubmitted}
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}
          >
            Demo Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
