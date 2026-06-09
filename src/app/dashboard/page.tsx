"use client";

import { Box } from "@/components/Form";
import ChartComponent from "@/components/ChartComponent"
import AppLayout from "@/components/layout/AppLayout/AppLayout";
import { RenderNumber } from "@/components/RenderNumber";
import { faChartSimple, faClipboardList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChartData } from "chart.js";

export default function Dashboard() {
    // Dữ liệu cho biểu đồ
    const chartData: ChartData<"bar"> = {
        labels: ["Text Translate", "Users", 'Total Cost'],
        datasets: [
            {
                label: "Total",
                data: [1487, 1637, 1886],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(39, 174, 96, 0.6)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(39, 174, 96, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            title: { display: true, text: "Compare number of characters" },
        },
    };

    return (
        <AppLayout titlePage="Dashboard">
            <div className="flex items-center gap-8">
                <Box className="bg-linear-to-r from-cyan-500 to-blue-500 shadow-2xl p-20 border border-solid flex flex-col gap-8 flex-1 text-shadow text-[#ecf0f1] relative">
                    <div className="absolute top-0 left-4"><FontAwesomeIcon icon={faClipboardList} /> Text</div>
                    <div className="text-center">
                        {RenderNumber({ start: 0, end: 15987, duration: 1000 })}
                    </div>
                </Box>
                <Box className="bg-linear-to-bl from-violet-500 to-fuchsia-500 shadow-2xl p-20 border border-solid flex flex-col gap-8 flex-1 text-shadow text-[#ecf0f1] relative">
                    <div className="absolute top-0 left-4"><FontAwesomeIcon icon={faUsers} /> Users</div>
                    <div className="text-center">
                        {RenderNumber({ start: 0, end: 9838, duration: 2000 })}
                    </div>
                </Box>
                <Box className="bg-linear-to-bl from-green-500 to-blue-500 shadow-2xl p-20 border border-solid flex flex-col gap-8 flex-1 text-shadow text-[#ecf0f1] relative">
                    <div className="absolute top-0 left-4"><FontAwesomeIcon icon={faChartSimple} /> Total Cost</div>
                    <div className="text-center">
                        {RenderNumber({ start: 0, end: 1992, duration: 2025 })}$
                    </div>
                </Box>
            </div>
            <ChartComponent data={chartData} options={chartOptions} />
        </AppLayout>
    );
}
