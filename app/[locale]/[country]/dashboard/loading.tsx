export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-orange-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping rounded-full h-14 w-14 bg-orange-500 opacity-50"></div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-4xl font-extrabold text-orange-500 tracking-wide">
              QAWAFEL
            </p>
            <p className="mt-2 text-lg text-gray-500 animate-pulse">
              Loading, please wait...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
