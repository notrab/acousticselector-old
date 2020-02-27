import React, {Component} from 'react';

export default WrappedComponent =>
  class PopupWrapper extends Component {
    componentDidMount() {
      document.body.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
      document.body.removeEventListener('click', this.onClick);
    }

    // wrappedComponent

    onClick = event => {
      // const {handleClick} = this.props;
      // const element = this.wrappedComponent;
      //
      // if (!element.contains(event.target)) {
      //   handleClick(event);
      // }
      // if (container.contains(event.target) && container !== event.target)
    };

    render() {
      return (
        <div
          ref={ref => {
            this.wrappedComponent = ref;
          }}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
