import { memo } from "react";

const CastCard = ({
  avatarLink,
  name,
}: {
  avatarLink: string;
  name: string;
}) => {
  return (
    <div className="p-1 m-1">
      <img
        className="w-28 rounded-sm"
        src={avatarLink || "https://via.placeholder.com/150"}
        alt={name}
      />
      <p className="text-gray-500 font-semibold">{name}</p>
    </div>
  );
};

export default memo(CastCard);
