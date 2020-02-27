import React, {Component} from 'react'
import styled from 'styled-components'
import {gql, graphql, compose} from 'react-apollo'
import Octicon from 'react-octicon'

const Wrapper = styled.a`
  color: ${props => (props.selected ? '#303337' : '#a1abb3')};
  margin-bottom: 1px;
  padding: 4px 10px;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: rgba(235, 100, 39, 0.1);
    color: #e3623a;
    border-radius: 0.4rem;
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

class ProjectRow extends Component {
  state = {
    selected: this.props.selected || false,
    hovered: false
  }

  _handleAddReport = async (projectId, reportId) => {
    const variables = {
      projectId,
      reportId
    }

    this.setState(prevState => ({
      ...prevState,
      selected: !!prevState.selected
    }))

    if (this.state.selected) {
      await this.props.removeReportFromProject({
        variables
      })
    } else {
      await this.props.addReportToProject({
        variables
      })
    }

    this.setState(prevState => ({
      ...prevState,
      selected: !prevState.selected
    }))
  }

  render() {
    const {id, name, reportId} = this.props
    const {selected, hovered} = this.state

    return (
      <Wrapper
        selected={selected}
        onClick={() => this._handleAddReport(id, reportId)}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}>
        {name}
        {selected && (
          <span>
            {selected && !hovered ? (
              <Octicon name="check" />
            ) : (
              <Octicon name="x" />
            )}
          </span>
        )}
      </Wrapper>
    )
  }
}

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

const removeFromProjectMutation = graphql(
  gql`
    mutation removeFromProject($reportId: ID!, $projectId: ID!) {
      removeFromProjectOnReport(
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
    name: 'removeReportFromProject'
  }
)

export default compose(addToProjectMutation, removeFromProjectMutation)(
  ProjectRow
)
