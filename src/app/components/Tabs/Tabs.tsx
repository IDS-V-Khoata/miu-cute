"use client";

import React, { useState } from "react";

export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    defaultTab,
    className = "",
}) => {
    const firstTab = defaultTab || tabs[0]?.id;

    const [activeTab, setActiveTab] = useState<string>(firstTab);

    return (
        <div className={`w-full ${className}`}>
            {/* Header */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-lg transition-all duration-200 border-b-2 cursor-pointer
                                ${isActive
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-blue-500"
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="py-4">
                {tabs.map((tab) => {
                    if (tab.id !== activeTab) return null;
                    return (
                        <div key={tab.id}>
                            {tab.content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tabs;