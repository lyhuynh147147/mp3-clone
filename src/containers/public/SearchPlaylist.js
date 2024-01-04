import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiGetArtist } from '../../apis';
import { SectionItem } from '../../components';

const SearchPlaylist = () => {

  const { searchData } = useSelector((state) => state.music);
  const [playlists, setPlaylists] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const response = await apiGetArtist(searchData?.top?.alias);
      if (response.data.err === 0) {
        setPlaylists(response.data.data.sections[1]);
      }
    };
    fetch();
  }, [searchData]);

  return (
    <div className="w-full flex-col flex gap-8 px-[46px]">
      <h3 className="text-lg font-bold mb-5 ml-[14px]">Playlist/Album</h3>
      <div className="flex items-start flex-wrap justify-start gap-7 ">
        {playlists?.items?.map((item, index) => (
          <SectionItem
            key={index}
            //key={item?.encodeId}
            //data={item}
            title={item?.title}
            link={item?.link}
            sortDescription={item?.sortDescription}
            thumbnailM={item?.thumbnailM} />
        ))}
      </div>
    </div>
  );
}

export default SearchPlaylist