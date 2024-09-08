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
  ShowDeatil,
  LoadCast,
  showCast,
  showloading,
  castloading,
}) => {
  console.log(params.showId);
  console.log("show cast", showCast);
  console.log(show, "show from ");
  useEffect(() => {
    loadShow(+params.showId);
    LoadCast(+params.showId);
  }, [params.showId]);

  if (!show) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="mt-2">
      <Link className="flex items-center text-xl" to="/">
        <IoArrowBack />
        Back
      </Link>
      <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show.genres.map((genre:any) => (
          <GenrePill name={genre} key={genre} />
        ))}
      </div>
      <div className="mt-2 flex">
        <img
          src={show.image?.medium || pleaceHolderImage}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          {show.summary && (
            <p dangerouslySetInnerHTML={{ __html: show.summary || "" }}></p>
          )}
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:{" "}
            <span className="text-gray-700">{show.rating.average || <span>NO</span>}/10</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>

        <div className="flex flex-wrap">
          {castloading ? (<LoadingSpinner/>) : (
            <div className="flex flex-row flex-wrap gap-2">
              {showCast &&
                showCast.map((item) => {
                  return <CastCard avatarLink={item.image?.medium || pleaceHolderImage} name={item.name || ""}/>;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  return {
    show: showsSelector(state)[+ownProps.params.showId],
    showCast: allCastSelector(state),
    castloading: castLoadingSelector(state),
    showloading: castLoadingSelector(state),
  };

  // console.log(ownProps.params.showId);
};

const mapDispatchToProps = {
  loadShow: loadShowAction,
  ShowDeatil: showDetailsAction,
  LoadCast: loadCastShowDetailsAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));
