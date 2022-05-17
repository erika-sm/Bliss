import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <Router>
      <GlobalStyles />

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/main" exact element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
