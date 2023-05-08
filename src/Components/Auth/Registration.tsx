import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import RegistrationValidation from "../AdditionalComponents/Validation/RegistrationValidation";
import Button from "../Common/Button/Button";
import FormInput from "../Common/Input/FormInput";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const errors = RegistrationValidation({
      name,
      email,
      password,
      confirmPassword,
    });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    toast.promise(
      new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API}/registration`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: name,
            Email: email,
            Password: password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.UserData.Email) {
              resolve("Registration successful");
            } else {
              reject(new Error("Registration failed. Email may already exist"));
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      }),
      {
        loading: "Please wait while we register your account",
        success: "Registration Successful",
        error: "Email may already in use",
      }
    );
  };

  return (
    <div>
      <div className="mb-10 flex flex-col items-center pt-2 md:mb-0 md:min-h-screen md:pt-8">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold ">Registration</h3>
          </a>
        </div>
        <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md ring-2 ring-lime dark:bg-black sm:max-w-md sm:rounded-lg">
          <form>
            <FormInput
              label="Name"
              htmlFor="name"
              id="name"
              type="text"
              placeholder="Enter your Name"
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <FormInput
              label="Email"
              htmlFor="email"
              id="email"
              type="email"
              placeholder="Enter your email address"
              maxLength={50}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <FormInput
              label="Password"
              htmlFor="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <FormInput
              label="Confirm Password"
              htmlFor="password_confirmation"
              id="password"
              type="password"
              placeholder="Confirm your password"
              maxLength={20}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />

            <div className="mt-4 flex items-center justify-end gap-4">
              <Link to="/login">
                <span className="text-sm  underline hover:text-gray-900">
                  Already registered?
                </span>
              </Link>
              <Button Name="Register" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
