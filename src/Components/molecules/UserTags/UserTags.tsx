import * as React from 'react';
import Plus from '../../../assets/add-circle.svg';
import * as Firestore from '../../../services/firebase/firestore';
import { UserContext } from '../../../context/UserContext';
import { ITags } from '../../../utils/interface';
import { dbTrack } from '../../../utils/modules/tracks/tracks';
import { Tag } from '../../atoms';
import './UserTags.scss';

interface IUserTagsProps {
  selectedTrack: any;
  userTags?: ITags[];
}

const UserTags = ({ selectedTrack, userTags }: IUserTagsProps) => {
  const user = React.useContext(UserContext);

  return (
    <section className="user-tags">
      <p className="user-tags__title">MY TAGS</p>
      <section className="user-tags__container">
        {userTags.length > 0 ? (
          userTags.map((tag: ITags, index: number) => {
            return (
              <Tag
                key={index}
                onClick={() =>
                  Firestore.tagTrack(
                    user.fireId,
                    tag.name,
                    dbTrack(selectedTrack)
                  )
                }
                color={tag.color}
                name={tag.name}
                actionIcon={Plus}
              />
            );
          })
        ) : (
          <div className="track-tags__container--empty">no tags added</div>
        )}
      </section>
    </section>
  );
};

export default UserTags;
