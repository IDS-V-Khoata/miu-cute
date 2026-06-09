import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OverLoadProps {
    isActive?: boolean;
}
const OverLoad = ({ isActive }: OverLoadProps) => {
    return (
        <>
            {isActive &&
                <div className="w-screen h-screen inset-0 bg-black/70 z-[9999] flex items-center justify-center fixed left-0 top-0 right-0">
                    <FontAwesomeIcon icon={faSpinner} spinPulse className="text-[#3498db] text-6xl" />
                </div>
            }
        </>
    )
}

export default OverLoad;