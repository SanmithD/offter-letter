import { ArrowLeft, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({name}) {
    const navigate = useNavigate();
  return (
    <div className="flex md:hidden lg:hidden justify-between items-center mb-4 mx-auto ">
        <div className="flex items-center" >
          <h1 className="text-2xl flex items-center cursor-pointer">
            {" "}
            <span onClick={() => navigate(-1)}>
              <ArrowLeft className="size-7" />
            </span>{" "}
           {name}
          </h1>
        </div>
        <button onClick={()=>navigate('/help')} className="flex items-center gap-2 text-[20px] font-medium " >
            Get Help By <span><Brain/></span>
        </button>
        </div>
  )
}

export default Header