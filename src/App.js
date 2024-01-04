import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Album, Home, Login, Personal, Public, WeekRank, ZingChart, Search, SearchSongs, SearchAll, SearchArtist, SearchPlaylist, Singer } from "./containers/public";
import { Route, Routes } from "react-router-dom";
import path from "./ultis/path";
import { useEffect, useState } from "react";
import * as actions from './store/actions';
import { apiGetChartHome } from "./apis";



function App() {

  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);
  const [currentWidth, setCurrentWidth] = useState(window.innerHeight);

  useEffect(() => {
    dispatch(actions.getHome())

    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      console.log(response);
      if (response.data.err === 0) setWeekChart(response.data.data.weekChart);

      //if (response.data.err === 0) setChartData(response.data.data);
    };

    fetchChartData();
  }, [])

  const setWidth = (e) => {
    setCurrentWidth(e.target.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route
              path={path.WEEKRANK__TITLE__PID}
              element={
                <WeekRank weekChart={weekChart && Object.values(weekChart)} />
              }
            />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.HOME__ARTIST__SINGER} element={<Singer />} />
            <Route path={path.SEARCH} element={<Search />} >
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONGS} element={<SearchSongs />} />
              <Route path={path.ARTIST} element={<SearchArtist />} />
              <Route path={path.PLAYLIST} element={<SearchPlaylist />} />
            </Route>

          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
