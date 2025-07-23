import { useState } from "react";
import { UseJobStore } from "../store/UseJobStore";

function Apply(jobId) {
  const { isApplying, applyJob } = UseJobStore();
  const [applyData, setApplyData] = useState({
    expectedSalary: "",
    noticePeriod: "",
  });

  const handleApply = async () => {
    console.log(applyData);
    await applyJob(jobId, applyData);
  };

  return (
    <div className="container w-full">
      <div className="flex justify-self-start items-center flex-col ">
        <div className="py-2.5 px-2 flex justify-between flex-col ">
          <h1 className="text-[20px] font-bold text-left ">Expected Salary</h1>
          <input
            type="text"
            className="border-1 rounded-lg outline-cyan-500 font-light text-[20px] pl-3 py-1.5 "
            name="expectedSalary"
            value={applyData.expectedSalary}
            onChange={(e) =>
              setApplyData({ ...applyData, expectedSalary: e.target.value })
            }
          />
        </div>
        <div className="w-fit py-2.5 px-2 flex justify-between flex-col">
          <h1 className="text-[20px] text-left font-bold ">Notice Period</h1>
          <input
            type="text"
            className="border-1 rounded-lg outline-cyan-500 font-light text-[20px] pl-3 py-1.5 "
            name="noticePeriod"
            onChange={(e) =>
              setApplyData({ ...applyData, noticePeriod: e.target.value })
            }
          />
        </div>
        <div className="modal-action ">
          <form
            method="dialog"
            className="w-full flex justify-between items-center gap-3 "
          >
            <button className="btn font-bold text-2xl px-3.5 py-1.5 ">
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="btn bg-blue-500 text-2xl font-bold hover:bg-blue-700 active:bg-blue-800 px-3.5 py-1.5 "
            >
              {isApplying ? "Applying..." : "Apply"}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Apply;
