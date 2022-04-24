import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import GlobalStyles from "./GlobalStyles";
import Recommendations from "./Recommendations";

const App = () => {
  return (
    <Router>
      <GlobalStyles />

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/homepage" exact element={<Homepage />} />
        <Route path="/recommendations" exact element={<Recommendations />} />
      </Routes>
    </Router>
  );
};

export default App;
