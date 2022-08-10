import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<News category="general" apiKey={apiKey} key="general"/>} />
          <Route path="business" element={<News category="business" apiKey={apiKey} key="business"/>} />
          <Route path="entertainment" element={<News category="entertainment" apiKey={apiKey} key="entertainment"/>} />
          <Route path="health" element={<News category="health" apiKey={apiKey} key="health"/>} />
          <Route path="science" element={<News category="science" apiKey={apiKey} key="science"/>} />
          <Route path="sports" element={<News category="sports" apiKey={apiKey} key="sports"/>} />
          <Route path="technology" element={<News category="technology" apiKey={apiKey} key="technology"/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
