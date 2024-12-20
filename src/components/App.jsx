import React from 'react'
import TodoIst from './TodoIst'
import TodoCreator from './TodoCreator'
import Filters from './Filters'
import styles from './App.module.css'
import { generateTodos } from '../utils/generate-todos'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      title: '',
      description: '',
      showOnlyIncomplete: false,
      severityFilter: [],
      searchQuery: '',
      errorMessage: '',
      selectedSeverity: 'Срочно',
      isFilterApplied: false,
    }
  }

  render() {
    const {
      todos,
      title,
      description,
      showOnlyIncomplete,
      severityFilter,
      searchQuery,
      errorMessage,
      selectedSeverity,
      isFilterApplied,
    } = this.state

    const uniqueSeverities = [...new Set(todos.map((todo) => todo.severity))]

    const filteredTodos = todos
      .filter((todo) => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase()
        const matchesSearch =
          todo.title.toLowerCase().includes(lowerCaseSearchQuery) ||
          todo.description.toLowerCase().includes(lowerCaseSearchQuery)
        const matchesSeverity = severityFilter.length
          ? severityFilter.includes(todo.severity)
          : true
        const matchesCompletion = showOnlyIncomplete ? !todo.completed : true

        return matchesSearch && matchesSeverity && matchesCompletion
      })
      .sort((a, b) => a.completed - b.completed)

    return (
      <div className={styles.todoApp}>
        <div className={styles.firstRow}>
          <h1>TODOIST</h1>
          <Filters
            searchQuery={searchQuery}
            onSearchChange={this.handleSearchChange}
          />
        </div>

        <div className={styles.content}>
          <Filters
            showOnlyIncomplete={showOnlyIncomplete}
            onToggleFilter={this.handleToggleFilter}
            severityFilter={severityFilter}
            uniqueSeverities={uniqueSeverities}
            onSeverityFilterChange={this.handleSeverityFilterChange}
          />

          <TodoIst
            todos={filteredTodos}
            onToggleComplete={this.handleToggleComplete}
            onDeleteTodo={this.handleDeleteTodo}
            isFilterApplied={isFilterApplied}
          />
        </div>

        <TodoCreator
          title={title}
          description={description}
          selectedSeverity={selectedSeverity}
          errorMessage={errorMessage}
          handleTitleChange={(e) =>
            this.setState({ title: e.target.value, errorMessage: '' })
          }
          handleDescriptionChange={(e) =>
            this.setState({ description: e.target.value })
          }
          handleSeverityChange={(severity) =>
            this.setState({ selectedSeverity: severity })
          }
          onAddTodo={this.handleAddTodo}
        />

        <div className={styles.buttonContainer}>
          <button className={styles.generateTasks} onClick={this.generateTasks}>
            Сгенерировать 1000 задач
          </button>
        </div>
      </div>
    )
  }

  handleAddTodo = () => {
    const { title, description, todos, selectedSeverity } = this.state
    const trimmedTitle = title.trim()

    if (trimmedTitle === '') {
      this.setState({
        errorMessage: 'Название не может быть пустым.',
        title: '',
      })
      return
    }

    const newTodo = {
      id: Date.now(),
      title: trimmedTitle,
      description: description.trim(),
      completed: false,
      severity: selectedSeverity,
      createdAt: new Date().getTime(),
    }

    this.setState((prevState) => ({
      todos: [newTodo, ...prevState.todos],
      title: '',
      description: '',
      errorMessage: '',
      selectedSeverity: 'Срочно',
    }))
  }

  generateTasks = () => {
    const todos = generateTodos(1000)
    this.setState({ todos })
  }

  handleToggleFilter = () => {
    this.setState((prevState) => ({
      showOnlyIncomplete: !prevState.showOnlyIncomplete,
    }))
  }

  handleToggleComplete = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }))
  }

  handleDeleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }))
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value, isFilterApplied: true })
  }

  handleSeverityChange = (e) => {
    this.setState({ selectedSeverity: e.target.value })
  }

  handleSeverityFilterChange = (e) => {
    const value = e.target.value
    this.setState((prevState) => {
      const severityFilter = prevState.severityFilter.includes(value)
        ? prevState.severityFilter.filter((severity) => severity !== value)
        : [...prevState.severityFilter, value]
      return { severityFilter, isFilterApplied: true }
    })
  }
}

export default App
