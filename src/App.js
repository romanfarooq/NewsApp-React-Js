import Navbar from "./components/Navbar";
import News from "./components/News";

function App() {
  return (
    <>
      <Navbar />
      <News pageSize={18}/>
    </>
  );
}

export default App;
