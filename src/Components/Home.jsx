import axios from "axios";
import { useEffect, useState } from "react";
import "../CSS/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    getMovies();
  }, []);

  const [getMovie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getMovies = async () => {
    const response = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?quality=3D"
    );
    console.log(response.data.data.movies);
    setMovie(response.data.data.movies);
    setLoading(false);
  };

  return (
    <>
      {loading == true && (
        <>
          <div className="loading-div p-1">
            <div className="inner-loading-div">..</div>
          </div>
        </>
      )}
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
              className="hover:cursor-pointer hover:text-red-800 "
              onClick={() => {
                navigate("/");
              }}
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

      <div className="flex justify-center p-[65px]">
        <div className="w-[920px]">
          <p className="text-[#ccc] text-[0.95em] flex flex-col items-center ">
            <p
              className="text-[#fff] font-semibold text-[40px]"
              style={{ letterSpacing: "-.03em" }}
            >
              {" "}
              Download YTS YIFY movies: HD smallest size
            </p>
            <div>
              {" "}
              Welcome to the official YTS.MX website. Here you can browse and
              download YIFY movies in excellent
            </div>

            <div>
              720p,1080p ,2160p 4K and 3D quality,all at the smallest file size.
              YTS movies Torrents
            </div>
            <div className="text-[#428bca] font-bold">
              IMPORTANT - YTS.MX is the only new official domain for YIFY Movies
            </div>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div>
          <div
            className="text-[16px] text-[#fff]"
            style={{ letterSpacing: "-.03em" }}
          >
            Latest YIFY Movies Torrents{" "}
          </div>
          <div className="grid  text-white grid-cols-4 w-[73em] gap-10 p-5  ">
            {getMovie.map((movie) => {
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
      </div>
    </>
  );
};
export default Home;
