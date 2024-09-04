import React from "react";

export default function login() {
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Dramaku</h1>
          <form action="login.html" method="post" className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Sign in
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Sign in with Google
              </button>
            </div>
            <div>
              Don't have an account?
              <a href="register.html" className="text-blue-500">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
