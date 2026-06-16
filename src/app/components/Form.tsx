"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconType } from "react-icons";

interface ButtonCustomProps {
    text: string;
    primary?: "primary" | "secondary" | "darkyellow";
    size?: 'small' | 'medium' | 'large';
    block?: boolean;
    handleClick: () => void;
    icon?: IconProp | IconType;
}

export const ButtonCustom = React.memo(({ text, primary, size, block, icon, handleClick }: ButtonCustomProps) => {
    const bgColor = primary === "primary" ? 'bg-darkcharcoal hover:bg-black/70 text-lightyellow' : primary === "secondary" ? 'bg-[#e0e5ec] hover:shadow-[inset_4px_4px_10px_#bec3cf,inset_-4px_-4px_10px_#ffffff] text-[#3d4468] shadow-[4px_4px_20px_#bec3cf,-8px_-8px_20px_#ffffff]' : primary === "darkyellow" ? "bg-darkcharcoal text-lightyellow shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border-lightyellow hover:bg-darkcharcoal/80" : 'bg-gray-500 hover:bg-gray-600 text-white';
    const hButton = size === 'small' ? 'h-8 text-sm' : size === 'large' ? 'h-10 text-xl' : 'h-9 text-xl';
    const wButton = block ? 'w-full' : 'w-auto';

    return (
        <button
            onClick={handleClick}
            className={`${bgColor} ${hButton} ${wButton} rounded border border-solid transition-colors flex items-center justify-center gap-1 cursor-pointer px-3 ${icon ? "font-light" : "font-bold"}`}
        >
            {icon && (
                typeof icon === "function"
                    ? React.createElement(icon, { className: "w-[16px]" })
                    : <FontAwesomeIcon icon={icon} className="w-[16px]" />
            )}
            {text}
        </button>
    )
});

ButtonCustom.displayName = 'ButtonCustom';

interface InputCustomProps {
    id?: string;
    name: string;
    autoComplete: string;
    type: string;
    placeholder: string;
    value: string;
    icon?: IconProp;
    positionIcon?: "left" | "right";
    changeValue: (value: string) => void;
}

export const InputCustom = React.memo(({ id, name, autoComplete, type, placeholder, value, icon, positionIcon = "left", changeValue }: InputCustomProps) => {
    return (
        <div className={`${positionIcon !== "left" ? "pl-4" : "pr-4"} w-full relative flex items-center rounded-lg bg-[#e5eaf3]
              shadow-[inset_8px_8px_16px_#bec3cf,inset_-8px_-8px_16px_#ffffff] py-1`}>
            <div className={`${positionIcon !== "left" ? "order-0" : "order-2"} bg-[#e5eaf3] flex items-center justify-center rounded shadow-[4px_4px_10px_#bec3cf,-4px_-4px_10px_#ffffff] min-w-8 h-8`}>
                {icon && <FontAwesomeIcon icon={icon} className="text-[#9499b7]" />}
            </div>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => changeValue(e.target.value)}
                autoComplete={autoComplete}
                className="order-1 w-full rounded outline-none hover:border-[#95a5a6] h-12 px-4 sm:px-5 autofill:bg-transparent bg-transparent text-[#9499b7]"
            />
        </div>
    )
});

InputCustom.displayName = 'InputCustom';
interface InputPassWordProps {
    placeholder: string;
    value: string;
    changeValue: (value: string) => void;
}

export const InputPassWordCustom = React.memo(({ placeholder, value, changeValue }: InputPassWordProps) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className="bg-[#e5eaf3] rounded-lg border border-solid outline-none pl-4 sm:px-4 py-1 shadow-[inset_8px_8px_16px_#bec3cf,inset_-8px_-8px_16px_#ffffff] flex items-center justify-between">
            <div className="bg-[#e5eaf3] flex items-center justify-center rounded shadow-[4px_4px_10px_#bec3cf,-4px_-4px_10px_#ffffff] min-w-8 h-8">
                {isHidden ? <FontAwesomeIcon icon={faEye} className="cursor-pointer text-[#9499b7]" onClick={() => setIsHidden(false)} /> : <FontAwesomeIcon icon={faEyeSlash} className="cursor-pointer text-[#9499b7]" onClick={() => setIsHidden(true)} />}
            </div>
            <input
                type={`${isHidden ? 'password' : 'text'}`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => changeValue(e.target.value)}
                className={`${isHidden && value.trim() !== '' ? 'text-3xl' : 'text'} text-[#9499b7] px-4 w-full h-12 outline-none autofill:bg-transparent bg-transparent flex-1`}
                autoComplete="new-password"
            />
        </div>
    )
});

InputPassWordCustom.displayName = 'InputPassWordCustom';

interface InputFormProps {
    id?: string;
    name: string;
    autoComplete: string;
    type: string;
    placeholder: string;
    value: string;
    icon?: IconProp;
    changeValue: (value: string) => void;
}

export const InputForm = React.memo(({ id, name, autoComplete, type, placeholder, value, icon, changeValue }: InputFormProps) => {
    return (
        <div className="w-full relative flex items-center rounded border border-gray-200 ">
            {icon && <div className="bg-[#e5eaf3] flex items-center justify-center rounded shadow-[4px_4px_10px_#bec3cf,-4px_-4px_10px_#ffffff] w-8 h-8">
                <FontAwesomeIcon icon={icon} className="text-[#9499b7]" />
            </div>}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => changeValue(e.target.value)}
                autoComplete={autoComplete}
                className="w-full rounded outline-none hover:border-[#95a5a6] h-10 px-2 text-[#9499b7]"
            />
        </div>
    )
});

InputForm.displayName = 'InputForm';

interface InputCheckBoxProps {
    value: boolean;
    label: string | IconProp | "";
    changeValue: (value: boolean) => void;
}

export const CheckBoxCustom = React.memo(({ value, label, changeValue }: InputCheckBoxProps) => {
    const renderLabel = () => {
        if (typeof label === "string") {
            return <label htmlFor="remember-login" className="cursor-pointer">{label}</label>
            // return <span className={`${isActive ? "font-semibold" : "text-gray-500"}`}>{label}</span>;
        }

        return (
            <FontAwesomeIcon icon={label} className="w-6 text-[22px]" />
        );
    };
    return (
        <div className="flex items-center gap-4">
            <input type="checkbox" name="" id="remember-login" className="h-5 w-5 rounded cursor-pointer" onChange={(e) => changeValue(e.target.checked)} checked={value} />
            {/* <label htmlFor="remember-login" className="cursor-pointer">{label}</label> */}
            {renderLabel()}
        </div>
    )
});

CheckBoxCustom.displayName = 'CheckBoxCustom';

interface RadioOption {
    label: string | IconProp;
    value: string | number;
}

interface RadioGroupProps {
    name: string;
    value: string | number;
    isRow?: boolean;
    options: RadioOption[];
    onChange: (value: string | number) => void;
}

export const RadioGroup = React.memo(({
    name,
    value,
    isRow = true,
    options,
    onChange
}: RadioGroupProps) => {
    const renderLabel = (label: string | IconProp, isActive: boolean) => {
        if (typeof label === "string") {
            return <span className={`${isActive ? "font-semibold" : "text-gray-500"
                }`}>{label}</span>;
        }

        return (
            <FontAwesomeIcon
                icon={label}
                className="w-6 text-[22px]"
            />
        );
    };

    return (
        <div className={`flex ${isRow ? 'flex-row gap-8' : 'flex-col gap-2'}`}>
            {options.map((option) => {
                const isActive = value === option.value;
                return (
                    <label
                        key={option.value}
                        className={`${isActive ? "text-darkcharcoal" : "text-gray-500"} flex items-center gap-2 cursor-pointer`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="h-5 w-5 cursor-pointer"
                        />
                        {renderLabel(option.label, isActive)}
                    </label>
                )
            })}
        </div >
    );
});

RadioGroup.displayName = 'RadioGroup';

interface BoxProps {
    children?: React.ReactNode;
    className?: string;
}

export const Box = React.memo(({ children, className = "" }: BoxProps) => {
    return (
        <div className={`${className} rounded border border-solid border-gray-200`} >
            {!!children && children}
        </div>
    )
});

Box.displayName = 'Box';