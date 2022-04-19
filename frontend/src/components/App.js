import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import GlobalStyles from "./GlobalStyles";
const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
