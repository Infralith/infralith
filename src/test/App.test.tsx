import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query-client';
import App from '../App';

function renderApp() {
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}

describe('App', () => {
  it('renders the chat landing page initially', () => {
    renderApp();
    expect(screen.getAllByText(/Infralith/).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Describe your infrastructure/)).toBeInTheDocument();
  });
});
