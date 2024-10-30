import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingMyJobs,
    data: dataMyJobs,
    fn: fnMyJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnMyJobs();
  }, []);

  if (loadingMyJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dataMyJobs?.length ? (
        dataMyJobs.map((job) => (
          <JobCard key={job.id} job={job} onJobAction={fnMyJobs} isMyJob />
        ))
      ) : (
        <div>No Jobs Found</div>
      )}
    </div>
  );
};

export default CreatedJobs;
