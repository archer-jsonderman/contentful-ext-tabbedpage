import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import update from 'immutability-helper'
import styled from 'styled-components'
import './index.css';
import '@atlaskit/css-reset';
import Board from './components/board/board'
import initialData from './initial-data';


const AppContainer=styled.div`
min-height:500px;
`
export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };
  
  //detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    
  }
  _isMounted = false;

  componentDidMount() {
	this._isMounted = true;
    this.props.sdk.window.startAutoResizer();
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
    console.log(this.state, 'init')
    if (this._isMounted) {
	      this.props.sdk.space.getEntries({content_type:'programInfo'})
		  	.then(response=>{
			  	const update = this.getDefaultItems(response.items);
			  	this.setState(update,()=>console.log(this.state, 'mount'))
		  	})
  	}

  }
componentWillMount(){
	  this.props.sdk.window.updateHeight();
	  this.props.sdk.window.startAutoResizer();
	  this.setState(this.props.sdk.field.getValue());
	  
	  }
  componentWillUnmount() {
    if (this.detachExternalChangeHandler)this.detachExternalChangeHandler();
    this._isMounted=false;  
  }
  
  getDefaultItems=(props)=>{
	  const currentEntries = this.state;
	  ;currentEntries.value=undefined
	  props.map((key,index)=>{
		  const title = props[index].fields.programTitle['en-US']
		  
		  currentEntries.tasks[props[index].sys.id]={id:props[index].sys.id,content:title}
		  currentEntries.columns['column-1'].taskids.push(props[index].sys.id)
	  })
	  //this is causing great issue with the loading of components
	  	console.log(currentEntries, 'initupdate')
	  return currentEntries;	  
  }
  onExternalChange = value => {
    this.setState({ value });
  }
  handleDropChange = (props) =>{
	  this.setState({...props})
  }
  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({ value });
    if (value) {
      this.props.sdk.field.setValue(value);
    } else {
      this.props.sdk.field.removeValue();
    }
  };

  render() {

    return (
	    <AppContainer>
      <Board
        id="my-field"
        testId="my-field"
        dropChange = {this.handleDropChange}
        {...this.state}
      />
      </AppContainer>
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
