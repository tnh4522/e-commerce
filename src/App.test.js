import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('./components/Layout/Header', () => function HeaderMock() {
  return <header>Header</header>;
});

jest.mock('./components/Layout/Footer', () => function FooterMock() {
  return <footer>Footer</footer>;
});

import App from './App';

test('renders e-commerce layout', () => {
  render(
    <MemoryRouter>
      <App>
        <main>Shop content</main>
      </App>
    </MemoryRouter>
  );

  expect(screen.getByText(/Header/i)).toBeInTheDocument();
  expect(screen.getByText(/Shop content/i)).toBeInTheDocument();
  expect(screen.getByText(/Footer/i)).toBeInTheDocument();
});
