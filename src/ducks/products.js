export const GET_PRODUCT = 'products/GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'products/GET_PRODUCT_SUCCESS';

const initialState = {
  loading: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        loading: true
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload.product],
        loading: false
      };

    default:
      return state;
  }
};

const getProductSuccess = product => ({
  type: GET_PRODUCT_SUCCESS,
  payload: {product}
});

const getProductViaApi = slug => {
  return dispatch => {
    fetch(`https://norseal.co.uk/api/products/${slug}`)
      .then(res => res.json())
      .then(res => {
        const {product_cads, documents} = res;
        const downloads = [...documents, ...product_cads];

        const product = {
          name: res.name,
          type: res.product_type.name,
          manufacturer: res.manufacturer.name,
          thumbnail: res.thumbnail,
          downloads,
          url: `https://www.norseal.co.uk/browse/${res.primary_collection
            .slug}/${slug}`
        };

        // dispatch(getProductSuccess(product));
      });
  };
};

export const getProductBySlug = slug => {
  return (dispatch, getState) => {
    const {products: {items}} = getState();

    const found = items.filter(i => i.slug === slug);

    dispatch({type: GET_PRODUCT});
  };
};
