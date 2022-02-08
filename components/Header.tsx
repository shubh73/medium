import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="/logo.png"
            alt=""
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5 cursor-pointer">
          <h3 className="active:scale-90 transition duration-100">About</h3>
          <h3 className="active:scale-90 transition duration-100">Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full active:scale-90 transition duration-100">
            Follow
          </h3>
        </div>
      </div>

      <div className="hidden sm:flex items-center space-x-5 text-green-600 cursor-pointer">
        <h3 className="active:scale-90 transition duration-100">Sign In</h3>
        <h3 className="px-4 py-1 rounded-full border border-green-600 active:scale-90 transition duration-100">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
