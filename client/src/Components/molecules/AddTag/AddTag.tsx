import * as React from 'react';
import { createTag } from '../../../utils/firebase';
import { useState } from 'react';
import Add from '../../../assets/add.svg';
import Tag from '../../../assets/tag.svg';
import './AddTag.scss';
import { randomColor } from '../../../utils/modules/db';
// import { ITags } from '../../../utils/interface';

interface IAddTagProps {
  selectedTrack: any;
  // userTags?: ITags[];
}

const AddTag = ({ selectedTrack }: IAddTagProps) => {
  const [tagInput, setTagInput] = useState('');

  const dbTrack = {
    artist: selectedTrack.artists[0].name,
    title: selectedTrack.name,
    artwork: selectedTrack.album.images[2].url,
    uri: selectedTrack.uri,
  };

  return (
    <section className="add-tag">
      <h2 className="add-tag__title">ADD TAG</h2>
      <form className="add-tag__search">
        <input
          className="add-tag__search--input"
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
        />
        <img src={Tag} alt="tag" className="add-tag__search--tag" />
        <button
          className="add-tag__search--button"
          onClick={e => {
            e.preventDefault();
            createTag('purchasedAids', tagInput, randomColor(), dbTrack);
            setTagInput('');
          }}
        >
          <img src={Add} alt="check" className="add-tag__search--check" />
        </button>
      </form>
    </section>
  );
};

export default AddTag;
