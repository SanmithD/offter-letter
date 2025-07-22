import { BriefcaseBusinessIcon, File, Home, User2Icon } from "lucide-react"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="container h-fit py-3 md:mx-6 lg:mx-6" >
      <div className="flex justify-around items-center " >
        <div className="flex flex-col justify-center items-center gap-1 " >
          <Link to='/'><Home/> </Link>
          <p>Home</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 ">
          <Link to='/jobs'><BriefcaseBusinessIcon/> </Link>
          <p>Jobs</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 ">
          <Link to='/appliedJobs'><File/> </Link>
          <p>Application</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 ">
          <Link to='/profile'><User2Icon/> </Link>
          <p>Profile</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar