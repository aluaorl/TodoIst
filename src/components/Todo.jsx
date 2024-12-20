import React, { PureComponent } from 'react'
import styles from './Todo.module.css'

class Todo extends PureComponent {
  render() {
    const { todo, onToggleComplete, onDeleteTodo } = this.props
    return (
      <li
        className={`${styles.todo} ${todo.completed ? styles.completed : ''}`}
      >
        <div className={styles.todoContent}>
          <div className={styles.todoHeader}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
            />
            <p className={styles.todoTitle}>{todo.title}</p>
            <span className={styles.todoDate}>
              {new Date(todo.createdAt).toLocaleString()}
              <button
                className={styles.deleteButton}
                onClick={() => onDeleteTodo(todo.id)}
              >
                УДАЛИТЬ
              </button>
              <button
                className={styles.deleteIcon}
                onClick={() => onDeleteTodo(todo.id)}
              >
                ❌
              </button>
            </span>
          </div>
          <div className={styles.todoDescription}>
            <p>{todo.description}</p>
            <p className={styles.todoSeverity}>{todo.severity}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default Todo
