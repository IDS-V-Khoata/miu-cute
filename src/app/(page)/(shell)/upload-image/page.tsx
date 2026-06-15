import UploadImage from "@/components/UploadImage";
import { Box } from "@/components/Form";

export default function Image() {
    return (
        <Box className="flex flex-col gap-8 w-full items-center justify-center">
            <UploadImage />
        </Box>
    );
}
