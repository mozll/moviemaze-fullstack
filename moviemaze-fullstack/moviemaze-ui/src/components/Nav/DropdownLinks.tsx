import { Link } from "react-router-dom";

type Link = {
  label: string;
  href: string;
};

const DropdownLinks: React.FC<{ links: Link[] }> = ({ links }) => {
  return (
    <>
      <div
        className="absolute z-10 mr-32 mt-2 w-44 shadow-md bg-white divide-y divide-gray-100 dark:bg-movieLightDark dark:divide-movieMediumGreen"
        style={{ top: "100%" }}
      >
        {links.map((link: Link, index) => {
          return (
            <ul className=" text-sm py-2 text-gray-700 dark:text-gray-200">
              <li key={index}>
                <Link
                  to={link.href}
                  className="block py-2 hover:underline hover:underline-offset-8"
                >
                  {link.label}
                </Link>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default DropdownLinks;
