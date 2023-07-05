# ToDoList

To-Do List - interactive, responsive, local tasks list, where user can add, edit, delete and mark tasks as checked (completed) or unchecked (uncompleted).

View project: https://prziskr.github.io/ToDoList/

## Adding tasks

To add a task, user needs to insert information about task-name and task-date in inputs. If there is an empty input, underneath **Task List** header will appear an error information:

> Insert task name and task date to add new task!

If the user filled inputs correctly and clicked **ADD**, a new list item will be assigned to ul list with matching date. Above each ul list there is an H4 heading. Possible list headers:

- Past Tasks
- DEADLINE: next 7 days
- DEADLINE: next 30 days
- DEADLINE: later than next 30 days

## Editing tasks

To edit the task, the user needs to click **EDIT** button located on the certain task element. Afterward, the edit popup will appear (popup looks different on mobile and desktop devices). Edit window allows the user to edit task-name, task-date, or both at once. User can **APPLY** the changes or **CANCEL** them by clicking the buttons.

If user wants to apply changes but here is an empty input, below inputs will appear an error information:

> INSERT TASK NAME AND TASK DATE TO APPLY CHANGES!

If, while editing a task, the user changed the date so that it no longer corresponds to the current date range, the task will be removed from the current ul list and added to the correct one.

## Deleting tasks

To delete a task, the user needs to click the red **X** button to the right of the **EDIT** button. Afterward, confirm window will appear, asking:

> Are you sure you want to delete this taks?

When a task is deleted and the ul list it was on no longer contains any tasks, the list and H4 header will be hidden.

When a task is deleted and there are no more tasks in any list, underneath **Task List** header will appear the following information:

> No tasks on the list.

## Marking tasks as checked (completed) or unchecked (uncompleted)

To mark a task as checked (completed), the user needs to click the button with circle symbol **◯** to the right of the **EDIT** button. The symbol on the button will turn into a circle with a checkmark inside **✓**. The task name will be crossed out (line through).

To mark a task as unchecked (uncompleted), the user must proceed in the same way as in the first case.
