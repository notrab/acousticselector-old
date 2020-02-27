import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { monoFont } from '../../utils/fonts'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;

  > a {
    display: flex;
    padding: 1.5rem;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.theme.blue};
    text-decoration: none;
    align-items: center;
    color: ${({ theme }) => theme.grey};

    span:first-child {
      margin-right: 3rem;
      text-align: center;

      > strong {
        color: ${({ theme }) => theme.orange};
        font-family: ${monoFont};
        font-weight: 500;
      }
    }

    span:last-child {
      color: ${({ theme }) => theme.darkBlue};
      text-align: left;
    }
  }
`

const Note = styled.span`
  color: ${props => props.theme.grey} !important;
  font-size: 1.3rem;
  display: block;
  margin: 0;
`

const ProjectItem = props => (
  <Wrapper>
    <Link
      key={props.id}
      to={{
        pathname: `/reports/${props.id}`,
        state: { modal: true, returnTo: '/projects' }
      }}>
      <span>
        <strong>{props.dbrw}</strong> dBRw
      </span>
      <span>
        {props.core.thickness} {props.core.manufacturer.name} {props.core.name}
        {props.testId && <Note>Test ID: #{props.testId}</Note>}
        {/* {props.removeReport && (
          <button
            onClick={() =>
              props.removeReport({
                variables: {
                  projectId: props.key,
                  reportId: props.id
                }
              })}>
            Remove
          </button>
        )} */}
      </span>
    </Link>
  </Wrapper>
)

export default ProjectItem
