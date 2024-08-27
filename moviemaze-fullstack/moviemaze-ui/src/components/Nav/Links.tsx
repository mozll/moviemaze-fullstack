import { Link } from "react-router-dom";

type Link = {
  label: string;
  href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
  return (
    <div className="links-container justify-evenly hidden md:flex">
      {links.map((link: Link, index) => {
        return (
          <div
            key={index}
            className="justify-evenly mx-6 text-lg text-white hover:underline hover:underline-offset-8"
          >
            <Link to={link.href}>{link.label}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Links;
