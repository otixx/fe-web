type SkeletonTableProps = {
  totalId?: boolean;
};
const SkeletonTable = (totalTd: SkeletonTableProps) => {
  return (
    <>
      <div
        role="status"
        className="w-full animate-pulse space-y-4 divide-y divide-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          {totalTd?.totalId && (
            <>
              <div>
                <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div>
                <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </>
          )}
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonTable;
