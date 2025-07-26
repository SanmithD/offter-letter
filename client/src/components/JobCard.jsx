import { ArrowRight, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <article
      tabIndex={0}
      className="group grid cursor-pointer gap-4 rounded-xl border border-slate-200 p-5 shadow-sm transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      onClick={() => navigate(`/jobDetail/${job._id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/jobDetail/${job._id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <ArrowRight
              size={20}
              className="text-indigo-600 transition-transform group-hover:translate-x-1"
            />
            {job.jobTitle}
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
            {job.company}
          </p>
        </div>
      </div>

      {/* Role preview */}
      <p className="text-sm dark:text-slate-500">
        {job.role.length > 100 ? `${job.role.slice(0, 100)}…` : job.role}
      </p>

      {/* Meta chips */}
      <div className="flex flex-wrap gap-2">
        {[job.location, job.place, job.type].map(
          (meta) =>
            meta && (
              <span
                key={meta}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
              >
                {meta}
              </span>
            )
        )}
        <span className="flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-500">
          <IndianRupee size={12} />
          {job.salary ?? "Not disclosed"}
        </span>
      </div>

      <button
        aria-label={`Apply for ${job.jobTitle}`}
        className="mt-auto w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:ring-offset-slate-900"
      >
        Apply Now
      </button>
    </article>
  );
}