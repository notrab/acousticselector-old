import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import Helmet from 'react-helmet'

import LoadingSpinner from '../LoadingSpinner'
import Content from '../Content'
import NotFound from '../NotFound'
import ProjectItem from '../ProjectItem'

const ReportPage = ({ data: { Project, loading, error } }) => {
  if (loading) return <LoadingSpinner />
  if (error) return <p>Something went wrong.</p>

  if (!Project) return <NotFound title="Project not found" />

  const title = `'${Project.name}' Project`
  const description = `There are ${Project.reports
    .length} assigned to ${Project.name}`
  const url = `https://acousticselector.com/projects/${Project.id}`

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

      {Project.reports.map(report => (
        <ProjectItem key={report.id} {...report} />
      ))}
    </Content>
  )
}

const Query = gql`
  query getProject($id: ID!) {
    Project(id: $id) {
      id
      name
      reports {
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
