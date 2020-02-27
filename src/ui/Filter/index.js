import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {compose, gql, graphql} from 'react-apollo'
import NumberStepper from '../NumberStepper'
import Toggle from '../Toggle'
import Button from '../Button'
import {setOrderBy} from '../../ducks/options'
import {
  incrementDbrwGte,
  decrementDbrwGte,
  incrementDbrwLte,
  decrementDbrwLte,
  setDbrwGte,
  setDbrwLte,
  toggleIncludeAssessments,
  setThicknessChoice,
  setDoorTypeChoice,
  setManufacturerChoice,
  clearFilter,
  setGlazedOnly,
  setUnglazedOnly
} from '../../ducks/filter'
import Wrapper, {InsideContainer, Fluid} from './Wrapper'
import Collapseable from './Collapseable'
import FilterOption from './FilterOption'
import FilterRow, {ActionFooter} from './FilterRow'

const orderByText = orderBy => {
  switch (orderBy) {
    case 'dbrw_DESC':
      return 'Highest dBRw'

    case 'dbrw_ASC':
      return 'Lowest dBRw'

    case 'testId_DESC':
      return 'Recently added'

    default:
      return 'Filter'
  }
}

const Filter = ({
  data: {loading, allReports},
  lowestDbrw,
  highestDbrw,
  dbrw_gte,
  dbrw_lte,
  doorThicknesses,
  thickness_in,
  doorTypes,
  doorType_in,
  coreManufacturers,
  manufacturer_in,
  seals,
  incrementDbrwGte,
  decrementDbrwGte,
  incrementDbrwLte,
  decrementDbrwLte,
  setDbrwGte,
  setDbrwLte,
  setThicknessChoice,
  setDoorTypeChoice,
  setManufacturerChoice,
  clearFilter,
  includeAssessments,
  toggleIncludeAssessments,
  orderBy,
  setOrderBy,
  glazedOnly,
  unglazedOnly,
  setGlazedOnly,
  setUnglazedOnly,
  ...rest
}) => (
  <Wrapper {...rest}>
    <Collapseable>
      <Fluid>
        <InsideContainer>
          <FilterOption
            padded
            label="dBRw"
            loading={loading}
            defaultState={`${dbrw_gte} - ${dbrw_lte}dBRw`}>
            <NumberStepper
              incrementDbrwGte={incrementDbrwGte}
              decrementDbrwGte={decrementDbrwGte}
              incrementDbrwLte={incrementDbrwLte}
              decrementDbrwLte={decrementDbrwLte}
              setDbrwGte={setDbrwGte}
              setDbrwLte={setDbrwLte}
              dbrw_gte={dbrw_gte}
              dbrw_lte={dbrw_lte}
              lowestDbrw={lowestDbrw}
              highestDbrw={highestDbrw}
            />
          </FilterOption>

          <FilterOption
            label="Thickness"
            loading={loading}
            defaultState={
              thickness_in.length > 0 ? `${thickness_in.length} selected` : null
            }>
            {!loading &&
              doorThicknesses &&
              doorThicknesses.map((thickness, index) => (
                <FilterRow
                  key={index}
                  handleClick={() => setThicknessChoice(thickness)}
                  active={thickness_in.indexOf(thickness) !== -1}>
                  {thickness}
                </FilterRow>
              ))}

            {thickness_in.length > 0 && (
              <ActionFooter>
                <Button block onClick={() => clearFilter('thickness_in')}>
                  Clear
                </Button>
              </ActionFooter>
            )}
          </FilterOption>

          <FilterOption
            label="Doorset"
            loading={loading}
            defaultState={
              doorType_in.length > 0 ? `${doorType_in.length} selected` : null
            }>
            {!loading &&
              doorTypes &&
              doorTypes.map((type, index) => (
                <FilterRow
                  key={index}
                  handleClick={() => setDoorTypeChoice(type)}
                  active={doorType_in.indexOf(type) !== -1}>
                  {type}
                </FilterRow>
              ))}

            {doorType_in.length > 0 && (
              <ActionFooter>
                <Button block onClick={() => clearFilter('doorType_in')}>
                  Clear
                </Button>
              </ActionFooter>
            )}
          </FilterOption>

          <FilterOption
            label="Manufacturer"
            loading={loading}
            defaultState={
              manufacturer_in.length > 0
                ? `${manufacturer_in.length} selected`
                : null
            }>
            {!loading &&
              coreManufacturers &&
              coreManufacturers.map((manufacturer, index) => (
                <FilterRow
                  key={index}
                  handleClick={() => setManufacturerChoice(manufacturer)}
                  active={manufacturer_in.indexOf(manufacturer) !== -1}>
                  {manufacturer}
                </FilterRow>
              ))}

            {manufacturer_in.length > 0 && (
              <ActionFooter>
                <Button block onClick={() => clearFilter('manufacturer_in')}>
                  Clear
                </Button>
              </ActionFooter>
            )}
          </FilterOption>

          <FilterOption
            label="More filters"
            loading={loading}
            defaultState={orderByText(orderBy)}>
            <h4>Assessments</h4>
            <ul>
              <FilterRow onClick={() => toggleIncludeAssessments()}>
                Include assessments
                <Toggle
                  icons={false}
                  checked={includeAssessments}
                  onChange={() => toggleIncludeAssessments()}
                />
              </FilterRow>
            </ul>

            <h4 style={{marginTop: '1.5rem'}}>Glass</h4>
            <ul>
              <FilterRow onClick={() => setGlazedOnly()}>
                Glazed only
                <Toggle
                  icons={false}
                  checked={glazedOnly}
                  onChange={() => setGlazedOnly()}
                />
              </FilterRow>
              <FilterRow onClick={() => setUnglazedOnly()}>
                Flush only
                <Toggle
                  icons={false}
                  checked={unglazedOnly}
                  onChange={() => setUnglazedOnly()}
                />
              </FilterRow>
            </ul>

            <h4 style={{marginTop: '1.5rem'}}>Order by</h4>
            <ul>
              <FilterRow handleClick={() => setOrderBy('dbrw_DESC')}>
                Highest dBRw
              </FilterRow>
              <FilterRow handleClick={() => setOrderBy('dbrw_ASC')}>
                Lowest dBRw
              </FilterRow>
              {/* <FilterRow handleClick={() => setOrderBy('testId_DESC')}>Recently added</FilterRow> */}
            </ul>
          </FilterOption>
        </InsideContainer>
      </Fluid>
    </Collapseable>
  </Wrapper>
)

const Query = gql`
  query SearchFilterDataQuery($isPublished: Boolean!) {
    allReports(filter: {isPublished: $isPublished}) {
      id
      dbrw
      doorType
      core {
        name
        fireRating
        thickness
        manufacturer {
          id
          name
        }
      }
      headables {
        product {
          name
        }
      }
      meetingables {
        product {
          name
        }
      }
      thresholdables {
        product {
          name
        }
      }
      letterplateables {
        product {
          name
        }
      }
    }
  }
`

const mapDataToProps = graphql(Query, {
  props: props => {
    const dbrws = []
    const doorThicknesses = []
    const doorTypes = []
    const coreManufacturers = []
    const seals = []

    if (props.data.allReports && props.data.allReports.length) {
      props.data.allReports.map(r => {
        const currentDbrw = r['dbrw']
        const currentDoorThickness = r['core']['thickness']
        const currentDoorType = r['doorType']
        const currentManufacturer = r['core']['manufacturer']['name']
        const currentHeadables = r['headables']
        const currentMeetingables = r['meetingables']
        const currentThresholdables = r['thresholdables']

        if (!dbrws.includes(currentDbrw)) {
          dbrws.push(r['dbrw'])
        }

        if (!doorThicknesses.includes(currentDoorThickness)) {
          doorThicknesses.push(currentDoorThickness)
        }

        if (!doorTypes.includes(currentDoorType)) {
          doorTypes.push(currentDoorType)
        }

        if (!coreManufacturers.includes(currentManufacturer)) {
          coreManufacturers.push(currentManufacturer)
        }

        currentHeadables.map(h => {
          const currentHeadable = h['product']['name']

          if (!seals.includes(currentHeadable)) {
            seals.push(currentHeadable)
          }

          return null
        })

        currentMeetingables.map(h => {
          const currentMeetingable = h['product']['name']

          if (!seals.includes(currentMeetingable)) {
            seals.push(currentMeetingable)
          }

          return null
        })

        currentThresholdables.map(h => {
          const currentThresholdable = h['product']['name']

          if (!seals.includes(currentThresholdable)) {
            seals.push(currentThresholdable)
          }

          return null
        })

        return null
      })
    }

    const lowestDbrw = Math.min(...dbrws)
    const highestDbrw = Math.max(...dbrws)

    return {
      ...props,
      lowestDbrw,
      highestDbrw,
      doorThicknesses,
      doorTypes,
      coreManufacturers,
      seals
    }
  },
  options: ({isPublished}) => ({
    variables: {isPublished}
  })
})

const mapStateToProps = ({
  filter: {
    isPublished,
    dbrw_gte,
    dbrw_lte,
    thickness_in,
    doorType_in,
    manufacturer_in,
    includeAssessments,
    glazedOnly,
    unglazedOnly
  },
  options: {orderBy},
  common: {showDbrwFilterTip}
}) => ({
  isPublished,
  orderBy,
  dbrw_gte,
  dbrw_lte,
  thickness_in,
  doorType_in,
  manufacturer_in,
  includeAssessments,
  glazedOnly,
  unglazedOnly,
  showDbrwFilterTip
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setOrderBy,
      incrementDbrwGte,
      decrementDbrwGte,
      incrementDbrwLte,
      decrementDbrwLte,
      setDbrwGte,
      setDbrwLte,
      setThicknessChoice,
      setDoorTypeChoice,
      setManufacturerChoice,
      clearFilter,
      toggleIncludeAssessments,
      setGlazedOnly,
      setUnglazedOnly
    },
    dispatch
  )

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapDataToProps
)(Filter)
