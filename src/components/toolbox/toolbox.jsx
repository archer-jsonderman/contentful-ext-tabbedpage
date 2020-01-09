import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../item/item'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 30%;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const ItemList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Toolbox extends React.Component {
  render() {
    return (
      <Container>
        <Title>Toolbox</Title>
        <Droppable droppableId='toolbox'>
          {(provided, snapshot) => (
            <ItemList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {Object.keys(this.props.tasks).map((task, index) => {
	              
                return <Item key={this.props.tasks[task].id} task={this.props.tasks[task]} index={index} />
              })}
              {provided.placeholder}
            </ItemList>
          )}
        </Droppable>
      </Container>
    );
  }
}
