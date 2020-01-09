import React from 'react';
import styled from 'styled-components'
import Item from '../item/item'
import {Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 30%;

  display: flex;
  flex-direction: column;
  `
const ItemList = styled.div`
 padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  min-height: 100px;
`
const Title = styled.h3`
padding: 8px;
`

//map over columns proprty, each property contains a list of task ids
//on return, call Item with the list of Task Ids and the Tasks prop
function Items(props){
	//const item = props.data.[]
	return(
		<div className="itemBox">
		{props['column-1'].taskIds}
		</div>
	)
}
class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.tasks.map((task, index) => (
      <Item key={task.id} task={task} index={index} />
    ));
  }
}
export default class Column extends React.Component{
	
	render(){
		//console.log(this.props,' column')
		return(
			<Draggable draggableId={this.props.column.id} index={this.props.index}>
		        {provided => (
		          <Container {...provided.draggableProps} ref={provided.innerRef}>
		            <Title {...provided.dragHandleProps}>
		              {this.props.column.title}
		            </Title>
		            <Droppable droppableId={this.props.column.id} type="item">
		              {(provided, snapshot) => (
		                <ItemList
		                  ref={provided.innerRef}
		                  {...provided.droppableProps}
		                  isDraggingOver={snapshot.isDraggingOver}
		                >
		                  <InnerList tasks={this.props.tasks} />
		                  {provided.placeholder}
		                </ItemList>
		              )}
		            </Droppable>
		          </Container>
		        )}
	      </Draggable>
		)
	}
}