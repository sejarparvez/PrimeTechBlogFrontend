import Eye from "@iconscout/react-unicons/icons/uil-eye";
import UilEye from "@iconscout/react-unicons/icons/uil-eye-slash";
import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import LoginValidation from "../AdditionalComponents/Validation/LoginValidation";
import FormInput from "../Common/Input/FormInput";

export default function Login() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [redirect, setRedirect] = useState(false);

  async function login(ev: { preventDefault: () => void }) {
    ev.preventDefault();
    const errors = LoginValidation({
      email,
      password,
    });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    toast.loading("Fetching user info");
    const response = await fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    toast.dismiss();

    if (response.ok) {
      response.json().then((data) => {
        setUserInfo(data);

        alert("Login Successful");
        setRedirect(true);
      });
    } else {
      toast.error("Wrong email or password");
    }
  }

  useEffect(() => {
    if (userInfo) {
      fetch(`${process.env.REACT_APP_API}/profile`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((userInfo) => {
          setUserInfo(userInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [setUserInfo, userInfo]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="relative my-6 flex flex-col justify-center overflow-hidden md:my-0 md:min-h-screen ">
      <div className="ring-primary-200 m-auto w-full rounded-md bg-white p-6 shadow-2xl ring-2 ring-lime dark:bg-black dark:text-white lg:max-w-xl">
        <h1 className="text-primary-200 text-center text-3xl font-semibold uppercase underline decoration-wavy">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={login}>
          <FormInput
            label="Email"
            htmlFor="email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            maxLength={30}
            error={errors.email}
            placeholder={""}
            id={""}
          />
          <div className="relative">
            <FormInput
              label="Password"
              htmlFor="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              maxLength={20}
              error={errors.password}
              placeholder={""}
              id={""}
            />
            <span
              className="  absolute right-0 top-10 mr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <UilEye />}
            </span>
          </div>

          <a href="#s" className="text-xs hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full transform rounded-md bg-black px-4 py-2 tracking-wide text-white hover:bg-gray-600 focus:bg-gray-800 dark:bg-gray-700">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xl font-light ">
          Don't have an account?{" "}
          <Link to="/registration">
            <span className="font-bold hover:underline dark:text-white">
              Sign up
            </span>
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}
