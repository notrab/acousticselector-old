import React, { Component } from 'react'
import { compose, gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import media from '../../utils/media'
import DrawerModal from '../DrawerModal'
import ScrollView from '../ReportViewer/ScrollView'
import Container from './Container'
import Loading from '../ReportViewer/Loading'
import ProjectItem from '../ProjectItem'
import Tooltip from '../Tooltip'
import Button from '../Button'

const Wrapper = styled.header`padding: 2.5rem 2rem;`

const Title = styled.h1`
  color: ${({ theme }) => theme.orange};
  display: inline-block;
  font-size: 2.4rem;
  font-weight: 400;
  margin: 0;

  ${media.tablet`
    font-size: 2.7rem;
    margin-bottom: 0;
  `};
`

const ProjectName = styled.h3`
  color: ${({ theme }) => theme.darkBlue};
  display: inline-block;
  font-size: 2rem;
  font-weight: 400;
  margin: 2rem 0 1.5rem;

  ${media.tablet`
    font-size: 2.2rem;
  `};
`

class ProjectsPage extends Component {
  render() {
    const { data: { loading, error, user }, removeReport } = this.props

    if (error) return <p>Error occured</p>

    const goBack = () => this.props.history.push('/', { modal: false })

    if (loading)
      return (
        <DrawerModal onClose={this.goBack}>
          <Loading message="Loading projects" />
        </DrawerModal>
      )

    return (
      <DrawerModal onClose={goBack}>
        <Container>
          <ScrollView>
            <Wrapper>
              <Title>My Projects</Title>

              {user.projects &&
                user.projects.map(project => (
                  <div key={project.id}>
                    <ProjectName>{project.name}</ProjectName>

                    <Tooltip placement="top" overlay="Copy link">
                      <CopyToClipboard
                        text={`https://www.acousticselector.com/projects/${project.id}`}>
                        <Button withIcon>
                          <Octicon name="link" />
                        </Button>
                      </CopyToClipboard>
                    </Tooltip>

                    {project.reports.map(report => (
                      <ProjectItem
                        key={report.id}
                        {...report}
                        removeReport={removeReport}
                      />
                    ))}
                  </div>
                ))}
            </Wrapper>
          </ScrollView>
        </Container>
      </DrawerModal>
    )
  }
}

const Query = gql`
  {
    user {
      id
      projects {
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
          _headablesMeta {
            count
          }
          _meetingablesMeta {
            count
          }
          _thresholdablesMeta {
            count
          }
          _letterplateablesMeta {
            count
          }
        }
      }
    }
  }
`

const removeReportFromProjectMutation = gql`
  mutation removeReport($projectId: ID!, $reportId: ID!) {
    removeFromProjectOnReport(
      projectsProjectId: $projectId
      reportsReportId: $reportId
    ) {
      id
    }
  }
`

export default compose(
  graphql(Query),
  graphql(removeReportFromProjectMutation, {
    name: 'removeReport'
  })
)(ProjectsPage)
