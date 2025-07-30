import { Squirrel } from "lucide-react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center" >
        <div className="flex flex-col justify-center items-center space-y-6" >
        <Squirrel className="size-30 md:size-50 hover:text-blue-500 transition-colors duration-500 " />
        <h1 className="text-2xl font-medium" >Page not Found</h1>
        <Link to="/" className="cursor-pointer text-[18px] " >Back to home</Link>
        </div>
    </div>
  )
}

export default NotFound