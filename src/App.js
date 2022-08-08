import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<News pageSize={18} country="us" category="general"/>}/>
          <Route path="business" element={<News pageSize={18} country="us" category="business"/>}/>
          <Route path="entertainment" element={<News pageSize={18} country="us" category="entertainment"/>}/>
          <Route path="health" element={<News pageSize={18} country="us" category="health"/>}/>
          <Route path="science" element={<News pageSize={18} country="us" category="science"/>}/>
          <Route path="sports" element={<News pageSize={18} country="us" category="sports"/>}/>
          <Route path="technology" element={<News pageSize={18} country="us" category="technology"/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
