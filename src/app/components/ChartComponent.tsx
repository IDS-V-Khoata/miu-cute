"use client"; // Client Component vì Chart.js cần DOM

import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartComponentProps {
    data: ChartData<"bar">;
    options?: ChartOptions<"bar">;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, options }) => {
    return <Bar data={data} options={options} />;
};

export default ChartComponent;