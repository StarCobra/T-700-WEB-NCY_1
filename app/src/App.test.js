import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

//eslint-disable-next-line
test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  //eslint-disable-next-line
  expect(linkElement).toBeInTheDocument()
})
