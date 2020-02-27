import React from 'react'
// import {compose, graphql, gqp} from 'react-apollo';

const SealEditor = ({
  headables,
  deleteHeadable,
  thresholdables,
  deleteThresholdable,
  meetingables,
  deleteMeetingable,
  letterplateables,
  deleteLetterplateable,
  refetch
}) => {
  return (
    <div>
      {headables && (
        <div>
          <h2>Head &amp; Jambs</h2>
          {headables.map((headable, index) => (
            <li key={headable.id}>
              {headable.product.name} - {headable.id} -{' '}
              <button
                onClick={() => deleteHeadable({variables: {id: headable.id}})}>
                Remove
              </button>
            </li>
          ))}
        </div>
      )}

      {thresholdables && (
        <div>
          <h2>Thresholds</h2>
          {thresholdables.map((thresholdable, index) => (
            <li key={thresholdable.id}>
              {thresholdable.product.name} - {thresholdable.id} -{' '}
              <button
                onClick={() =>
                  deleteThresholdable({variables: {id: thresholdable.id}})}>
                Remove
              </button>
            </li>
          ))}
        </div>
      )}

      {meetingables && (
        <div>
          <h2>Meeting stiles</h2>
          {meetingables.map((meetingable, index) => (
            <li key={meetingable.id}>
              {meetingable.product.name} - {meetingable.id} -{' '}
              <button
                onClick={() =>
                  deleteMeetingable({variables: {id: meetingable.id}})}>
                Remove
              </button>
            </li>
          ))}
        </div>
      )}

      {letterplateables && (
        <div>
          <h2>Letter Plates</h2>
          {letterplateables.map((letterplateable, index) => (
            <li key={letterplateable.id}>
              {letterplateable.product.name} - {letterplateable.id} -{' '}
              <button
                onClick={() =>
                  deleteLetterplateable({
                    variables: {id: letterplateable.id}
                  })}>
                Remove
              </button>
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default SealEditor
