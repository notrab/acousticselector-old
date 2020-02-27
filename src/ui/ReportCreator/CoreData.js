import React, {Component} from 'react'
import {gql, graphql} from 'react-apollo'
import styled from 'styled-components'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import Button from '../Button'
import media from '../../utils/media'
import {InputGroup, TextInput, ErrorNotice} from '../Form'

const Row = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
  `};
`

const Col = styled.div`
  &:first-child {
    width: 100%;
    margin-bottom: 1rem;

    ${media.tablet`
      width: 70%;
      margin-bottom: 0;
      margin-right: 1.5rem;
    `};
  }

  &:last-child {
    flex: 1;
  }
`

class CoreData extends Component {
  state = {
    useExistingCore: this.props.formData.useExistingCore || true,
    hasGlass: this.props.formData.hasGlass || false,
    manufacturerId: this.props.formData.manufacturerId || null,
    coreId: this.props.formData.coreId || null,
    name: this.props.formData.name || undefined,
    errors: {},
    doorType: this.props.formData.doorType || 'Single',
    fireRating: this.props.formData.fireRating || null,
    thickness: this.props.formData.thickness || null,
    glass: this.props.formData.glass || null
  }

  revertToUseExistingCore = e => {
    e.preventDefault()

    this.setState({
      useExistingCore: true
    })
  }

  handleCoreSelect = choice => {
    if (choice !== null) {
      this.setState({
        coreId: choice.value
      })
    } else {
      this.setState({
        coreId: ''
      })
    }
  }

  handleManufacturerSelect = choice => {
    if (choice !== null) {
      this.setState({
        manufacturerId: choice.value
      })
    } else {
      this.setState({
        manufacturerId: ''
      })
    }
  }

  handleNameSelect = choice => {
    if (choice !== null) {
      this.setState({
        name: choice.value
      })
    } else {
      this.setState({
        name: undefined
      })
    }
  }

  handleChange = e => {
    e.preventDefault()

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleUseNewCore = e => {
    e.preventDefault()

    this.setState({
      useExistingCore: false,
      coreId: ''
    })
  }

  handleGlazed = () => {
    this.setState({
      hasGlass: !this.state.hasGlass
    })
  }

  validateStep = () => {
    const {
      useExistingCore,
      coreId,
      manufacturerId,
      thickness,
      fireRating,
      doorType,
      hasGlass,
      glass
    } = this.state
    let errors = {}

    if (useExistingCore && !coreId) {
      errors.coreRequired = true
    }

    if (!useExistingCore && !manufacturerId) {
      errors.manufacturerRequired = true
    }

    if (!useExistingCore && !thickness) {
      errors.thicknessRequired = true
    }

    if (!useExistingCore && !fireRating) {
      errors.fireRatingRequired = true
    }

    if (!doorType) {
      errors.doorTypeRequired = true
    }

    if (hasGlass && !glass) {
      errors.glassRequired = true
    }

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  handleSubmit = async () => {
    const {useExistingCore, glass, doorType, hasGlass} = this.state
    let data = {doorType}

    if (useExistingCore) {
      const {coreId} = this.state

      data = {...data, coreId}
    } else {
      const {manufacturerId, name, thickness, fireRating} = this.state

      data = {
        ...data,
        core: {
          manufacturerId,
          name,
          thickness,
          fireRating
        }
      }
    }

    if (hasGlass && glass) {
      data = {
        ...data,
        glass
      }
    }

    await this.props.saveValues(data)

    if (!this.validateStep()) return

    this.props.goToNextStep()
  }

  render() {
    const {useExistingCore, hasGlass, errors, doorType} = this.state
    const {
      data: {allCores, allManufacturers, __type, loading, error},
      allNames
    } = this.props
    if (loading) return <p>Loading...</p>
    if (error)
      return <p>Unable to load manufacturer and core data. Try again later.</p>

    let coreOptions = []
    let manufacturerOptions = []
    let uniqueNames = []

    allCores.map(
      core =>
        (coreOptions = [
          ...coreOptions,
          {
            value: core.id,
            label: `${core.thickness} ${core.manufacturer.name}: ${core.name ||
              ''} (${core.fireRating})`
          }
        ])
    )

    allManufacturers.map(
      manufacturer =>
        (manufacturerOptions = [
          ...manufacturerOptions,
          {
            value: manufacturer.id,
            label: manufacturer.name
          }
        ])
    )

    allNames.map(
      name =>
        (uniqueNames = [
          ...uniqueNames,
          {
            value: name,
            label: name
          }
        ])
    )

    return (
      <div>
        <h2>About the door core</h2>

        <InputGroup invalid={errors.coreRequired}>
          <Row>
            <Col>
              <Select
                name="coreId"
                value={this.state.coreId || ''}
                onChange={this.handleCoreSelect}
                options={coreOptions}
                disabled={!useExistingCore}
                placeholder="Select existing core"
              />
            </Col>

            <Col>
              {useExistingCore && (
                <Button block onClick={this.toggleUseNewCore}>
                  Create New Core
                </Button>
              )}
              {!useExistingCore && (
                <Button block onClick={this.revertToUseExistingCore}>
                  Cancel
                </Button>
              )}
            </Col>
          </Row>

          {errors &&
            errors.coreRequired && <ErrorNotice>Core required</ErrorNotice>}
        </InputGroup>

        {!useExistingCore && (
          <div>
            <form>
              <InputGroup invalid={errors.manufacturerRequired}>
                <Select
                  name="manufacturerId"
                  value={this.state.manufacturerId || ''}
                  onChange={this.handleManufacturerSelect}
                  options={manufacturerOptions}
                />

                {errors &&
                  errors.manufacturerRequired && (
                    <ErrorNotice>Manufacturer required</ErrorNotice>
                  )}
              </InputGroup>

              <InputGroup>
                <TextInput
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Name? E.g. Rebated"
                />
              </InputGroup>

              <InputGroup invalid={errors.thicknessRequired}>
                <TextInput
                  name="thickness"
                  onChange={this.handleChange}
                  placeholder="Door thickness"
                />

                {errors &&
                  errors.thicknessRequired && (
                    <ErrorNotice>Thickness required</ErrorNotice>
                  )}
              </InputGroup>

              <InputGroup invalid={errors.fireRatingRequired}>
                <select
                  name="fireRating"
                  value={this.state.fireRating || ''}
                  onChange={e => this.handleChange(e)}>
                  <option key="select" value="">
                    Select a fire rating
                  </option>
                  {__type.enumValues.map((enumValue, index) => (
                    <option key={index} value={enumValue.name}>
                      {enumValue.name}
                    </option>
                  ))}
                </select>
                {errors &&
                  errors.fireRatingRequired && (
                    <ErrorNotice>Fire rating required</ErrorNotice>
                  )}
              </InputGroup>
            </form>
          </div>
        )}

        <InputGroup invalid={errors.doorTypeRequired}>
          <label>
            <input
              type="radio"
              name="doorType"
              value={doorType}
              defaultChecked={doorType === 'Single'}
              onChange={() => this.setState({doorType: 'Single'})}
            />
            Single
          </label>

          <label>
            <input
              type="radio"
              name="doorType"
              value={doorType}
              defaultChecked={doorType === 'Double'}
              onChange={() => this.setState({doorType: 'Double'})}
            />
            Double
          </label>

          {errors &&
            errors.doorTypeRequired && (
              <ErrorNotice>Door type required</ErrorNotice>
            )}
        </InputGroup>

        <label>
          <input
            type="checkbox"
            checked={hasGlass}
            onChange={this.handleGlazed}
          />Glazed?
        </label>

        {hasGlass && (
          <InputGroup invalid={errors.glassRequired}>
            <TextInput
              name="glass"
              placeholder="Glass"
              onChange={this.handleChange}
            />

            {errors &&
              errors.glassRequired && <ErrorNotice>Glass required</ErrorNotice>}
          </InputGroup>
        )}

        <hr />

        <Button primary onClick={this.handleSubmit}>
          Save & continue
        </Button>
      </div>
    )
  }
}

const Query = gql`
  query allManufacturers {
    allCores {
      id
      thickness
      manufacturer {
        id
        name
      }
      name
      fireRating
    }
    allManufacturers {
      id
      name
    }
    __type(name: "FireRating") {
      name
      enumValues {
        name
      }
    }
  }
`

export default graphql(Query, {
  props: ({ownProps, data}) => {
    const {loading} = data

    let allNames = []

    // const uniqueArray = originalArray => [...new Set(originalArray)];

    if (!loading) {
      allNames = [...allNames, 'My name']
    }

    return {
      ownProps,
      data,
      allNames
    }
  }
})(CoreData)
