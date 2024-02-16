// import { Link } from "react-router-dom";
import HungryHeartDark from "../assets/Images/hungry_heart_logo.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LogIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(username, password)

    fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      
      username: username,
      password: password,

      // username: 'kminchelle',
      // password: '0lelplR',
      // expiresInMins: 60, // optional
    })
  })
  .then(res => res.json())
  .then((data) => {
    console.log({data});
    
    if(data?.token){
      localStorage.setItem("token", data?.token)
      navigate("/home")
      
      
    }

  }
    )
  .catch(error => console.log("error", error.message))

  }

  return (
    
    <div style={{ background:"linear-gradient(180deg, hsla(160, 93%, 49%, 1) 0%, hsla(201, 82%, 51%, 1) 100%)"}}>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8 ">
        <div style={{background:"white", width:"320px", margin:"auto", borderRadius:"10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm py-6">
          <img style={{height:"50px", width:"100px", margin:"auto"}}
            className="mx-auto h-52 scale-150"
            src={HungryHeartDark}
            alt="Hungry Heart"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 py-3">
            Sign in to your account
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm px-6 py-6">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter you username"
                  required
                  value={username}
                  onChange={handleUsernameChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter you password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                <button
                type="submit"
                onClick={handlesubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
            </div>
          </form>

          
        </div>
        </div>
      </div>
    </div>
      
    
  );
}

export default LogIn;
