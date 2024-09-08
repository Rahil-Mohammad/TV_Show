import { ChangeEvent, FC } from "react";
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
import ShowCast from "../Components/ShowCast";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowListPageProps = ReduxProps;

const ShowListPage: FC<ShowListPageProps> = ({
  query,
  shows,
  QueryChange,
  loading,
  showCast,
}) => {
  console.log("shows", shows);
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          QueryChange(e.target.value)
        }
      />
      {loading && <LoadingSpinner className="text-md" />}

      {shows && (
        <div className="flex flex-wrap justify-center">
          {shows.map((item) => (
            <ShowCard key={item.id} show={item}></ShowCard>
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
  // showsLoaded: ShowsLoadedAction,
  QueryChange: ShowsQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
