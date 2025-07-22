export const ProfilePic = () => {
  <div className="flex w-full flex-col gap-4">
    <div className="flex items-center gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
    <div className="skeleton h-32 w-full"></div>
  </div>;
};

export const DetailsSkeleton = () =>{
  <div className="skeleton h-32 w-full"></div>
}

export const UserDetailSkeleton = () =>{
  <div className="skeleton h-32 w-full"></div>
}