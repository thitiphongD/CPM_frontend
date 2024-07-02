import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-white text-4xl font-bold mb-6 text-center">
        Crypto Portfolio Manager
      </h2>
      <div className="bg-[#232323] border p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-customYellow hover:bg-hoverYellow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Login
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-white hover:text-gray-300"
              href={{
                pathname: "/register",
              }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
