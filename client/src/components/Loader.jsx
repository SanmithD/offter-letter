import { Loader as Loading } from "lucide-react";

function Loader() {
  return (
    <div className="container h-screen flex justify-center items-center ">
      <Loading className="size-15 md:size-20 lg:size-20 animate-spin transition-all duration-1000" />
    </div>
  );
}

export default Loader;
