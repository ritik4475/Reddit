import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useUser } from "./Utils/hooks/useUser";
import ProfileLogo from "./assets/icons/profile_logo2.png";
import RoutesPage from "./Routes";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    // Check if the current pathname includes 'login' or 'signup'
    setShowNavbar(
      !window.location.pathname.includes("login") &&
        !window.location.pathname.includes("signup")
    );
  }, []);

  return (
    <>
      {showNavbar && (
        <div className="grid grid-cols-4 mb-1 items-center bg-white p-1">
          <div className="ml-5 font-extrabold text-orange-500 text-2xl">
            <a href="/"> Read_it</a>
          </div>
          <input
            type="search"
            placeholder="Search Reddit"
            className=" h-10 p-3 ml-6 w-80 bg-[#E0E7F1] border-none rounded-full"
          />
          <div></div>
          <div className="flex">
            {window.location.pathname === "/" && (
              <a href="/create-post">
                <button className="text-md font-semibold flex justify-center items-center mt-1 border border-orange-500 rounded-lg p-1 shadow-md shadow-orange-500">
                  <span className=" text-orange-500">
                    <FiPlus size={20} />
                  </span>
                  Create
                </button>
              </a>
            )}

            <div className="w-40 ml-6">
              <div className="flex items-center justify-center">
                <div className="ml-2">
                  {user ? (
                    <a href="/profile">
                      <div className="flex rounded-md h-10 bg-orange-100">
                        <img
                          src={ProfileLogo}
                          className="h-12 w-9 pt-2"
                          alt="profile-logo"
                        />
                        <p className=" text-sm text-gray-700 font-semibold pr-2 pt-2">
                          u/{user.userName}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <a href="/login">
                      <button className="text-lg font-bold text-white px-2 py-1 rounded-lg bg-blue-500">
                        LogIn
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/**routes of the app */}
      <RoutesPage />
    </>
  );
}

export default App;
