import React, {Component} from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import {gql, graphql} from 'react-apollo'

import Button from './Button'
import {TextInput} from './Form'
import {UserProjectsQuery} from './ProjectDropdown'

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`

const Input = styled(TextInput)`margin-bottom: 0;`

class NewProjectForm extends Component {
  state = {
    name: ''
  }

  onChange = name => {
    this.setState(prevState => ({
      ...prevState,
      name
    }))
  }

  handleSubmit = async e => {
    e.preventDefault()

    const {name} = this.state
    const {afterSubmit, reportId} = this.props

    if (!name) {
      this.setState(prevState => ({
        ...prevState,
        error: 'All projects require a name'
      }))

      return
    }

    const newProject = await this.props.createProject({
      variables: {
        name,
        userId: this.props.userId
      },
      update: (store, {data: {createProject}}) => {
        const data = store.readQuery({query: UserProjectsQuery})

        data.user.projects.push(createProject)

        store.writeQuery({query: UserProjectsQuery, data})
      }
    })

    if (afterSubmit) {
      afterSubmit(
        {
          variables: {
            projectId: newProject.data.createProject.id,
            reportId
          }
        },
        name
      )
    }
  }

  render() {
    const {name} = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          autofocus
          placeholder="New project name..."
          value={name}
          onChange={e => this.onChange(e.target.value)}
        />

        {name &&
          name.length > 3 && (
            <Button type="submit" withIcon>
              <Octicon name="plus" /> Create
            </Button>
          )}
      </Form>
    )
  }
}

const createProjectMutation = gql`
  mutation createProject($name: String!, $userId: ID!) {
    createProject(name: $name, userId: $userId) {
      id
      name
      reports {
        id
      }
    }
  }
`

export default graphql(createProjectMutation, {
  name: 'createProject'
})(NewProjectForm)
