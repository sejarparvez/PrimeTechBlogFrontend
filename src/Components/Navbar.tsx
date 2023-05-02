import { useState } from "react";

type UserProps = { title: string; paragraph: string };

function Navbar({ title, paragraph }: UserProps) {
  const [message, setMessage] = useState<string>("");

  const helloEndpoint = process.env.REACT_APP_API;

  async function submit() {
    if (helloEndpoint) {
      const response = await fetch(helloEndpoint);
      const data = await response.json();
      console.log(data);
      console.log("clicked");
      setMessage(data);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-8">
      <span className="text-6xl font-bold">{title}</span>
      <span className="text-2xl">{paragraph}</span>
      {message && <p className="text-lg">{message}</p>}
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        onClick={submit}
      >
        Say Hello
      </button>
    </div>
  );
}

export default Navbar;
