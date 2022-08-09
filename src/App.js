import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<News category="general"/>} />
          <Route path="/business" element={<News category="business" />} />
          <Route path="/entertainment" element={<News category="entertainment" />} />
          <Route path="/health" element={<News category="health" />} />
          <Route path="/science" element={<News category="science" />} />
          <Route path="/sports" element={<News category="sports" />} />
          <Route path="/technology" element={<News category="technology" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
