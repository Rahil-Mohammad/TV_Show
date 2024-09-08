import { FC, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Cast } from '../models/cast';
import { Show } from '../models/show';
import { pleaceHolderImage } from '../Pages/ShowDetailsPage';

type ShowCastProps = {
  show: Show;
  cast: Cast[];
};

const ShowCast: FC<ShowCastProps> = ({ show, cast }) => {
  const [localDropdown, setLocalDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setLocalDropdown((prevState) => !prevState);
  };

  return (
    <div className="w-72 flex flex-col ml-12 m-4 hover:shadow-2xl shadow-xl">
      <img
        className="object-cover object-center w-full rounded-t-md h-72"
        src={show.image?.medium || pleaceHolderImage}
        alt={show.name || 'Show image'}
      />

      <h1 className="p-2 text-m">{show.name}</h1>
      <p className="p-2 text-sm">{show.summary}</p>

      <div className="flex -space-x-4 mt-4">
        {cast &&
          cast.slice(0, 3).map((person, index) => (
            <img
              key={index}
              src={person.image?.medium || pleaceHolderImage}
              alt={person.name}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
              title={person.name}
            />
          ))}
        {cast && cast.length > 3 && (
          <button
            className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-medium"
            aria-label={`Show more ${cast.length - 3} cast members`}
            onClick={handleToggleDropdown}
          >
            +{cast.length - 3}
          </button>
        )}
      </div>

      {localDropdown && (
        <div className="mt-2 bg-white shadow-md rounded-lg p-2">
          {cast?.length > 0 &&
            cast.slice(3).map((person, index) => (
              <div key={index} className="flex items-center mt-2">
                <img
                  src={person.image?.medium || pleaceHolderImage}
                  alt={person.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <span className="ml-2 text-sm">{person.name}</span>
              </div>
            ))}
        </div>
      )}

      <Link
        to={`/ShowDetail/${show.id}`}
        className="cursor-pointer p-4 w-32 border-black border-2 self-center mb-4 rounded-xl hover:bg-gray-500"
      >
        View Details
      </Link>
    </div>
  );
};

export default memo(ShowCast);
