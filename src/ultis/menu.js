import icons from "./icons"

const { MdOutlineLibraryMusic, MdOutlineFeed, TbChartArcs, HiOutlineChartPie } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icons: <MdOutlineLibraryMusic size={24} />
    },
    {
        path: '',
        text: 'Khám phá',
        end: true,
        icons: <TbChartArcs size={24} />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icons: <HiOutlineChartPie size={24} />
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icons: <MdOutlineFeed size={24} />
    },
];

export const searchMenu = [
    {
        path: "tat-ca",
        text: "TẤT CẢ",
    },
    {
        path: "bai-hat",
        text: "BÀI HÁT",
    },
    {
        path: "playlist",
        text: "PLAYLIST/ALBUM",
    },
    {
        path: "artist",
        text: "NGHỆ SĨ/OA",
    },
    {
        path: "video",
        text: "MV",
    },
];