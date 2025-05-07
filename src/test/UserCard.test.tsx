import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserCard from '../components/UserCard';
import type { User } from '../types';

describe('UserCard Component', () => {
  const mockUser: User = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  };

  it('renders full user information correctly (List View)', () => {
    render(<UserCard user={mockUser} viewMode="list" />);
    
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('Kulas Light, Gwenborough, 92998-3874')).toBeInTheDocument();
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
  });

  it('renders user with missing optional fields', () => {
    const userWithMissingFields: User = {
      id: 2,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      address: {
        street: 'Test Street',
        city: 'Test City',
        zipcode: '12345'
      }
    };

    render(<UserCard user={userWithMissingFields} viewMode="list" />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test Street, Test City, 12345')).toBeInTheDocument();

    // Should not render any company chip
    expect(screen.queryByRole('button', { name: /Test Company/i })).not.toBeInTheDocument();
  });
});
