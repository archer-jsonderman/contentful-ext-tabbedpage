import React from 'react';
import styled from 'styled-components'
import Column from '../column/column'
import Toolbox from '../toolbox/toolbox'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
height:500px;
`

//this is the main board, a droppable area for columns reordering
//import the Column component in the mapping of props.data.columns
//in Column, it maps the task ids and rendered the task div based on the props
class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskids.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

//map over columns to build each component with its designated children
//on load, tool box is filled with any entry that isn't already in the list. Need to loop through tab arrays
export default class Board extends React.Component{
	
	handleDragEnd=result=>{
		const { destination, source, draggableId,type } = result;
		//no droppable active
	    if (!destination) return;
	    //droppable is the same container. no change	
	    if (
	      destination.droppableId === source.droppableId &&
	      destination.index === source.index
	    ) {
	      return;
		}
		
		
		if (type === 'column') {
	      const newColumnOrder = Array.from(this.props.columnOrder);
	      newColumnOrder.splice(source.index, 1);
	      newColumnOrder.splice(destination.index, 0, draggableId);
	
	      const newState = {
	        ...this.props,
	        columnOrder: newColumnOrder,
	      };
	      this.props.dropChange(newState);
	      return;
	    }
	
	    const home = this.props.columns[source.droppableId];
	    const foreign = this.props.columns[destination.droppableId];
	
	    if (home === foreign) {
	      const newTaskIds = Array.from(home.taskIds);
	      newTaskIds.splice(source.index, 1);
	      newTaskIds.splice(destination.index, 0, draggableId);
	
	      const newHome = {
	        ...home,
	        taskIds: newTaskIds,
	      };
	
	      const newState = {
	        ...this.props,
	        columns: {
	          ...this.props.columns,
	          [newHome.id]: newHome,
	        },
	      };
	
	      this.props.dropChange(newState);
	      return;
	    }
	
	    // moving from one list to another
	    const homeTaskIds = Array.from(home.taskIds);
	    homeTaskIds.splice(source.index, 1);
	    const newHome = {
	      ...home,
	      taskIds: homeTaskIds,
	    };
	
	    const foreignTaskIds = Array.from(foreign.taskIds);
	    foreignTaskIds.splice(destination.index, 0, draggableId);
	    const newForeign = {
	      ...foreign,
	      taskIds: foreignTaskIds,
	    };
	
	    const newState = {
	      ...this.props,
	      columns: {
	        ...this.props.columns,
	        [newHome.id]: newHome,
	        [newForeign.id]: newForeign,
	      },
	    };
	    this.props.dropChange(newState);
	  };

	render(){
		return(
			<DragDropContext onDragEnd={this.handleDragEnd}>
			
		
				
		        <Droppable
		          droppableId="all-columns"
		          direction="horizontal"
		          type="column"
		        >
		          {provided => (
		            <Container
		              {...provided.droppableProps}
		              ref={provided.innerRef}
		            >
		              {this.props.columnOrder.map((columnId, index) => {
		                const column = this.props.columns[columnId];
		                return (
		                  <InnerList
		                    key={column.id}
		                    column={column}
		                    taskMap={this.props.tasks}
		                    index={index}
		                  />
		                );
		              })}
		              {provided.placeholder}
		            </Container>
		          )}
		        </Droppable>
	      </DragDropContext>
			
			
			
		)
	}
}