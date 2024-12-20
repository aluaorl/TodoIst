import React from 'react'
import styles from './Filters.module.css'

class Filters extends React.Component {
  render() {
    const {
      searchQuery,
      onSearchChange,
      showOnlyIncomplete,
      onToggleFilter,
      severityFilter,
      uniqueSeverities,
      onSeverityFilterChange,
    } = this.props

    return (
      <div className={styles.filters}>
        {onSearchChange && (
          <input
            className={styles.searchInput}
            type="text"
            placeholder="   Поиск"
            value={searchQuery}
            onChange={onSearchChange}
          />
        )}
        {onToggleFilter && (
          <label className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={showOnlyIncomplete}
              onChange={onToggleFilter}
            />
            Скрыть
            <br />
            выполненные
          </label>
        )}
        {onSeverityFilterChange && (
          <div className={styles.severityContainer}>
            <p className={styles.severity}>Важность</p>
            {uniqueSeverities.map((severity) => (
              <label key={severity} className={styles.severityLabel}>
                <input
                  type="checkbox"
                  value={severity}
                  checked={severityFilter.includes(severity)}
                  onChange={onSeverityFilterChange}
                />
                {severity}
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Filters
