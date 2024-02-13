import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

function Home() {
  return (
    <div className="d-flex flex-column max-w-full vh-100 overflow-x-hidden bg-[#31304D]">
      <Navbar></Navbar>
      <Hero></Hero>
    </div>
  );
}

export default Home;
