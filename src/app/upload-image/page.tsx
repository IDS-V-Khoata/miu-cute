import UploadImage from "@/components/UploadImage";
import { Box } from "../components/Form";
import AppLayout from "@/components/layout/AppLayout/AppLayout";

export default function Image() {

    return (
        <AppLayout titlePage="Image">
            <Box className="flex flex-col gap-8 w-full items-center justify-center">
                <UploadImage />
            </Box>
        </AppLayout>
    );
}
