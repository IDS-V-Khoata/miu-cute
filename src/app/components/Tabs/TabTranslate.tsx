"use client";

import { faLanguage, faTextSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Box } from "@/components/Form";

const GOOGLE_LANGUAGE_CODES = [
    { value: "af", label: "Afrikaans" },
    { value: "sq", label: "Albanian" },
    { value: "am", label: "Amharic" },
    { value: "ar", label: "Arabic" },
    { value: "hy", label: "Armenian" },
    { value: "az", label: "Azerbaijani" },
    { value: "eu", label: "Basque" },
    { value: "be", label: "Belarusian" },
    { value: "bn", label: "Bengali" },
    { value: "bs", label: "Bosnian" },
    { value: "bg", label: "Bulgarian" },
    { value: "ca", label: "Catalan" },
    { value: "ceb", label: "Cebuano" },
    { value: "ny", label: "Chichewa" },
    { value: "zh-CN", label: "Chinese (Simplified)" },
    { value: "zh-TW", label: "Chinese (Traditional)" },
    { value: "co", label: "Corsican" },
    { value: "hr", label: "Croatian" },
    { value: "cs", label: "Czech" },
    { value: "da", label: "Danish" },
    { value: "nl", label: "Dutch" },
    { value: "en", label: "English" },
    { value: "eo", label: "Esperanto" },
    { value: "et", label: "Estonian" },
    { value: "tl", label: "Filipino" },
    { value: "fi", label: "Finnish" },
    { value: "fr", label: "French" },
    { value: "fy", label: "Frisian" },
    { value: "gl", label: "Galician" },
    { value: "ka", label: "Georgian" },
    { value: "de", label: "German" },
    { value: "el", label: "Greek" },
    { value: "gu", label: "Gujarati" },
    { value: "ht", label: "Haitian Creole" },
    { value: "ha", label: "Hausa" },
    { value: "haw", label: "Hawaiian" },
    { value: "iw", label: "Hebrew" },
    { value: "hi", label: "Hindi" },
    { value: "hmn", label: "Hmong" },
    { value: "hu", label: "Hungarian" },
    { value: "is", label: "Icelandic" },
    { value: "ig", label: "Igbo" },
    { value: "id", label: "Indonesian" },
    { value: "ga", label: "Irish" },
    { value: "it", label: "Italian" },
    { value: "ja", label: "Japanese" },
    { value: "jw", label: "Javanese" },
    { value: "kn", label: "Kannada" },
    { value: "kk", label: "Kazakh" },
    { value: "km", label: "Khmer" },
    { value: "ko", label: "Korean" },
    { value: "ku", label: "Kurdish (Kurmanji)" },
    { value: "ky", label: "Kyrgyz" },
    { value: "lo", label: "Lao" },
    { value: "la", label: "Latin" },
    { value: "lv", label: "Latvian" },
    { value: "lt", label: "Lithuanian" },
    { value: "lb", label: "Luxembourgish" },
    { value: "mk", label: "Macedonian" },
    { value: "mg", label: "Malagasy" },
    { value: "ms", label: "Malay" },
    { value: "ml", label: "Malayalam" },
    { value: "mt", label: "Maltese" },
    { value: "mi", label: "Maori" },
    { value: "mr", label: "Marathi" },
    { value: "mn", label: "Mongolian" },
    { value: "my", label: "Myanmar (Burmese)" },
    { value: "ne", label: "Nepali" },
    { value: "no", label: "Norwegian" },
    { value: "ps", label: "Pashto" },
    { value: "fa", label: "Persian" },
    { value: "pl", label: "Polish" },
    { value: "pt", label: "Portuguese" },
    { value: "pa", label: "Punjabi" },
    { value: "ro", label: "Romanian" },
    { value: "ru", label: "Russian" },
    { value: "sm", label: "Samoan" },
    { value: "gd", label: "Scots Gaelic" },
    { value: "sr", label: "Serbian" },
    { value: "st", label: "Sesotho" },
    { value: "sn", label: "Shona" },
    { value: "sd", label: "Sindhi" },
    { value: "si", label: "Sinhala" },
    { value: "sk", label: "Slovak" },
    { value: "sl", label: "Slovenian" },
    { value: "so", label: "Somali" },
    { value: "es", label: "Spanish" },
    { value: "su", label: "Sundanese" },
    { value: "sw", label: "Swahili" },
    { value: "sv", label: "Swedish" },
    { value: "tg", label: "Tajik" },
    { value: "ta", label: "Tamil" },
    { value: "te", label: "Telugu" },
    { value: "th", label: "Thai" },
    { value: "tr", label: "Turkish" },
    { value: "uk", label: "Ukrainian" },
    { value: "ur", label: "Urdu" },
    { value: "uz", label: "Uzbek" },
    { value: "vi", label: "Vietnamese" },
    { value: "cy", label: "Welsh" },
    { value: "xh", label: "Xhosa" },
    { value: "yi", label: "Yiddish" },
    { value: "yo", label: "Yoruba" },
    { value: "zu", label: "Zulu" },
] as const;

export { GOOGLE_LANGUAGE_CODES };

export default function TabTranslate() {
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [targetLang, setTargetLang] = useState("en");
    const [nameTtargetLang, setNameTtargetLang] = useState("English");
    const [error, setError] = useState("");

    const handleTranslate = async () => {
        try {
            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText, targetLang: targetLang }),
            });

            const data = await res.json();
            if (res.ok) {
                setTranslatedText(data.translatedText);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error ===> :", error);
        }
    };


    const handleResetContent = () => {
        setInputText("");
        setTranslatedText("");
        setError("");
    };

    const handleSetTargetLang = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setTargetLang(e.target.value);
        const lang = GOOGLE_LANGUAGE_CODES.find((lang) => lang.value === e.target.value);
        if (lang) {
            setNameTtargetLang(lang.label);
        }
    }

    return (
        <Box className="w-full max-w-6xl mt-4">
            <div className="flex gap-6">
                <Box className="bg-white shadow-xl p-8 border border-solid flex flex-col gap-4 flex-1">
                    <label htmlFor="txtVN" className="font-bold">Vietnamese</label>
                    <textarea
                        className="w-full border-0 outline-0 resize-none flex-1 text-sm font-medium"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Nhập văn bản cần dịch"
                        rows={5}
                        id="txtVN"
                    ></textarea>
                </Box>
                <Box className="bg-white shadow-xl p-8 border border-solid flex flex-col gap-4 flex-1">
                    <label htmlFor="txtRes" className="font-bold">{nameTtargetLang}</label>
                    <textarea
                        className="w-full border-0 outline-0 resize-none flex-1 text-sm font-medium cursor-default"
                        value={translatedText}
                        readOnly
                        placeholder="Văn bản đã dịch sẽ hiển thị ở đây"
                        rows={5}
                        id="txtRes"
                    ></textarea>
                </Box>
            </div>
            <div className="flex items-center gap-4 mt-8">
                <select
                    value={targetLang}
                    onChange={(e) => handleSetTargetLang(e)}
                    className="p-2 h-10 border rounded-lg bg-green-500 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-700 hover:bg-green-600 transition"
                >
                    {
                        GOOGLE_LANGUAGE_CODES.map((lang) => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                        ))
                    }
                </select>
                <button
                    onClick={handleTranslate}
                    className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 w-50"
                >
                    <FontAwesomeIcon icon={faLanguage} className="w-5" /> Translate
                </button>
                <button
                    onClick={handleResetContent}
                    className="bg-red-500 text-white p-2 rounded-md cursor-pointer hover:bg-red-600 w-50"
                >
                    <FontAwesomeIcon icon={faTextSlash} className="w-5" /> Reset
                </button>
                {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
            </div>
        </Box>
    );
}