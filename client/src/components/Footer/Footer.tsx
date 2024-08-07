import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-neutral-100">
      <div className="container">
        <div>
          <Link to="/" className="font-bold text-green-500 underline">
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
