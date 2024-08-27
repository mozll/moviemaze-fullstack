import { useParams } from "react-router-dom";

const User = () => {
  const { slug } = useParams();
  return (
    <>
      <div className="bg-[#1A1B27]">
        <p className="text-white">User: {slug}</p>
      </div>
    </>
  );
};

export default User;
