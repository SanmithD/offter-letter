import { Check } from "lucide-react";
import { useState } from "react";
import { UseAgentStore } from "../store/UseAgentStore";

const FILTERS = [
  { id: "onsite", label: "Onsite" },
  { id: "hybrid", label: "Hybrid" },
  { id: "remote", label: "Remote" },
];

function Filters() {
  const [active, setActive] = useState(null);
  const { filterOnsite, filterRemote, filterHybrid } = UseAgentStore();

  const handleOnsite = async() =>{
    await filterOnsite();
  }

  const handleHybrid = async() =>{
    await filterHybrid();
  }

  const handleRemote = async() =>{
    await filterRemote();
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center gap-2">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={active === id}
            onClick={() => {setActive(id), id === 'onsite' ? handleOnsite : null, id === 'hybrid' ? handleHybrid : null, id === 'remote' ? handleRemote : null }}
            className={`flex items-center gap-1 border px-4 py-1.5 rounded-md font-bold text-[20px] 
              hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${active === id ? "border-blue-500" : "border-gray-300"}`}
          >
            {label} {active === id && <Check />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
