import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  sid,
  order,
  percent,
  style,
  size,
}) => {

  const releaseDateInSeconds = releaseDate;
  const releaseDateMoment = moment.unix(releaseDateInSeconds);

  const currentDate = moment();

  const minutesDifference = currentDate.diff(releaseDateMoment, "minutes");
  const hoursDifference = currentDate.diff(releaseDateMoment, "hours");
  const daysDifference = currentDate.diff(releaseDateMoment, "days");
  const weeksDifference = currentDate.diff(releaseDateMoment, "weeks");

  let formattedReleaseDate;

  if (minutesDifference < 60) {
    formattedReleaseDate = `${minutesDifference} phút trước`;
  } else if (hoursDifference < 24) {
    formattedReleaseDate = `${hoursDifference} giờ trước`;
  } else if (daysDifference < 1) {
    formattedReleaseDate = "hôm qua";
  } else if (daysDifference < 7) {
    formattedReleaseDate = `${daysDifference} ngày trước`;
  } else if (weeksDifference === 1) {
    formattedReleaseDate = "1 tuần trước";
  } else if (weeksDifference > 1) {
    formattedReleaseDate = `${weeksDifference} tuần trước`;
  } else {
    formattedReleaseDate = releaseDateMoment.format("DD/MM/YYYY");
  }

  const dispatch = useDispatch();

  return (
    <div
      className={`w-full flex p-[10px] gap-[10px] cursor-pointer rounded-md justify-between items-center ${style ||
        "hover:bg-main-200"
        }`}
    >
      <div className="flex gap-4">
        {order && (
          <span
            className={`${order === 1
              ? "text-shadow-no1"
              : order === 2
                ? "text-shadow-no2"
                : "text-shadow-no3"
              } text-[rgba(75,37,103,.95)] text-[32px] m-auto`}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt={title}
          className={`${size || "w-[60px] h-[60px]"
            } object-cover rounded-md cursor-pointer`}
          onClick={() => {
            dispatch(actions.setCurSongId(sid));
            dispatch(actions.play(true));
            //dispatch(actions.setRecentSong({ thumbnail, title, sid, artists }));
            dispatch(actions.setRecent({ thumbnail, title, sid, artists }));
          }}
        />
        <div className='flex flex-col justify-center'>
          <span className='text-sm font-semibold opacity-90'>
            {title?.length > 30 ? `${title?.slice(0, 25)}...` : title}
          </span>
          <span className='text-xs opacity-70'>
            {artists?.length > 30 ? `${artists?.slice(0, 25)}...` : artists}
          </span>
          {/* <span className="text-xs text-gray-500">{moment(releaseDate * 1000 ).fromNow()}</span> */}
          {releaseDate && (
            <span className="text-xs opacity-70">
              {formattedReleaseDate}
            </span>
          )}
        </div>
      </div>
      {percent && <span className="font-bold">{percent}</span>}
    </div>
  )
}
export default memo(SongItem);