// @flow

import React from 'react';

import SentenceList, {Dl} from '../SentenceList';

type Product = {
  name: string,
  slug: string
};

type Props = {
  headables?: [Product],
  meetingables?: [Product],
  thresholdables?: [Product],
  letterplateables?: [Product],
  glass: ?string
};

const SealConfiguration = ({
  headables,
  meetingables,
  thresholdables,
  letterplateables,
  glass
}: Props) =>
  <Dl>
    {headables &&
      headables.length > 0 &&
      <SentenceList title="Head & Jamb" items={headables} />}
    {thresholdables &&
      thresholdables.length > 0 &&
      <SentenceList title="Threshold" items={thresholdables} />}
    {meetingables &&
      meetingables.length > 0 &&
      <SentenceList title="Meeting Stile" items={meetingables} />}
    {letterplateables &&
      letterplateables.length > 0 &&
      <SentenceList title="Letter Plate" items={letterplateables} />}
    {glass && <SentenceList title="Glass" items={[{product: {name: glass}}]} />}
  </Dl>;

export default SealConfiguration;
