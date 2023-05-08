import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Linkedin from "@iconscout/react-unicons/icons/uil-linkedin";
import Twitter from "@iconscout/react-unicons/icons/uil-twitter";

function Footer() {
  return (
    <footer className="divide-y bg-white px-4 dark:bg-black dark:text-gray-100">
      <div className="container mx-auto flex flex-col justify-between space-y-8 py-10 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a
            rel="noopener noreferrer"
            href="#a"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full dark:bg-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="h-5 w-5 flex-shrink-0 rounded-full dark:text-gray-900"
              >
                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
              </svg>
            </div>
            <span className="self-center text-2xl font-semibold">
              Brand name
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 text-sm sm:grid-cols-4 lg:w-2/3">
          <div className="space-y-3">
            <h3 className="uppercase tracking-wide dark:text-gray-50">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Features
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Integrations
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Pricing
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase tracking-wide dark:text-gray-50">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Privacy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-50">Developers</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Public API
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Documentation
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#a">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-50">Social media</div>
            <div className="flex justify-start space-x-3">
              <Facebook />
              <Twitter />
              <Linkedin />
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-center text-sm dark:text-gray-400">
        © 1968 Company Co. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
