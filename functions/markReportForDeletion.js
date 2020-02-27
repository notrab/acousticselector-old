'use latest'

const {fromEvent} = require('graphcool-lib')

module.exports = event => {
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  const headableIds = event.data.Report.node.headables.map(i => i.id)
  const thresholdableIds = event.data.Report.node.thresholdables.map(i => i.id)
  const meetingableIds = event.data.Report.node.meetingables.map(i => i.id)
  const letterplateableIds = event.data.Report.node.letterplateables.map(
    i => i.id
  )
  const reportId = event.data.Report.node.id

  const deleteHeadables = headableIds
    .map(
      id =>
        `${id}: deleteHeadable(id: "${id}") {
        id
      }`
    )
    .join('\n')

  const deleteThresholdables = thresholdableIds
    .map(
      id =>
        `${id}: deleteThresholdable(id: "${id}") {
          id
        }`
    )
    .join('\n')

  const deleteMeetingables = meetingableIds
    .map(
      id =>
        `${id}: deleteMeetingable(id: "${id}") {
            id
          }`
    )
    .join('\n')

  const deleteLetterplateables = letterplateableIds
    .map(
      id =>
        `${id}: deleteLetterplateable(id: "${id}") {
              id
            }`
    )
    .join('\n')

  const deleteReport = `${reportId}: deleteReport(id: "${reportId}") {
    id
  }`

  const mutation = `
    mutation {
      ${deleteHeadables}
      ${deleteThresholdables}
      ${deleteMeetingables}
      ${deleteLetterplateables}
      ${deleteReport}
    }
  `

  return api
    .request(mutation)
    .then(data => console.log(data))
    .catch(error => {
      console.log(error.response.errors)
      console.oog(error.response.data)
      return {error: `Unexpected error: ${error}`}
    })
}
