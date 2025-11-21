import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import GuestBook from "./components/GuestBook";

function App() {
  return (
    <div className="min-h-screen text-white bg-[#0A0A0B]">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <GuestBook />
      </main>
    </div>
  );
}

export default App;
