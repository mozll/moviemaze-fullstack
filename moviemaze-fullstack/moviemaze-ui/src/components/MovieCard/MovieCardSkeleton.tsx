const MovieCardSkeleton = () => {
  return (
    <div className="h-[400px] md:h-[250px]">
      {" "}
      {/* card */}
      <div className="h-[80%] bg-movieDarkestDark rounded-xl ">
        {" "}
        {/* skeleton */}
        <section>
          {" "}
          {/* card body */}
          <p></p>
        </section>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
