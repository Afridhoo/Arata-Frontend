export default function LoadingData() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-black font-semibold uppercase tracking-widest">
          Loading...
        </p>
      </div>
    </div>
  );
}
