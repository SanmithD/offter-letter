import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container px-3 " >
      <div className="h-fit py-3 flex justify-between items-center " >
        <div className=" flex justify-center items-center" >
          <img src="vite.svg" alt="logo" className="size-[30px] md:size-[50px] lg:size-[50px] " />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold " >OfferLetter</h1>
        <div className="place-content-end" >
          <p>Help ?</p>
        </div>
      </div>
      <div className="px-4 my-[100px] md:my-[70px] lg:my-[50px] flex justify-center items-center flex-col" >
        <div className="text-3xl md:text-6xl lg:text-7xl mb-[100px] " >Welcome to Offer Letter</div>
        <div className="flex md:w-[400px] lg:w-[400px] h-fit border-1 px-6 py-3 rounded-2xl " >
          <div className="form w-full font-medium text-[20px] space-y-3 " >
            <label className="label w-full ">
              <input type="text" name="username" placeholder="username..." className="outline-0 border-b-1 w-full " />
            </label>
            <label className="label w-full ">
              <input type="email" name="email" placeholder="email..." className="outline-0 border-b-1 w-full " />
            </label>
            <label className="label w-full flex justify-between ">
              <span className="flex justify-between items-center" > 
              <input type={showPassword ? "text" : "password"} name="username" placeholder="username..." className="outline-0 border-b-1 w-full " />
              <button onClick={()=>setShowPassword(!showPassword)} className="cursor-pointer place-content-end ml-[80px] " >{ showPassword ? <EyeOff/> : <Eye/> } </button>
              </span>
            </label>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup