interface Props {
  rating: number;
}

const MovieRating = ({ rating }: Props) => {
  const starPercentageStyle = {
    width: (rating * 10).toString() + "%",
  };

  return (
    <>
      <svg className="hidden">
        <symbol
          id="star"
          width="32"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.77 11.857H19.74L15.99.5l-3.782 11.357H0l9.885 6.903-3.692 11.21 9.736-7.05 9.796 6.962-3.722-11.18 9.766-6.845z"
            fill="currentColor"
          />
        </symbol>
      </svg>
      <div className="relative inline-block">
        <div className="inline-flex space-x-1 text-gray-200">
          <svg viewBox="0 0 32 30" className="w-5 h-5">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="w-5 h-5">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="w-5 h-5">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="w-5 h-5">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="w-5 h-5">
            <use xlinkHref="#star"></use>
          </svg>
        </div>
        <div
          className="absolute top-0 left-0 flex space-x-1 overflow-hidden text-yellow-400"
          style={starPercentageStyle}
        >
          <svg viewBox="0 0 32 30" className="flex-shrink-0 w-5 h-5">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="flex-shrink-0 w-5 h-5 ">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="flex-shrink-0 w-5 h-5 ">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="flex-shrink-0 w-5 h-5 ">
            <use xlinkHref="#star"></use>
          </svg>
          <svg viewBox="0 0 32 30" className="flex-shrink-0 w-5 h-5 ">
            <use xlinkHref="#star"></use>
          </svg>
        </div>
      </div>
    </>
  );
};

export default MovieRating;
