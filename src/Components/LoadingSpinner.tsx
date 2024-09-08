import { ImSpinner } from "react-icons/im";

const LoadingSpinner = ({ className = "text-blue-500 w-6 h-6" }: { className?: string }) => {
  return <ImSpinner className={`animate-spin ${className}`} />;
};

export default LoadingSpinner;
