import * as React from 'react';
import { useEffect, useState } from 'react';
import { playTrack } from '../../../utils/modules/playerModules';
import { ISavedTrack, ITags } from '../../../utils/interface';
import { onSnapshot } from 'firebase/firestore';
import { tagCol } from '../../../utils/firebase';
import { matchTag } from '../../../utils/modules/db';
import AddTag from '../../molecules/AddTag/AddTag';
import UserTags from '../../molecules/TrackTags/TrackTags';
import Play from '../../../assets/playback/play-green.svg';
import './SelectedTrack.scss';
import CardNav from '../../molecules/CardNav/CardNav';

interface ISelectedTrackProps {
  selectedTrack?: ISavedTrack;
  deviceId?: string;
  accessToken: string;
  setSelectedTrack?: any;
}

const SelectedTrack = ({
  selectedTrack,
  deviceId,
  accessToken,
  setSelectedTrack,
}: ISelectedTrackProps) => {
  const [trackTags, setTrackTags] = useState<string[]>([]);
  const [userTags, setUserTags] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(tagCol('purchasedAids'), collection => {
      const tags: ITags[] = [];
      const tagObject: any[] = [];
      collection.forEach(doc => {
        const data = doc.data();
        tags.push({ name: data.name, color: data.color });
        tagObject.push({
          color: data.color,
          [data.name]: [...data.tracks],
        });
      });
      setUserTags(tags);
      if (selectedTrack) {
        const matches = matchTag(tagObject, selectedTrack.uri);
        setTrackTags(matches);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedTrack]);

  return (
    <div>
      <CardNav title="Selected Track" setSelectedTrack={setSelectedTrack} />
      <div className="track-card">
        <section className="track-card__info">
          <img
            src={selectedTrack.album.images[1].url}
            alt="album"
            className="track-card__album"
          />
          <img
            onClick={() =>
              playTrack(
                deviceId,
                accessToken,
                selectedTrack.album.uri,
                selectedTrack.track_number - 1
              )
            }
            src={Play}
            alt="playback"
            className="track-card__playback"
          />
          <section className="track-card__text">
            <p className="track-card__text--title">{selectedTrack.name}</p>
            <p className="track-card__text--artist">
              {selectedTrack.artists[0].name}
            </p>
            <p className="track-card__text--album">
              {selectedTrack.album.name}
            </p>
          </section>
        </section>
        <UserTags selectedTrack={selectedTrack} trackTags={trackTags} />
        <AddTag selectedTrack={selectedTrack} userTags={userTags} />
      </div>
    </div>
  );
};

export default SelectedTrack;
