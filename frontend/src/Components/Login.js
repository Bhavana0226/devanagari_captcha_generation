import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
// import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { FiRefreshCw } from "react-icons/fi";
import { BiSpaceBar } from "react-icons/bi";
import { HiOutlineBackspace } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [entered_captcha, setentered_captcha] = useState("");
  const [captchaURL, setCaptchaURL] = useState("");
  // const devnagari_chars = [
  //   "अ",
  //   "आ",
  //   "इ",
  //   "ई",
  //   "उ",
  //   "ऊ",
  //   "ए",
  //   "ऐ",
  //   "ओ",
  //   "औ",
  //   "क",
  //   "ख",
  //   "ग",
  //   "घ",
  //   "च",
  //   "छ",
  //   "ज",
  //   "झ",
  //   "ट",
  //   "ठ",
  //   "ड",
  //   "ढ",
  //   "त",
  //   "थ",
  //   "द",
  //   "ध",
  //   "न",
  //   "प",
  //   "फ",
  //   "ब",
  //   "भ",
  //   "म",
  //   "य",
  //   "र",
  //   "ल",
  //   "व",
  //   "श",
  //   "ष",
  //   "स",
  //   "ह",
  //   "क्ष",
  //   "त्र",
  //   "ज्ञ",
  // ];

  const buttons = [
    { label: "अ", value: "अ" },
    { label: "आ", value: "आ" },
    { label: "इ", value: "इ" },
    { label: "ई", value: "ई" },
    { label: "उ", value: "उ" },
    { label: "ऊ", value: "ऊ" },
    { label: "ए", value: "ए" },
    { label: "ऐ", value: "ऐ" },
    { label: "ओ", value: "ओ" },
    { label: "औ", value: "औ" },
    { label: "क", value: "क" },
    { label: "ख", value: "ख" },
    { label: "ग", value: "ग" },
    { label: "घ", value: "घ" },
    { label: "च", value: "च" },
    { label: "छ", value: "छ" },
    { label: "ज", value: "ज" },
    { label: "झ", value: "झ" },
    { label: "ट", value: "ट" },
    { label: "ठ", value: "ठ" },
    { label: "ड", value: "ड" },
    { label: "ढ", value: "ढ" },
    { label: "त", value: "त" },
    { label: "थ", value: "थ" },
    { label: "द", value: "द" },
    { label: "ध", value: "ध" },
    { label: "न", value: "न" },
    { label: "प", value: "प" },
    { label: "फ", value: "फ" },
    { label: "ब", value: "ब" },
    { label: "भ", value: "भ" },
    { label: "म", value: "म" },
    { label: "य", value: "य" },
    { label: "र", value: "र" },
    { label: "ल", value: "ल" },
    { label: "व", value: "व" },
    { label: "श", value: "श" },
    { label: "ष", value: "ष" },
    { label: "स", value: "स" },
    { label: "ह", value: "ह" },
    { label: "क्ष", value: "क्ष" },
    { label: "त्र", value: "त्र" },
    { label: "ज्ञ", value: "ज्ञ" },
    { label: <BiSpaceBar size={30} />, value: " " },
    { label: <HiOutlineBackspace size={30} />, value: "", delete: true },
  ];

  function handleKeyPress(key) {
    setentered_captcha((prevValue) => prevValue + key);
  }

  const fetchCaptcha = () => {
    axios
      .get("http://localhost:5000/generate_captcha")
      .then((response) => {
        // console.log(response.data);
        setCaptcha(response.data.captcha);
        setCaptchaURL(
          `http://localhost:5000/uploads/${response.data.captcha}.png`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCaptcha();

    // const textarea = document.querySelector("textarea");
    // const keyboard = document.querySelector(".keyboard");

    // devnagari_chars.forEach((char) => {
    //   const button = document.createElement("button");
    //   button.textContent = char;
    //   button.addEventListener("click", () => {
    //     textarea.value += char;
    //   });
    //   keyboard.appendChild(button);
    // });
  }, []);

  const handleSubmit = () => {
    let postData = {
      email: email,
      password: password,
    };
    if (entered_captcha === captcha) {
      axios
        .post("http://localhost:5000/login_user", postData)
        .then((response) => {
          console.log(response.data);
          let data = { name: response.data.name, email: response.data.email };
          if (response.data.login_status === "success") {
            alert("Logged in  Successfully");
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/home");
          } else {
            alert("Incorrect Credentials");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form id="login">
      <h3 className="text-center">Login</h3>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          className="form-control"
          id="password"
          value={password}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group mt-2 pt-2">
        <div className="container">
          <div className="row">
            <div
              className="col-6
            "
            >
              <div className="row">
                <div className="col-8">
                  <img
                    src={captchaURL}
                    className="captcha"
                    id="captchasrc"
                    alt="captcha"
                  ></img>
                </div>
                <div className="col-3 mt-4">
                  <FiRefreshCw
                    onClick={() => {
                      fetchCaptcha();
                      setentered_captcha("");
                    }}
                    size={30}
                  />
                </div>
                {/* <div className="col-4 refresh-captcha"></div> */}
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="entered_captcha">Enter Captcha:</label>

                    <input
                      className="form-control"
                      id="entered_captcha"
                      value={entered_captcha}
                      onChange={(e) => setentered_captcha(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="container">
                <div className="row keyboard">
                  {/* {devnagari_chars.map((char) => (
                    <div className="col">
                      <button
                        key={char}
                        // className="keyboard-btn"
                        onClick={() => handleKeyPress(char)}
                      >
                        {char}
                      </button>
                    </div>
                  ))} */}

                  {buttons.map((obj) => {
                    return (
                      <div className="col">
                        <button
                          key={obj.label}
                          // className="keyboard-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              obj.delete !== undefined &&
                              obj.delete === true
                            ) {
                              setentered_captcha((prevValue) =>
                                prevValue.slice(0, -1)
                              );
                            } else {
                              handleKeyPress(obj.value);
                            }
                          }}
                        >
                          {obj.label}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-1"
        onClick={(e) => {
          e.preventDefault();
          console.log("Entered Captcha : ", entered_captcha);
          console.log(" Captcha : ", captcha);
          handleSubmit()
        }}
      >
        Submit
      </button>
    </form>
    // <form
    //   class="row g-3 login-form"
    //   action="{{ url_for('login')}}"
    //   method="post"
    //   id="login"
    // >
    //   <div class="col-md-12">
    //     <label for="email" class="form-label">
    //       Email
    //     </label>
    //     <input
    //       type="email"
    //       class="form-control"
    //       id="email"
    //       name="email"
    //       placeholder="Email"
    //       Required
    //     />
    //   </div>
    //   <div class="col-md-12">
    //     <label for="password" class="form-label">
    //       Password
    //     </label>
    //     <input
    //       type="password"
    //       class="form-control"
    //       id="password"
    //       name="password"
    //       placeholder="Password"
    //       Required
    //     />
    //   </div>
    //   <div class="col-12">
    //     <button type="submit" class="btn btn-primary">
    //       Login
    //     </button>
    //   </div>
    // </form>
  );
}

export default Login;
