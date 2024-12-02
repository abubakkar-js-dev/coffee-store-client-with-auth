import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SignUp = () => {
    const {createUser,setUser,loginWithGoogle} = useContext(AuthContext);

    const handleAuth = (method,userData,form='')=>{
        try{
          fetch('https://coffee-store-server-seven-ashy.vercel.app/auth/signIn',{
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({method, ...userData})
          })
          .then(res => res.json())
          .then(data => {
            if(data.insertedId){
              if(method === 'emailWithPassword' && form){
                form.reset();
                alert(`You have signed Up successfully with ${method}`);
              }else{
                alert(`You have signed Up successfully with ${method}`);
              }
            }
          })
        }catch(err){
          console.log(err);
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email,password)
        .then(result => {
            setUser(result.user);

            // add user to database
            const newUser = {name,email,insertedAt: result?.user?.metadata?.creationTime};
            handleAuth('emailWithPassword',newUser,form);
        })
        .catch(err=>{
            const errorMessage = err.message;
            console.log(errorMessage);
        })

    }

    const handleGoogleLogin = ()=>{
        loginWithGoogle()
        .then((result)=>{
            console.log('login successful with google.');
            const newUser = {name: result?.user?.displayName, email: result?.user?.email, insertedAt: result?.user?.metadata?.creationTime};
            setUser(result.user);
            handleAuth('loginWithGoogle',newUser);
        })
        .catch(err =>{
            const errorCode = err.code;
            console.log(errorCode);
        })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your name"
                autoComplete="name"
                required
              />
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your email"
                autoComplete="email"
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
              Sign Up
            </button>
          </form>
  
          {/* Divider */}
          <div className="divider mt-6">OR</div>
  
          {/* Google Sign-In */}
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.77 12.283c0-.794-.071-1.558-.2-2.296H12.18v4.342h6.568c-.286 1.47-1.139 2.715-2.428 3.562v2.956h3.918c2.293-2.11 3.607-5.221 3.607-8.564z" />
              <path d="M12.18 23.573c3.278 0 6.028-1.088 8.037-2.964l-3.917-2.956c-1.085.728-2.485 1.163-4.12 1.163-3.16 0-5.834-2.133-6.793-4.992H1.371v3.13c2.004 4.04 6.15 6.619 10.809 6.619z" />
              <path d="M5.387 14.824a6.967 6.967 0 0 1-.362-2.117c0-.736.131-1.448.362-2.118v-3.13H1.371A11.408 11.408 0 0 0 0 12.706c0 1.928.47 3.745 1.371 5.295l4.016-3.177z" />
              <path d="M12.18 4.856c1.782 0 3.38.61 4.646 1.811l3.485-3.485C18.205 1.02 15.455 0 12.18 0 7.522 0 3.377 2.579 1.371 6.618l4.016 3.177c.959-2.86 3.633-4.939 6.793-4.939z" />
            </svg>
            Sign in with Google
          </button>
          <label className="label">
            <p>Already have an account? <Link to={'/signIn'} className="text-blue-400"> Sign In</Link></p>
          </label>
        </div>
      </div>
    );
};

export default SignUp;