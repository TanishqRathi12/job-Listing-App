const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold text-blue-600 mb-4">
          Loading...
        </div>
        <div className="w-12 h-12 border-t-4 border-blue-600 rounded-full border-solid animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
