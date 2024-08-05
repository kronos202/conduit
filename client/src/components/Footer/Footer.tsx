import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 py-4 bottom-0 absolute w-full">
      <div className="container">
        <div>
          <Link to="/" className="font-bold underline text-green-500">
            conduit
          </Link>{" "}
          An interactive learning project from Thinkster. Code & design licensed
          under MIT.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
