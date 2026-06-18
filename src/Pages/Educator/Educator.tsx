import { Outlet } from "react-router-dom";
import NavBar from "../../Componets/Educator/NavBar";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";

function Educator() {
  return (
    <div>
      <NavBar />
      <Wrapper>{<Outlet />}</Wrapper>
    </div>
  );
}

export default Educator;
