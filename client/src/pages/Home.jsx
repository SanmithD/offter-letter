import { Brain } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";
import { UseJobStore } from "../store/UseJobStore";

export default function Home() {
  const navigate = useNavigate();
  const { getJobs, job: jobs, isLoading } = UseJobStore();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Mobile title */}
      <h1 className="mb-6 text-center text-2xl font-semibold md:hidden">
        OFFER LETTER
      </h1>

      {/* AI Help CTA */}
      <button
        onClick={() => navigate("/help")}
        className="group mb-8 inline-flex items-center gap-2 rounded-lg border-2 border-indigo-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 bg-clip-text px-4 py-2 text-lg font-medium text-transparent transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        Get Help by AI
        <Brain className="h-5 w-5 text-indigo-500 transition-transform group-hover:rotate-12" />
      </button>

      <h2 className="mb-6 border-b border-slate-300 pb-2 text-2xl font-bold tracking-tight md:text-3xl">
        All Jobs
      </h2>

      {isLoading ? (
        <HomeSkeleton />
      ) : Array.isArray(jobs) && jobs.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <JobCard key={j._id} job={j} />
          ))}
        </section>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400">
          No jobs found.
        </p>
      )}
    </main>
  );
}