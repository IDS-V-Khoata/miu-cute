"use client";

import { useState } from "react";
import { Box } from "@/components/Form";
import { BiSearchAlt } from "react-icons/bi";

export default function TabZIMDictionary() {
    const [inputText, setInputText] = useState("Suddenly");

    return (
        <Box className="w-full max-w-6xl mt-4">
            <Box className="bg-white shadow-xl p-4 border border-solid rounded-2xl flex items-center flex-1 gap-4">
                <input
                    className="w-full border-0 outline-0 resize-none flex-1 text-sm font-medium"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Tìm từ Tiếng Anh"
                    id="txtVN"
                />
                <BiSearchAlt size={24} className="cursor-pointer text-gray-500" />
            </Box>
            <div className="text-center p-8">
                <h2 className="text-4xl font-extrabold">{inputText}</h2>
            </div>
            <div className="flex w-full gap-8 items-center">
                <div className="flex gap-4 items-center flex-1">
                    <h3 className="font-bold">Suddenly</h3>
                    <div className="flex items-center flex-1">
                        <span className="px-4 py-2 rounded-4xl bg-cyan-400 text-sm text-gray-500">Adverb</span>
                        <div className="text-xl h-1  bg-cyan-400 flex-1 rounded-e-4xl"></div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p>Diễn ra rất nhanh, bất ngờ và hầu như không có cảnh báo trước.</p>
                <p>Happening quickly and with little or no warning in a sudden manner.</p>
            </div>
            <div className="mt-4 bg-amber-100 p-4 rounded-lg">
                <p>Example: The car stopped <span className="text-cyan-600 font-bold">suddenly</span>.</p>
                <p>Ví dụ: Chiếc xe dừng đột ngột.</p>
            </div>
            <h4 className="text-xl font-bold mt-6 mb-2">Từ tiếng Việt đồng nghĩa</h4>
            <div className="flex items-center gap-4 flex-wrap">
                <span className="px-4 py-2 rounded-4xl bg-gray-200 text-sm text-gray-500">Đột nhiên</span>
                <span className="px-4 py-2 rounded-4xl bg-gray-200 text-sm text-gray-500">Bất ngờ</span>
            </div>
        </Box >
    );
}