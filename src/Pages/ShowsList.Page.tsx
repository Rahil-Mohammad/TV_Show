import { ChangeEvent, FC, useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { ShowsQueryChangeAction } from "../actions/Show";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../store";
import {
  showMapCast,
  showQuerySelector,
  ShowSelector,
  showsLoadingSelector,
} from "../selector/show";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowListPageProps = ReduxProps;

const ShowListPage: FC<ShowListPageProps> = ({
  query,
  shows,
  QueryChange,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState(query);

  // Debounce input to avoid frequent API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      QueryChange(searchTerm);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, QueryChange]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-2">
      <SearchBar value={searchTerm} onChange={handleInputChange} />

      {loading ? (
        <LoadingSpinner className="text-md" />
      ) : shows.length === 0 ? (
        <div className="text-center text-lg mt-4">No shows found</div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {shows.map((item) => (
            <ShowCard key={item.id} show={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    query: showQuerySelector(state),
    shows: ShowSelector(state),
    loading: showsLoadingSelector(state),
    showCast: showMapCast(state),
  };
};

const mapDispatchToProps = {
  QueryChange: ShowsQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
