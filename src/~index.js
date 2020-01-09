import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import App from './app'

export class UIX extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);  }
//dialogs: this.props.sdk.dialogs.... OpenExtension. 
  componentDidMount() {
   // this.props.sdk.window.startAutoResizer();
    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    //this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    this.setState({ value });
  };
  openDialog=()=>{
	  console.log(this.props.sdk)
	  this.props.sdk.dialogs.openExtension(
		  {
			  title:"Tabs",
			  width:"fullWidth",
			  shouldCloseOnOverlayClick:true,
			  
			  
			  
			  }
	  )
  }

  render() {

	  //console.log(dialogs)
    return (
	    <>
	    <button
	      onClick={this.openDialog}>
	      Open media
	      </button>
        </>
    );
  }
}

init(sdk => {
  ReactDOM.render(<UIX sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
