import React from 'react'
import {gql, graphql, compose} from 'react-apollo'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Card from '../Card'
import LoadingCard from '../Card/LoadingCard'
import LoadMoreButton from './LoadMoreButton'
import NoResults from '../NoResults'
import FilterStatusBar from '../FilterStatusBar'

const ReportList = ({
  data: {allReports, loading, error, _allReportsMeta, user},
  loadMoreReports,
  dirty
}) => {
  if (loading) return <LoadingCard />
  if (!allReports) return <LoadingCard />
  if (error) return <p>Error occured</p>
  if (!loading && allReports.length === 0) return <NoResults />

  const moreReportsAvailable = !!(
    _allReportsMeta && _allReportsMeta.count > allReports.length
  )

  return (
    <div>
      {allReports.map((report, index) => (
        <Card user={user} key={index} {...report} />
      ))}

      {moreReportsAvailable && <LoadMoreButton onClick={loadMoreReports} />}

      <ReactCSSTransitionGroup
        transitionName="status"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}>
        {dirty && <FilterStatusBar count={_allReportsMeta.count} />}
      </ReactCSSTransitionGroup>
    </div>
  )
}

const Query = gql`
  query ReportListQuery(
    $filter: ReportFilter
    $first: Int
    $skip: Int
    $orderBy: ReportOrderBy
    $currentUserId: ID
  ) {
    allReports(filter: $filter, first: $first, skip: $skip, orderBy: $orderBy) {
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
      headables {
        id
        product {
          name
        }
      }
      thresholdables {
        id
        product {
          name
        }
      }
      meetingables {
        id
        product {
          name
        }
      }
      letterplateables {
        id
        product {
          name
        }
      }
      likes(filter: {user: {id: $currentUserId}}) {
        id
      }
    }
    _allReportsMeta(filter: $filter) {
      count
    }
    user {
      id
      name
      admin
      projects {
        id
        name
      }
    }
  }
`

const mapQueriesToProps = graphql(Query, {
  options: ({filter, activeFilters, options: {first, skip, orderBy}}) => {
    const {isPublished} = filter

    let safeFilter = {
      isPublished
    }

    if (filter.dbrw_gte) {
      safeFilter = {
        ...safeFilter,
        dbrw_gte: filter.dbrw_gte
      }
    }

    if (filter.dbrw_lte) {
      safeFilter = {
        ...safeFilter,
        dbrw_lte: filter.dbrw_lte
      }
    }

    if (!filter.includeAssessments) {
      safeFilter = {
        ...safeFilter,
        isAssessment: false
      }
    }

    if (filter.doorType_in && filter.doorType_in.length > 0) {
      safeFilter = {
        ...safeFilter,
        doorType_in: [...filter.doorType_in]
      }
    }

    if (filter.thickness_in && filter.thickness_in.length > 0) {
      safeFilter = {
        ...safeFilter,
        core: {
          ...safeFilter.core,
          thickness_in: [...filter.thickness_in]
        }
      }
    }

    if (filter.manufacturer_in && filter.manufacturer_in.length > 0) {
      safeFilter = {
        ...safeFilter,
        core: {
          ...safeFilter.core,
          manufacturer: {
            name_in: [...filter.manufacturer_in]
          }
        }
      }
    }

    // if (filter.glazedOnly && !filter.unglazedOnly) {
    if (filter.glazedOnly) {
      safeFilter = {
        ...safeFilter,
        glass_not: ''
      }
    }

    if (filter.unglazedOnly) {
      safeFilter = {
        ...safeFilter,
        glass: ''
      }
    }

    return {
      variables: {filter: safeFilter, first, skip, orderBy}
    }
  },
  props: ({ownProps, data}) => ({
    data,
    loadMoreReports: () => {
      data.fetchMore({
        variables: {
          skip: data.allReports.length
        },
        updateQuery: (prevState, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prevState

          return {
            ...prevState,
            allReports: [...prevState.allReports, ...fetchMoreResult.allReports]
          }
        }
      })
    }
  })
})

const mapStateToProps = ({filter, activeFilters, options}) => ({
  filter,
  activeFilters,
  options,
  dirty: filter.dirty
})

export default compose(connect(mapStateToProps), mapQueriesToProps)(ReportList)
