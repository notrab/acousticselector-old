import React from 'react'
import {Link} from 'react-router-dom'

import Dropdown from '../Dropdown'
import DropdownItem from '../Dropdown/Item'

export default ({user, logout}) => (
  <Dropdown>
    <span>{user.name}</span>
    <div>
      <DropdownItem>
        <Link
          to={{
            pathname: `/projects`,
            state: {modal: true}
          }}>
          Projects
        </Link>
      </DropdownItem>

      {!!user.admin && (
        <DropdownItem>
          <Link
            to={{
              pathname: `/admin/new`,
              state: {modal: true}
            }}>
            Add Report
          </Link>
        </DropdownItem>
      )}
      <DropdownItem onClick={logout}>Logout</DropdownItem>
    </div>
  </Dropdown>
)
