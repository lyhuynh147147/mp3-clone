import React, { memo, useState, useEffect, useRef } from "react";
import bgChart from '../assets/img/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import _ from "lodash";
import path from "../ultis/path";
import icons from "../ultis/icons";
import { Link } from "react-router-dom";
import SongItem from "./SongItem";

const { BsFillPlayFill } = icons;

const ChartSection = () => {

    const [data, setData] = useState(null);
    const { chart, rank } = useSelector((state) => state.app)
    //console.log(chart);
    const [selected, setSelected] = useState(null);
    const chartRef = useRef();
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: "rgba(255,255,255,0.1)", drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: "white" },
                grid: { color: "transparent" },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0)
                            setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }
                    const rs = counters.find((i) =>
                        i.data.some(
                            (n) => n === +tooltip.body[0]?.lines[0]?.replace(".", "")
                        )
                    );
                    setSelected(rs.encodeId);
                    //   console.log(rs);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!_.isEqual(tooltipState, newTooltipData))
                        setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: "dataset",
            intersect: false,
        },
    };

    useEffect(() => {
        const labels = chart?.times
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`);
        const datasets = [];

        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: "white",
                    pointHoverRadius: 4,
                    pointBorderColor:
                        i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    pointHoverBorderWidth: 4,
                });
            }
            //console.log({ labels, datasets })
            setData({ labels, datasets });
        }
    }, [chart])

    return (
        <div className="px-[59px] mt-12 relative max-h-[450px]">
            <img src={bgChart} alt="bg-chart"
                className="w-full object-cover rounded-md max-h-[450px]" />
            <div className="absolute top-0 z-10 left-[59px] right-[59px] bottom-0 bg-[rgba(77,37,103,0.9)]"></div>
            <div className="absolute top-0 z-20 left-[59px] right-[59px] bottom-0 p-5 flex flex-col gap-8 rounded-md">
                <Link to={path.ZING_CHART} className="flex gap-2 items-center text-white hover:text-green-500">
                    <span className="chart-title  font-bold text-[40px] leading-[48px]">
                        #zingchart
                    </span>
                    <span className="p-2 rounded-full bg-white hover:bg-gray-200">
                        <BsFillPlayFill size={18} color="black" />
                    </span>
                </Link>

                <div className="flex gap-4 h-full">
                    <div className="flex-3 min-w-[300px] flex flex-col gap-2">
                        {rank?.slice(0, 3)?.map((item, index) => (
                            <SongItem
                                key={index}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                sid={item.encodeId}
                                order={index + 1}
                                percent={`${Math.round(
                                    (+item.score * 100) / +chart?.totalScore
                                )}%`}
                                style="bg-[hsla(0,0%,100%,.07)] hover:bg-[#643f7a] text-white"
                            />
                        ))}
                        <Link
                            to={path.ZING_CHART}
                            className="text-white px-4 py-2 rounded-l-full rounded-r-full m-auto border border-white w-fit"
                        >
                            Xem thêm
                        </Link>

                    </div>
                    <div className="flex-7 h-[90%] relative min-w-[650px]">
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipState.top,
                                left: tooltipState.left,
                                opacity: tooltipState.opacity,
                                position: "absolute",
                            }}
                        >
                            <SongItem
                                thumbnail={
                                    rank?.find((i) => i.encodeId === selected)?.thumbnail
                                }
                                title={rank?.find((i) => i.encodeId === selected)?.title}
                                artists={
                                    rank?.find((i) => i.encodeId === selected)?.artistsNames
                                }
                                sid={rank?.find((i) => i.encodeId === selected)?.encodeId}
                                percent={`${Math.round(
                                    (+rank?.find((i) => i.encodeId === selected)?.score * 100) /
                                    +chart?.totalScore
                                )}%`}
                                style="bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default memo(ChartSection)