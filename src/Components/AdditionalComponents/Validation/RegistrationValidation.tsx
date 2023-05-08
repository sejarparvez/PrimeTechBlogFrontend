interface RegistrationValidationProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegistrationValidation({
  name,
  email,
  password,
  confirmPassword,
}: RegistrationValidationProps) {
  // validate input fields
  let errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  } = {};
  if (name.trim() === "") {
    errors.name = "Name is required";
  }
  if (email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }
  if (password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (confirmPassword.trim() === "") {
    errors.confirmPassword = "You need to confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
