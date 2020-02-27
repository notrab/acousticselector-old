import React from 'react';

const ProductPreview = ({name, slug, thumbnail, onRemove}) => (
  <div>
    <img src={thumbnail} width="50" alt={name} title={name} />
    <h3>{name}</h3>
    <button onClick={onRemove}>&times;</button>
  </div>
);

export default ProductPreview;
