import * as React from 'react';
import Card from '../../../Layout/Card/Card';
import { MixedList, TagList } from '../../organisms';
import { Divider } from '../../molecules';

const SelectList = () => {
  return (
    <Card title="Lists">
      <Divider title="TAGS" />
      <TagList />
      <Divider title="MATCH TAGS" />
      <MixedList />
    </Card>
  );
};

export default SelectList;
