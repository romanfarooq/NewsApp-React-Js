import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<News category="general" key="general"/>} />
          <Route path="/business" element={<News category="business" key="business"/>} />
          <Route path="/entertainment" element={<News category="entertainment" key="entertainment"/>} />
          <Route path="/health" element={<News category="health" key="health"/>} />
          <Route path="/science" element={<News category="science" key="science"/>} />
          <Route path="/sports" element={<News category="sports" key="sports"/>} />
          <Route path="/technology" element={<News category="technology" key="technology"/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
