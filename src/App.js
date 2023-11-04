import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./Blog/BlogList";
import SingleBlog from "./Blog/SingleBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blogDetails/:id" element={<SingleBlog />} />
        <Route path="/blogList" element={<BlogList />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </Router>
  );
}

export default App;
