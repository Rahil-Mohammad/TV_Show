import { memo } from "react";

const GenrePill = ({ name }: { name: string }) => {
  return (
    <p className="font-semibold bg-gray-200 px-3 py-1 rounded-full">
      {name}
    </p>
  );
};

export default memo(GenrePill);
