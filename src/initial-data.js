const initialData = {
  "tasks": {
    "task-1": { "id": "task-1", "content": "Take out the garbage" },
    "6CzkAfV8NmEfr4x9eSTuY7": { "id": "6CzkAfV8NmEfr4x9eSTuY7", "content": "Watch my favorite show" },
    "task-3": { "id": "task-3", "content": "Charge my phone" },
    "task-4": { "id": "task-4", "content": "Cook dinner" },
  },
  "columns": {
	  "toolbox":{
		  
	  }
    "column-1": {
      "id": "column-1",
      "title": "To do",
      "taskids": [],
    },
    "column-2": {
      "id": "column-2",
      "title": "Done",
      "taskids": [ ],
    }
  },
  // Facilitate reordering of the columns
  "columnOrder": ["column-1","column-2"],
};

export default initialData;