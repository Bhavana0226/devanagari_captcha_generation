import "./App.css";
import Form from "./Components/Form";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container main-form">
          <h3 class="title">DEVNAGARI CAPTCHA GENERATOR</h3>
          <Routes>
            <Route  exact path="/" element={<Form/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/home" element={<Home/>} />
            {/* <Route component={NotFound} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
