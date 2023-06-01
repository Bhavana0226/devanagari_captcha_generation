import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setuser(JSON.parse(storedData));
      console.log(user);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="text-center">Welcome {user.name}</h2>

        <div className="row m-3 ">
          <div className="col-10"></div>
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <p>
          We're thrilled to have you here and hope that you find our community
          engaging and helpful. Please feel free to explore our website and
          discover all the features and resources we have to offer. If you have
          any questions or concerns, don't hesitate to reach out to our support
          team. We're here to assist you and ensure that your experience with us
          is a positive one. Again, welcome and thank you for joining us!
        </p>
      </div>
    </div>
  );
};

export default Home;
