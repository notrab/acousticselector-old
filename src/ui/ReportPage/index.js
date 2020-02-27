import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import Octicon from 'react-octicon'
import Helmet from 'react-helmet'

import LoadingSpinner from '../LoadingSpinner'
import Content from '../Content'
import SubHeading from './SubHeading'
import Seals from '../ReportViewer/Seals'
import Button from '../Button'
import Tooltip from '../Tooltip'

const ReportPage = ({ data: { Report, loading, error } }) => {
  if (loading) return <LoadingSpinner />
  if (error) return <p>Something went wrong.</p>

  const title = `${Report.core.thickness} ${Report.core.manufacturer
    .name} ${Report.core.name || ''}`
  const downloadTooltip = Report.isAssessment
    ? 'Assessment illustration'
    : 'Test report PDF'

  const description = `Acoustic test summary`
  const url = 'https://acousticselector.com'

  return (
    <Content pageTitle={title}>
      <Helmet>
        <title>{`${title} | Acoustic Selector`}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Helmet>

      <SubHeading>
        {Report.dbrw}dBRw
        <br />
        {Report.oldId && `Test ID: #${Report.oldId}`}
      </SubHeading>

      {Report.file &&
        Report.file.url && (
          <Tooltip placement="top" overlay={downloadTooltip}>
            <a href={Report.file.url} target="_blank" rel="noopener noreferrer">
              <Button withIcon center>
                <Octicon name="cloud-download" /> <span>Download</span>
              </Button>
            </a>
          </Tooltip>
        )}

      <Seals
        core={Report.core}
        headables={Report.headables}
        thresholdables={Report.thresholdables}
        meetingables={Report.meetingables}
        letterplateables={Report.letterplateables}
        glass={Report.glass}
        relatedTests={Report.core.reports}
      />
    </Content>
  )
}

const Query = gql`
  query getSealConfiguration($id: ID!) {
    Report(id: $id) {
      id
      oldId
      notes
      dbrw
      core {
        name
        thickness
        fireRating
        manufacturer {
          id
          name
        }
        reports(filter: { id_not: $id }) {
          id
          dbrw
          core {
            name
            thickness
            manufacturer {
              name
            }
          }
        }
      }
      doorType
      glass
      testBy
      testDate
      testId
      isAssessment
      file {
        url
      }
      headables {
        product {
          name
          slug
        }
      }
      thresholdables {
        product {
          name
          slug
        }
      }
      meetingables {
        product {
          name
          slug
        }
      }
      letterplateables {
        product {
          name
          slug
        }
      }
    }
  }
`

const mapQueriesToProps = graphql(Query, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})

export default compose(mapQueriesToProps)(ReportPage)
