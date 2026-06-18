import Hero from "../../Componets/Student/Hero";
import SearchBar from "../../Componets/Student/SearchBar";
import Companies from "../../Componets/Student/Companies";
import CouseSection from "../../Componets/Student/CouseSection";
import Testimonial from "../../Componets/Student/Testimonial";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";

function Home() {
  return (
    <div className="mx-auto">

      <Wrapper>
        <Hero />
        <SearchBar />
        <Companies />
        <CouseSection />
        <Testimonial />
        
      </Wrapper>
    </div>
  );
}

export default Home;
