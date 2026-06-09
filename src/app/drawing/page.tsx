import DrawingCanvas from "@/components/DrawingCanvas";
import { Box } from "../components/Form";
import AppLayout from "@/components/layout/AppLayout/AppLayout";

export default function Drawing() {

    return (
        <AppLayout titlePage="Drawing">
            <Box className="flex flex-col gap-8 w-full items-center justify-center">
                <DrawingCanvas />
            </Box>
        </AppLayout>
    );
}