import React, {Component} from 'react'

import Wrapper from './Wrapper'
import Thumbnail from './Thumbnail'
import Detail from './Detail'
import Title from './Title'
import SubTitle from './SubTitle'
import Downloads from './Downloads'
import Dropdown from '../Dropdown'
import DropdownItem from '../Dropdown/Item'
import Button from '../Button'
import LoadingSpinner from '../LoadingSpinner'

export default class ProductPreview extends Component {
  state = {
    requestFailed: false,
    loading: true,
    downloads: []
  }

  componentDidMount() {
    const {slug} = this.props

    fetch(`https://www.norseal.co.uk/api/products/${slug}`)
      .then(res => res.json())
      .then(res => {
        const {product_cads, documents} = res
        const downloads = [...documents, ...product_cads]

        this.setState(prevState => ({
          ...prevState,
          name: res.name,
          type: res.product_type.name,
          manufacturer: res.manufacturer.name,
          thumbnail: res.thumbnail,
          downloads,
          url: `https://www.norseal.co.uk/browse/${res.primary_collection
            .slug}/${slug}?ref=acousticselector`,
          loading: false
        }))
      })
      .catch(err => {
        console.error(err)

        this.setState({
          loading: false,
          requestFailed: true
        })
      })
  }

  render() {
    const {
      requestFailed,
      name,
      url,
      type,
      manufacturer,
      thumbnail,
      downloads,
      loading
    } = this.state

    if (loading) {
      return (
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      )
    }

    if (requestFailed) return <p>More details are currently unavailable.</p>

    return (
      <Wrapper>
        <Thumbnail>
          <img src={thumbnail} alt={name} />
        </Thumbnail>
        <Detail>
          <Title href={url} target="_blank">
            {name}
          </Title>
          <SubTitle>
            {type} by {manufacturer}
          </SubTitle>
        </Detail>

        <Downloads>
          {downloads.length > 0 && (
            <Dropdown>
              <Button small>Downloads</Button>
              <div>
                {downloads.map((doc, i) => {
                  const url = doc.cad === undefined ? doc.url : doc.cad
                  const title = doc.title === undefined ? doc.name : doc.title

                  return (
                    <DropdownItem
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener">
                      {title}
                    </DropdownItem>
                  )
                })}
              </div>
            </Dropdown>
          )}
        </Downloads>
      </Wrapper>
    )
  }
}
