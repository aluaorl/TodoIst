import React from 'react'
import styles from './TodoCreator.module.css'

class TodoCreator extends React.Component {
  render() {
    const {
      title,
      description,
      selectedSeverity,
      errorMessage,
      handleTitleChange,
      handleDescriptionChange,
      handleSeverityChange,
      onAddTodo,
    } = this.props

    return (
      <div className={styles.addTaskForm}>
        <h2>ДОБАВИТЬ ЗАДАЧУ</h2>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <div className={styles.nameRow}>
          <p className={styles.name}>Название</p>
          <textarea
            className={styles.title}
            placeholder="Введите название задачи"
            value={title}
            onChange={handleTitleChange}
            rows="1"
          />
        </div>
        <div className={styles.descriptionRow}>
          <p className={styles.name}>Описание</p>
          <textarea
            className={styles.description}
            placeholder="Введите описание задачи"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
          />
        </div>
        <div className={styles.severitySelector}>
          <p className={styles.name}>Важность</p>
          <div className={styles.severityButtons}>
            {['Срочно', 'Средне', 'Не срочно'].map((severity) => (
              <button
                key={severity}
                className={`${styles.severityButton} ${
                  selectedSeverity === severity ? styles.active : ''
                }`}
                onClick={() => handleSeverityChange(severity)}
              >
                {severity}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.addTodo} onClick={onAddTodo}>
            ДОБАВИТЬ
          </button>
        </div>
      </div>
    )
  }
}

export default TodoCreator
