import React, {Component} from 'react'
import {gql, graphql} from 'react-apollo'

import ProductFinder from './ProductFinder'
import ProductPreview from './ProductPreview'
import Button from '../Button'

class SealConfiguration extends Component {
  state = {
    headables: this.props.formData.headables || [],
    meetingables: this.props.formData.meetingables || [],
    thresholdables: this.props.formData.thresholdables || [],
    letterplateables: this.props.formData.letterplateables || []
  }

  componentDidMount() {
    console.log(this.props)
  }

  handleSubmit = e => {
    e.preventDefault()

    const {
      headables,
      meetingables,
      thresholdables,
      letterplateables
    } = this.state

    this.props.saveValues({
      headables,
      meetingables,
      thresholdables,
      letterplateables
    })

    this.props.goToNextStep()
  }

  addProduct = ({id, productType}) => {
    this.setState({
      [productType]: [
        ...this.state[productType],
        {
          productId: id
        }
      ]
    })
  }

  removeProduct = (index, productType) => {
    const products = this.state[productType]

    this.setState({
      [productType]: [...products.slice(0, index), ...products.slice(index + 1)]
    })
  }

  findProductById = id =>
    this.props.data.allProducts.find(product => product.id === id)

  render() {
    const {
      headables,
      meetingables,
      thresholdables,
      letterplateables
    } = this.state
    const {data: {loading, allProducts}} = this.props

    if (loading) return <p>Loading...</p>

    return (
      <div>
        <h1>Add new product</h1>

        {!loading && (
          <ProductFinder onSubmit={this.addProduct} products={allProducts} />
        )}

        {headables.length > 0 && (
          <div>
            <h2>Perimeter</h2>
            <ul>
              {headables.map((headable, index) => (
                <ProductPreview
                  key={index}
                  {...this.findProductById(headable.productId)}
                  onRemove={this.removeProduct.bind(null, index, 'headables')}
                />
              ))}
            </ul>
          </div>
        )}

        {thresholdables.length > 0 && (
          <div>
            <h2>Threshold</h2>
            <ul>
              {thresholdables.map((headable, index) => (
                <ProductPreview
                  key={index}
                  {...this.findProductById(headable.productId)}
                  onRemove={this.removeProduct.bind(
                    null,
                    index,
                    'thresholdables'
                  )}
                />
              ))}
            </ul>
          </div>
        )}

        {meetingables.length > 0 && (
          <div>
            <h2>Meeting Stile</h2>
            <ul>
              {meetingables.map((meetingable, index) => (
                <ProductPreview
                  key={index}
                  {...this.findProductById(meetingable.productId)}
                  onRemove={this.removeProduct.bind(
                    null,
                    index,
                    'meetingables'
                  )}
                />
              ))}
            </ul>
          </div>
        )}

        {letterplateables.length > 0 && (
          <div>
            <h2>Letter Plate</h2>
            <ul>
              {letterplateables.map((letterplate, index) => (
                <ProductPreview
                  key={index}
                  {...this.findProductById(letterplate.productId)}
                  onRemove={this.removeProduct.bind(
                    null,
                    index,
                    'letterplateables'
                  )}
                />
              ))}
            </ul>
          </div>
        )}

        <hr />

        <Button onClick={this.handleSubmit}>Save and continue</Button>

        <Button onClick={this.props.goToPreviousStep}>Go back</Button>
      </div>
    )
  }
}

const withData = graphql(
  gql`
    query allProducts {
      allProducts {
        id
        name
        slug
      }
    }
  `
  // {
  //   props: props => {
  //     console.log(props)
  //     const {
  //       headables = [],
  //       meetingables = [],
  //       thresholdables = [],
  //       letterplateables = []
  //     } = props.ownProps = []
  //
  //     return {
  //       ...props,
  //       headables,
  //       meetingables,
  //       thresholdables,
  //       letterplateables
  //     }
  //   }
  // }
)

export default withData(SealConfiguration)
