import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FirstVisitProvider } from '../FirstVisitProvider'

describe('FirstVisitProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render children with first visit state', async () => {
    render(
      <FirstVisitProvider languages={['en', 'he', 'es']}>
        {({ isFirstVisit, languages }) => (
          <div className="test-container">
            <div className="first-visit" data-testid="first-visit">
              {isFirstVisit ? 'yes' : 'no'}
            </div>
            <div className="languages" data-testid="languages">
              {languages.join(',')}
            </div>
          </div>
        )}
      </FirstVisitProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('first-visit')).toHaveTextContent('yes')
    })
    expect(screen.getByTestId('languages')).toHaveTextContent('en,he,es')
  })

  it('should allow selecting a language', async () => {
    const user = userEvent.setup()

    render(
      <FirstVisitProvider languages={['en', 'he', 'es']}>
        {({ isFirstVisit, selectLanguage }) =>
          isFirstVisit ? (
            <button
              className="select-button"
              onClick={() => selectLanguage('en')}
            >
              Select English
            </button>
          ) : (
            <div className="selected" data-testid="selected">
              Language selected
            </div>
          )
        }
      </FirstVisitProvider>
    )

    const button = await screen.findByText('Select English')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('selected')).toBeInTheDocument()
    })
  })
})
