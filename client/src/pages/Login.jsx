import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UserStore";

function Login() {
  const navigate = useNavigate();
  const { isLogin, login } = UseAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async() =>{
    await login(formData);
      navigate('/');
  }

  return (
    <div className="container px-3 " >
      <div className="h-fit py-3 flex justify-between items-center " >
        <div className=" flex justify-center items-center" >
          <img src="offerLogo.png" alt="logo" className="size-[30px] md:size-[50px] lg:size-[50px] " />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold " >OfferLetter</h1>
        <div className="place-content-end" >
          <p>Help ?</p>
        </div>
      </div>
      <div className="px-4 my-[100px] md:my-[70px] lg:my-[50px] flex justify-center items-center flex-col" >
        <div className="text-2xl md:text-6xl lg:text-7xl mb-[50px] " >Welcome back to Offer Letter</div>
        <div className="flex md:w-[400px] lg:w-[400px] h-fit border-1 px-6 py-3 rounded-2xl " >
          <div className="form w-full font-medium text-[20px] space-y-5 my-4 " >
            <label className="label w-full ">
              <input type="email" name="email" placeholder="email..." value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="outline-0 border-b-1 w-full " />
            </label>
            <label className="label w-full flex justify-between ">
              <span className="flex justify-between items-center" > 
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="password..." className="outline-0 border-b-1 w-full " />
              <button onClick={()=>setShowPassword(!showPassword)} className="cursor-pointer place-content-end ml-[80px] " >{ showPassword ? <EyeOff/> : <Eye/> } </button>
              </span>
            </label>
            <div className="flex flex-col space-y-2.5 " >
              <Link to='/signup' className="text-[16px] font-medium text-blue-500" >Don't have account ?</Link>
              <button onClick={handleLogin} className="font-bold text-2xl w-full rounded-2xl px-4 py-2 hover:bg-blue-800 active:bg-blue-950 cursor-pointer bg-blue-500 " >{ isLogin ? "Logging..." : "Login" } </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login