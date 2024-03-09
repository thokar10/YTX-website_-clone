import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Home.css";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const BrowseMovies = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(true);
  const [movies, setMovie] = useState([]);

  const [paginationArray, setArray] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    getMovies();
  }, []);

  const matchFunction = (value) => {
    setValue(value);
    getMovies(value);
  };

  const addPage = () => {
    console.log(paginationArray);
    let pageData = paginationArray;
    for (let i = 0; i < pageData.length; i++) {
      pageData[i] += 1;
    }

    setArray(pageData);

    console.log(paginationArray);
  };

  console.log(paginationArray);
  const deletePage = () => {};

  const getMovies = async (arrayValue) => {
    const response = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?page=${arrayValue}`
    );
    console.log(response.data.data.movies);
    setMovie(response.data.data.movies);
    setLoading(false);
  };

  const searchMovies = async () => {
    const response = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?quality=1080p&genre=Action"
    );
    console.log(response);
  };

  return (
    <>
      <div>
        {loading == true && (
          <>
            <div className="loading-div p-1">
              <div className="inner-loading-div">..</div>
            </div>
          </>
        )}
      </div>
      <div className="bg-[#1d1d1d] p-5 flex items-center gap-7  justify-around">
        <div className="flex items-center gap-3">
          <span>
            <img
              className="h-[40px] w-[110px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Logo-YTS.svg/640px-Logo-YTS.svg.png"
            />
          </span>
          <p className="text-[#919191] text-[18px] font-serif">
            HD movies at the smallest file size
          </p>
        </div>
        <div>
          <div className="search flex text-[#919191] items-center gap-5">
            <input
              type="search"
              placeholder="quick search"
              className="bg-[#1d1d1d] w-[250px] h-[35px] text-[0.85em] pl-[31px]"
            />
            <p
              onClick={() => {
                navigate("/");
              }}
              className="hover:cursor-pointer hover:text-red-800"
            >
              Home
            </p>
            <p
              onClick={() => {
                navigate("/browse");
              }}
              className="hover:cursor-pointer hover:text-red-800"
            >
              Browse Movies
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[55rem]">
          <form>
            <div>
              <label className="text-[#5a5a5a] text-[1.35em] my-[10px]">
                Search Term:
              </label>
              <div className="flex gap-4 ">
                <input
                  className="w-[100%] bg-[#282828] h-[40px] text-[#8a8989]"
                  type="text"
                />
                <input
                  type="button"
                  value="Search"
                  className="  text-white hover:cursor-pointer  bg-[#6ac045] px-5 rounded-[3px]"
                  onClick={searchMovies}
                />
              </div>
              <div className="grid grid-cols-4 p-4">
                <div>
                  <label className="text-[#5a5a5a]">Quality:</label>
                  <div>
                    <select className="bg-[#282828] text-[#5a5a5a]">
                      <option>480p</option>
                      <option>720p</option>
                      <option>1080p</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[#5a5a5a]">Genre:</label>
                  <div>
                    <select className="bg-[#282828] text-[#5a5a5a] ">
                      <option>Action</option>
                      <option>Adventure</option>
                      <option>Animation</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className=" text-[#6ac045] flex justify-center pt-12">
        <p className="text-[x-large]"> YIFY Movies </p>
      </div>

      <div className="flex justify-center">
        <div className="flex gap-4 hover:cursor-pointer text-white p-8  ">
          <span className="flex items-center">
            <MdKeyboardDoubleArrowLeft onClick={deletePage} />
          </span>
          {paginationArray.map((arrayValue) => {
            return (
              <>
                <div
                  onClick={() => {
                    matchFunction(arrayValue);
                  }}
                >
                  {value === arrayValue ? (
                    <>
                      <div className="bg-green-700 w-[26px] text-center text-[20px]">
                        {arrayValue}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[20px]">{arrayValue}</div>
                    </>
                  )}
                </div>
              </>
            );
          })}
          <span className="flex items-center" onClick={addPage}>
            <MdKeyboardDoubleArrowRight />
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid  text-white grid-cols-4 w-[73em] gap-10 p-5  ">
          {movies.map((movie) => {
            return (
              <>
                <div className="border-white border-[px] flex flex-col items-center gap-5 p-3">
                  <img
                    className=" image w-[217px] h-[300px]"
                    src={movie.large_cover_image}
                  />

                  <div className="text-center"> {movie.title_long}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BrowseMovies;
