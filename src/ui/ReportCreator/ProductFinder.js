import React, {Component} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import styled from 'styled-components'

import media from '../../utils/media'
import Button from '../Button'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.tablet`
    flex-direction: row;
  `};
`

const Col = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  ${media.tablet`
    width: 30%;
    margin-bottom: 0;
    margin-right: 1rem;

    &:first-child {
      flex: 1;
    }
  `};
`

class ProductFinder extends Component {
  state = {
    id: null,
    productType: null
  }

  handleChange = (choice, key) => {
    if (choice === null) {
      this.setState({
        [key]: ''
      })
    } else {
      this.setState({
        [key]: choice.value
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    const productToAdd = this.state

    this.setState(
      {
        id: null,
        productType: null
      },
      () => this.props.onSubmit(productToAdd)
    )
  }

  render() {
    const {id, productType} = this.state
    const {products} = this.props

    let productOptions = []

    products.map(
      product =>
        (productOptions = [
          ...productOptions,
          {
            value: product.id,
            label: product.name
          }
        ])
    )

    return (
      <Row>
        <Col>
          <Select
            autofocus={true}
            name="productId"
            value={id || ''}
            onChange={e => this.handleChange(e, 'id')}
            options={productOptions}
          />
        </Col>

        <Col>
          <Select
            name="productType"
            value={productType || ''}
            onChange={e => this.handleChange(e, 'productType')}
            disabled={!id}
            options={[
              {
                value: 'headables',
                label: 'Perimeter seal'
              },
              {
                value: 'meetingables',
                label: 'Meeting stile seal'
              },
              {
                value: 'thresholdables',
                label: 'Threshold Plate'
              },
              {
                value: 'letterplateables',
                label: 'Letter Plate'
              }
            ]}
          />
        </Col>

        <Col>
          <Button block onClick={this.handleSubmit} disabled={!productType}>
            Add
          </Button>
        </Col>
      </Row>
    )
  }
}

export default ProductFinder
