const Navigation = () => {
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-white p-4 lg:px-44">
        <div className="flex items-center mb-2 lg:mb-0">
          <img
            src="/briefcase 1.png"
            alt="briefcase png"
            className="mr-2 w-6 h-6 lg:w-8 lg:h-8"
          />
          <p className="font-semibold text-lg lg:text-xl">RemoteJobs</p>
        </div>
        <div className="flex items-center">
          <img
            src="/BellRinging.png"
            alt="Bell png"
            className="mr-2 w-5 h-5 lg:w-6 lg:h-6"
          />
          <img
            src="/Ellipse 18.png"
            alt="png"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
          />
        </div>
      </nav>
      <hr className="border-gray-300" />
    </>
  );
};

export default Navigation;
