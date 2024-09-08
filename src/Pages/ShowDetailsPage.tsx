import { FC, useEffect } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { State } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { showsSelector } from "../selector/show";
import { loadShowAction, showDetailsAction } from "../actions/Show";
import { loadCastShowDetailsAction } from "../actions/cast";
import { allCastSelector, castLoadingSelector } from "../selector/cast";
import LoadingSpinner from "../Components/LoadingSpinner";

export const pleaceHolderImage = "https://shorturl.at/Ihu0P";
type OwnProps = WithRouterProps;

type ShowDetailPageProps = ReduxProps & OwnProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  show,
  loadShow,
  showDetail,
  loadCast,
  showCast,
  showLoading,
  castLoading,
}) => {
  useEffect(() => {
    loadShow(+params.showId);
    loadCast(+params.showId);
  }, [params.showId, loadShow, loadCast]);

  if (!show) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const { name, genres, summary, image, rating } = show;

  return (
    <div className="mt-2">
      <Link className="flex items-center text-xl" to="/">
        <IoArrowBack />
        Back
      </Link>
      <h2 className="text-4xl font-semibold tracking-wide">{name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {genres.map((genre: string) => (
          <GenrePill name={genre} key={genre} />
        ))}
      </div>
      <div className="mt-2 flex">
        <img
          src={image?.medium || pleaceHolderImage}
          alt={name || "Show image"}
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          {summary && (
            <p dangerouslySetInnerHTML={{ __html: summary }}></p>
          )}
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:{" "}
            <span className="text-gray-700">
              {rating?.average ? rating.average : "N/A"}/10
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>

        <div className="flex flex-wrap">
          {castLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-row flex-wrap gap-2">
              {showCast &&
                showCast.map((item) => (
                  <CastCard
                    key={item.id} // Ensure key is unique
                    avatarLink={item.image?.medium || pleaceHolderImage}
                    name={item.name || ""}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  show: showsSelector(state)[+ownProps.params.showId],
  showCast: allCastSelector(state),
  castLoading: castLoadingSelector(state),
  showLoading: castLoadingSelector(state), // Separate selector can be created if needed
});

const mapDispatchToProps = {
  loadShow: loadShowAction,
  showDetail: showDetailsAction, // Renamed for consistency
  loadCast: loadCastShowDetailsAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));
