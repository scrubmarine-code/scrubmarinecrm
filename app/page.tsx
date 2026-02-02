export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      {/* Red Header Section */}
      <div className="w-full bg-[#e53935] py-16 flex flex-col items-center justify-center">
        {/* Boat Icon */}
        <div className="mb-4">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M32 8L24 24H16L8 36H56L48 24H40L32 8Z" 
              fill="currentColor"
            />
            <path 
              d="M8 36V40C8 48 16 56 32 56C48 56 56 48 56 40V36H8Z" 
              fill="currentColor"
            />
          </svg>
        </div>
        {/* Title */}
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wider">
          SCRUBMARINE.CA
        </h1>
        {/* Tagline */}
        <p className="text-white/90 text-xs tracking-widest mt-2 uppercase">
          Hull Cleaning • Diving Services
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-lg px-6 -mt-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div className="bg-gray-800 h-2 rounded-full w-1/5"></div>
          </div>

          {/* Form Fields */}
          <form className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
