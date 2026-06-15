import DrawingCanvas from "@/components/DrawingCanvas";
import { Box } from "@/components/Form";

export default function Drawing() {
    return (
        <Box className="flex flex-col gap-8 w-full items-center justify-center">
            <DrawingCanvas />
        </Box>
    );
}
