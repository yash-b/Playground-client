import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Webcam from "./pages/Webcam";
import SmsPage from "./pages/SmsPage";
// import CountryInfo from "./pages/CountryInfo";
import ContactMe from "./pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webcam" element={<Webcam />} />
        <Route path="/sms" element={<SmsPage />} />
        {/* <Route path="/countryinfo" element={<CountryInfo />} /> */}
        <Route path="/contactme" element={<ContactMe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;