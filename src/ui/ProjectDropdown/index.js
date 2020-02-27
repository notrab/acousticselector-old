import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import TetherComponent from 'react-tether'
import Octicon from 'react-octicon'
import {gql, graphql, withApollo} from 'react-apollo'

import Wrapper from './Wrapper'
import Padding from './Padding'
import Button from '../Button'
import Row from './Row'
import NewProjectForm from '../NewProjectForm'
import Tooltip from '../Tooltip'
import NoProjectsMessage from './NoProjectsMessage'
import NotLoggedInMessage from './NotLoggedInMessage'

const ProjectDropdown = ({
  isOpen,
  reportId,
  toggleVisibility,
  setProjectName,
  newProjectName,
  data: {loading, user},
  handleNewProjectCreated
}) => (
  <TetherComponent
    attachment="top center"
    constraints={[
      {
        to: 'scrollParent',
        attachment: 'together'
      }
    ]}>
    <Tooltip placement="top" overlay="Add to project">
      <Button withIcon onClick={toggleVisibility}>
        {isOpen ? <Octicon name="x" /> : <Octicon name="list-unordered" />}
      </Button>
    </Tooltip>

    {isOpen && (
      <Wrapper>
        <Padding>
          {loading ? (
            'Updating projects list'
          ) : user ? (
            <div>
              <NewProjectForm
                userId={user.id}
                afterSubmit={handleNewProjectCreated}
                reportId={reportId}
              />

              {user.projects &&
                user.projects.length === 0 && <NoProjectsMessage />}

              {user.projects &&
                user.projects.map((project, index) => {
                  const selected = project.reports
                    .map(report => report.id)
                    .includes(reportId)

                  return (
                    <Row
                      key={index}
                      {...project}
                      reportId={reportId}
                      selected={selected}
                    />
                  )
                })}
            </div>
          ) : (
            <NotLoggedInMessage />
          )}
        </Padding>
      </Wrapper>
    )}
  </TetherComponent>
)

const enhance = compose(
  withState('isOpen', 'toggleVisibility', false),
  withHandlers({
    toggleVisibility: props => event => props.toggleVisibility(!props.isOpen),
    handleNewProjectCreated: props => event => {
      props.addReportToProject(event)
      props.toggleVisibility(false)
    }
  })
)

const addToProjectMutation = graphql(
  gql`
    mutation addReportToProject($reportId: ID!, $projectId: ID!) {
      addToProjectOnReport(
        reportsReportId: $reportId
        projectsProjectId: $projectId
      ) {
        projectsProject {
          id
        }
      }
    }
  `,
  {
    name: 'addReportToProject'
  }
)

export const UserProjectsQuery = gql`
  query UserProjectsQuery {
    user {
      id
      projects {
        id
        name
        reports {
          id
        }
      }
      _projectsMeta {
        count
      }
    }
  }
`

export default withApollo(
  compose(graphql(UserProjectsQuery), addToProjectMutation)(
    enhance(ProjectDropdown)
  )
)
