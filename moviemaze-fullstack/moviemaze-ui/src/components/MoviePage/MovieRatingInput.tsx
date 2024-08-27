interface StarProps {
  value: number;
  selectedRating: number;
  onSelectRating: (value: number) => void;
}

const Star = ({ value, selectedRating, onSelectRating }: StarProps) => {
  const isFilled = value <= selectedRating;

  const handleClick = () => {
    // If the clicked star is the currently selected one, reset to zero; otherwise, set a new value
    const newRating = value === selectedRating ? 0 : value;
    onSelectRating(newRating);
  };

  return (
    <>
      <input
        type="radio"
        name="rating"
        value={value}
        className="hidden"
        checked={isFilled}
        onChange={() => {}}
      />
      <label>
        <svg
          viewBox="0 0 32 30"
          className={`w-5 h-5 cursor-pointer ${
            isFilled ? "text-yellow-400" : "text-gray-200"
          }`}
          onClick={handleClick}
        >
          <use xlinkHref="#star"></use>
        </svg>
      </label>
    </>
  );
};

export default Star;
