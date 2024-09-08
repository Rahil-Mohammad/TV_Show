import { Link } from "react-router-dom";
import { Show } from "../models/show";
import { FC } from "react";

type ShowsCardProps = {
  show: Show;
};

const placeholderImage = "https://shorturl.at/Ihu0P";

const ShowCard: FC<ShowsCardProps> = ({ show }) => {
  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={show.image?.medium || placeholderImage}
        alt={show.name || "Show image"}
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          <p className="text-sm text-gray-500 line-clamp-3">
            {show.summary || "No summary available."}
          </p>
        </div>
        <Link
          to={`/show/${show.id}`}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-blue-500 text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ShowCard;
