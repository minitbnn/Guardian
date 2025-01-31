import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [showResults, setShowResults] = useState(false);

  const navigator = useNavigate();

  const sendLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    console.log(result);
    if (result.message === "Login successful!") {
      setSuccess("Login Successful");
      navigator("/dashboard");
    } else {
      setSuccess("Login Failed");
    }
    setShowResults(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        margin: "auto",
        marginTop: "8em",
      }}
    >
      <Header />
      {login ? (
        <>
          <h1>LOG IN</h1>
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />{" "}
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />{" "}
          <br />
          <button onClick={sendLogin}>Log In</button>
          <br />
          <button
            style={{ color: "gold", backgroundColor: "white" }}
            onClick={() => setLogin(false)}
          >
            Sign Up
          </button>
        </>
      ) : (
        <>
          <h1>Sign Up</h1>
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" name="fname" /> <br />
          <label htmlFor="email">Last Name:</label>
          <input type="text" id="lname" name="lname" /> <br />
          <label htmlFor="email">Email Address:</label>
          <input type="text" id="email" name="email" /> <br />
          <label htmlFor="company">Password:</label>
          <input type="text" id="password" name="password" /> <br />
          <button>Sign Up</button>
          <br />
          <button
            style={{ color: "gold", backgroundColor: "white" }}
            onClick={() => setLogin(true)}
          >
            Login
          </button>
        </>
      )}
      {showResults && (
        <div>
          <h1>{success}</h1>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default LoginSignup;
