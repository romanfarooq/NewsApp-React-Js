import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  return (
    <>
      <Navbar />
      <News pageSize={18} country="us" category="general"/>
    </>
  );
}

export default App;
