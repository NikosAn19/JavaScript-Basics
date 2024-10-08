import "./FilterMenu.css";

export default function FilterMenu() {
  return (
    <>
      <div className="search__container">
        <div className="prompt">
          Search here
          <p>Results will show every combination of the fields </p>
        </div>
        <form>
          <div className="input__box">
            <input type="text" required />
            <span>Input 1</span>
          </div>
          <div className="input__box">
            <input type="text" required />
            <span>Input 2</span>
          </div>
          <div className="input__box">
            <input type="text" required />
            <span>Input 3</span>
          </div>
          <div className="input__box">
            <input type="text" required />
            <span>Input 4</span>
          </div>
          <div className="input__box">
            <input type="text" required />
            <span>Input 5</span>
          </div>
        </form>
        <button>Search</button>
      </div>
    </>
  );
}
