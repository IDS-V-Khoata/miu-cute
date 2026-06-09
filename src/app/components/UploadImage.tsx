import { useState } from "react";
import { Box } from "./Form";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage } from "@fortawesome/free-solid-svg-icons";

export default function UploadImage() {
    const [image, setImage] = useState<string | null>(null);
    const [nameImage, setImageName] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            setImageName(file.name);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImageName(null);
    };

    return (
        <Box className="w-xl shadow-2xl p-4 bg-white rounded-xl">
            <div className="flex flex-col items-center justify-center space-y-4 p-4 border-2 border-dashed rounded-2xl bg-white mb-2">
                {!image ? (
                    <label className="flex flex-col items-center justify-center cursor-pointer h-64 w-64 p-6 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                        <FontAwesomeIcon className="text-3xl" icon={faImage} />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                ) : (
                    <div className="relative">
                        <Image src={image} alt="Preview" width={50} height={50} className="h-64 w-64 object-cover rounded-xl shadow-lg" />
                        <button onClick={removeImage} className="cursor-pointer absolute top-2 right-2 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </div>
                )}
            </div>
            <span>{nameImage ?? "Name iamge"}</span>
        </Box>
    );
}
