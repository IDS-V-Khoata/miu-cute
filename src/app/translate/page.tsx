import TranslateForm from "@/components/Translate";
import AppLayout from "@/components/layout/AppLayout/AppLayout";
import { Box } from "../components/Form";

export default function Translate() {
    return (
        <AppLayout titlePage="Translate">
            <Box className="flex flex-col gap-8 w-full items-center justify-center">
                <TranslateForm />
            </Box>
        </AppLayout>
    );
}