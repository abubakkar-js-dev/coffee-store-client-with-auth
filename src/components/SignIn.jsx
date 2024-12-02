 import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SignIn = () => {

  const {signInUser} = useContext(AuthContext);

  const handleSubmit = (e)=>{
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email,password)

    signInUser(email,password)
    .then(result => {
      console.log(result.user);

      // update last login
      const lastSignInTime = result?.user?.metadata?.lastSignInTime;
      const loginInfo = {email,lastSignInTime};

      fetch('https://coffee-store-server-seven-ashy.vercel.app/users',{
        method: "PATCH",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      .then(res => res.json())
      .then(data => {
        console.log('Sign in info updated in db',data);
      })

    })
    .catch(err => {
      console.log(err.message)
    })
    

  }
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your email"
                required
              />
            </div>
  
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your password"
                required
              />
            </div>
  
            {/* Sign up Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              Sign In
            </button>
          </form>
  
          <label className="label">
            <p>Don't have an account? <Link to={'/sign-up'} className="text-blue-400"> Sign Up</Link></p>
          </label>
        </div>
      </div>
    );
};

export default SignIn;