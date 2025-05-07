export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    suite?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface UserCardProps {
  user: User;
  viewMode: 'grid' | 'list';
}

export interface UserListProps {
  users: User[];
  viewMode: 'grid' | 'list';
}