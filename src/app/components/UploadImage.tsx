"use client";

import { useRef, useState } from "react";
import { Box, ButtonCustom, InputForm } from "./Form";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faImage, faUpload } from "@fortawesome/free-solid-svg-icons";

const CLOUDINARY_FOLDER = "assets/images/Image";
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

function getNameWithoutExtension(fileName: string): string {
    const lastDot = fileName.lastIndexOf(".");
    return lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
}

function sanitizePublicId(name: string): string {
    return name
        .trim()
        .replace(/[^a-zA-Z0-9_\-\u00C0-\u024F\u1E00-\u1EFF\s]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 100);
}

function getCloudinaryErrorMessage(message: string): string {
    if (message.includes("cloud_name mismatch") || message.includes("Invalid cloud_name")) {
        return "Cloud name sai. Vào Cloudinary Dashboard → Product Environment, copy đúng Cloud name vào .env.local";
    }
    if (message.includes("Upload preset not found")) {
        return "Upload preset không tồn tại. Tạo preset Unsigned tại Settings → Upload → Upload presets";
    }
    if (message.includes("Unknown API key")) {
        return "Cấu hình Cloudinary không đúng. Kiểm tra lại CLOUDINARY_CLOUD_NAME và UPLOAD_PRESET trong .env.local";
    }
    return message;
}

export default function UploadImage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imageName, setImageName] = useState("");
    const [savedPath, setSavedPath] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setImageName(getNameWithoutExtension(selectedFile.name));
        setSavedPath(null);
        setError(null);

        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target?.result as string);
        reader.readAsDataURL(selectedFile);
    };

    const removeImage = () => {
        setImage(null);
        setFile(null);
        setImageName("");
        setSavedPath(null);
        setError(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleSave = async () => {
        if (!file || isUploading || !isConfigured) return;

        const publicId = sanitizePublicId(imageName) || `image-${Date.now()}`;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET!);
            formData.append("folder", CLOUDINARY_FOLDER);
            formData.append("public_id", publicId);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    getCloudinaryErrorMessage(data.error?.message || "Upload thất bại")
                );
            }

            setSavedPath(data.secure_url);
            setImageName(publicId);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload thất bại");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box className="w-xl shadow-2xl p-4 bg-white rounded-xl">
            {!isConfigured && (
                <p className="mb-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    Thiếu cấu hình Cloudinary. Thêm vào <code>.env.local</code>:
                    <br />
                    <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...</code>
                    <br />
                    <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...</code>
                </p>
            )}

            <div className="flex flex-col items-center justify-center space-y-4 p-4 border-2 border-dashed rounded-2xl bg-white mb-4">
                {!image ? (
                    <label className="flex flex-col items-center justify-center cursor-pointer h-64 w-64 p-6 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                        <FontAwesomeIcon className="text-3xl" icon={faImage} />
                        <span className="mt-2 text-sm text-gray-500">Chọn ảnh</span>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                ) : (
                    <div className="relative">
                        <Image
                            src={image}
                            alt="Preview"
                            width={256}
                            height={256}
                            className="h-64 w-64 object-cover rounded-xl shadow-lg"
                        />
                        <button
                            onClick={removeImage}
                            className="cursor-pointer absolute top-2 right-2 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 p-1"
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </div>
                )}
            </div>

            {file && (
                <div className="flex flex-col gap-3">
                    <InputForm
                        name="imageName"
                        autoComplete="off"
                        type="text"
                        placeholder="Tên ảnh mới"
                        value={imageName}
                        changeValue={setImageName}
                    />
                    <ButtonCustom
                        primary="primary"
                        block
                        text={isUploading ? "Đang lưu..." : "Lưu ảnh"}
                        icon={faUpload}
                        handleClick={handleSave}
                    />
                </div>
            )}

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            {savedPath && (
                <p className="mt-2 text-sm text-green-600">
                    Đã lưu trên Cloudinary:{" "}
                    <a
                        href={savedPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline break-all"
                    >
                        {savedPath}
                    </a>
                </p>
            )}
        </Box>
    );
}
