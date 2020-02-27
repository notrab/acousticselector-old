import React from 'react';
import {gql, graphql} from 'react-apollo';
import Octicon from 'react-octicon';

import Button from './Button';

const LikeButton = ({user: {id}, reportId, likes, likeReport}) => {
  const count = likes.length || 0;
  const btnText = count > 0 ? 'Unlike' : 'Like';
  // const likes = likes.map(like => like.report.id).contains(id);

  return (
    <Button withIcon onClick={likeReport}>
      <Octicon name="heart" /> <span>{btnText}</span>
    </Button>
  );
};

const likeMutation = graphql(
  gql`
    mutation likeReport($reportId: ID!, $userId: ID!) {
      createLike(reportId: $reportId, userId: $userId) {
        id
      }
    }
  `,
  {
    name: 'likeReport',
    options: ({reportId, user: {id}}) => ({
      variables: {
        reportId: reportId,
        userId: id
      }
    })
  }
);

// const unlikeMutation = graphql(
//   gql`
//     mutation unlikeReport($id: ID!) {
//       deleteLike(id: ID!) {
//         id
//       }
//     }
//   `,
//   {
//     name: 'unlikeReport',
//     options: ({reportId, user: {id}}) => ({
//       variables: {
//         reportId: reportId,
//         userId: id
//       }
//     })
//   }
// );

export default likeMutation(LikeButton);
