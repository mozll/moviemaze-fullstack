import coverPicture from "../../assets/images/coverPicture.png";
const CoverPicture = () => {
  return (
    <>
      <img
        src={coverPicture}
        alt="Cover Picture"
        className="object-cover w-full h-96"
      ></img>
    </>
  );
};

export default CoverPicture;
