import { Box } from "./Form";
import Tabs, { TabItem } from "@/components/Tabs/Tabs";
import TabTranslate from "@/components/Tabs/TabTranslate";
import TabZIMDictionary from "@/components/Tabs/TabZIMDictionary";

export default function TranslateForm() {
    const tabs: TabItem[] = [
        {
            id: "translate",
            label: "Translate",
            content: (
                <TabTranslate />
            ),
        },
        {
            id: "zIMDictionary",
            label: "ZIM Dictionary",
            content: (
                <TabZIMDictionary />
            ),
        },
    ];

    return (
        <Box className="w-full max-w-6xl">
            <Tabs tabs={tabs} defaultTab="zIMDictionary" />
        </Box>
    );
}