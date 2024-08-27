import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const TrailerCardContainer = ({ children }: Props) => {
  return <div className="w-[390px] rounded-xl text-white">{children}</div>;
};

export default TrailerCardContainer;
