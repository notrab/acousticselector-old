import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeSlider = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

export const dbHandle = props => {
  const {value, dragging, index, ...rest} = props;

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}>
      <Handle {...rest} />
    </Tooltip>
  );
};

const Range = styled(RangeSlider)`
  .rc-slider-rail {
    background-color: ${({theme}) => theme.grey};
    border-radius: 8px;
  }
  .rc-slider-track {
    background-color: ${({theme}) => theme.orange};
  }
  .rc-slider-handle {
    border-color: ${({theme}) => theme.orange};
  }
  .rc-slider-handle:hover {
    border-color: ${({theme}) => theme.darkBlue};
  }
`;

export default Range;
