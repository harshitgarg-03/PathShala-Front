import { useLocation } from "react-router-dom"
import type { lecture } from "../../Types";

function Showlectures() {
    const location = useLocation();
    const module = location?.state?.section
    console.log("module lecture is ", module[0].lectures);
    
    
  return (
    <div>
        {module[0].lectures.map((item: lecture) => (
          <div>
            {item.title}
          </div>
        ))}
        
        
    </div>
  )
}

export default Showlectures