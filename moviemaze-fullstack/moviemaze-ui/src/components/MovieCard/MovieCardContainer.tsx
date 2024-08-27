import { ReactNode } from "react";

// Denne fil bruges til at styre stylingen på gamecard og på gamecard skeleton, så stylingen kun behøver at finde sted, ét samlet sted

interface Props {
  children: ReactNode;
}

const MovieCardContainer = ({ children }: Props) => {
  return (
    <div className="w-[250px] bg-movieDarkestDark rounded-xl text-white shadow-[5px_5px_15px_0_rgba(0,0,0,.5)]">
      {children}
    </div>
  );
};

export default MovieCardContainer;
