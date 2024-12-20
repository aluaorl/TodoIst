import React from 'react'
import Todo from './Todo'
import styles from './TodoIst.module.css'

class TodoIst extends React.Component {
  render() {
    const { todos, onToggleComplete, onDeleteTodo, isFilterApplied } =
      this.props

    return (
      <div className={styles.todoList}>
        {todos.length === 0 && isFilterApplied && (
          <div>По вашим критериям ничего не найдено.</div>
        )}
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default TodoIst
