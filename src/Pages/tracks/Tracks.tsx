import * as React from 'react';
import Note from '../../assets/music-note.svg';
import {
  SavedTracks,
  SelectedTrack,
  EmptyCard,
} from '../../Components/organisms';
import useWindowSize from '../../hooks/useWindowSize';
import { IWindow } from '../../services/spotify/spotify.interface';
import './Tracks.scss';

interface ITracksProps {
  state: any;
  dispatch: any;
}

const Tracks = ({ state, dispatch }: ITracksProps) => {
  const [selectedTrack, setSelectedTrack] = React.useState();

  const size: IWindow = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <>
          <SavedTracks
            setSelectedTrack={setSelectedTrack}
            state={state}
            dispatch={dispatch}
          />
          <>
            {selectedTrack ? (
              <SelectedTrack selectedTrack={selectedTrack} />
            ) : (
              <EmptyCard icon={Note} item="track" />
            )}
          </>
        </>
      </div>
    );
  }

  return (
    <>
      {selectedTrack ? (
        <SelectedTrack
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
        />
      ) : (
        <SavedTracks
          setSelectedTrack={setSelectedTrack}
          state={state}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default Tracks;
