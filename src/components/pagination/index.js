import React from 'react'
import PropTypes from 'prop-types'

export const PageWithText = ({
  activeClassNames = 'btn btn-default bg-blue-500 hover:bg-blue-600 text-white',
  inactiveClassNames = 'btn btn-default bg-transparent hover:bg-grey-200 text-grey-900 dark:text-white',
  children,
  active = false,
  onClick
}) => {
  if (active) {
    return (
      <button onClick={onClick} className={activeClassNames}>
        {children}
      </button>
    )
  }
  return (
    <button onClick={onClick} className={inactiveClassNames}>
      {children}
    </button>
  )
}

export const Page = ({
  activeClassNames = 'btn btn-circle bg-blue-500 hover:bg-blue-600 text-white',
  inactiveClassNames = 'btn btn-circle bg-transparent hover:bg-grey-200 text-grey-900 dark:text-white',
  children,
  active = false,
  onClick
}) => {
  if (active) {
    return (
      <button onClick={onClick} className={activeClassNames}>
        {children}
      </button>
    )
  }
  return (
    <button onClick={onClick} className={inactiveClassNames}>
      {children}
    </button>
  )
}

export const Pages = ({items, active, onClick}) => (
  <>
    {items.map(i => (
      <Page onClick={onClick} active={i + 1 === 5 ? true : false} key={i}>
        {i + 1}
      </Page>
    ))}
  </>
)

Pages.propTypes = {
  items: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired
}

export const Pagination = ({
  items,
  active,
  previous = null,
  next = null,
  icons = false,
  onClick
}) => {
  if (icons) {
    return (
      <div className="flex flex-wrap items-center justify-start space-x-2 pagination">
        {previous && <Page onClick={onClick}>{previous}</Page>}
        <Pages onClick={onClick} items={items} active={active} />
        {next && <Page onClick={onClick}>{next}</Page>}
      </div>
    )
  }
  return (
    <div className="flex flex-wrap items-center justify-start space-x-2 pagination">
      {previous && <PageWithText onClick={onClick}>{previous}</PageWithText>}
      <Pages onClick={onClick} items={items} active={active} />
      {next && <PageWithText onClick={onClick}>{next}</PageWithText>}
    </div>
  )
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  previous: PropTypes.any.isRequired,
  next: PropTypes.any.isRequired,
  icons: PropTypes.bool
}
