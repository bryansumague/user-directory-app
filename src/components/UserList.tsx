import React from 'react';
import { Grid, List, ListItem, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import UserCard from './UserCard';
import type { UserListProps } from '../types';

const UserList: React.FC<UserListProps> = ({ users, viewMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Force list view on mobile regardless of selected view mode
  const effectiveViewMode = isMobile ? 'list' : viewMode;

  if (!users.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="body1" color="text.secondary">
          No users found. Try adjusting your search.
        </Typography>
      </Box>
    );
  }

  if (effectiveViewMode === 'grid') {
    return (
      <Box
        role="list"
        sx={{ width: '100%', mt: 2 }}
      >
        <Grid 
          container 
          spacing={2} 
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'  // 3 equal columns on desktop
            },
            gap: 3,
            '& > .MuiGrid-item': {
              width: '100%',
              maxWidth: '100%',
              flexBasis: 'unset',
              padding: 0
            }
          }}
        >
          {users.map((user) => (
            <Grid 
              item 
              key={user.id}
              role="listitem"
              sx={{ 
                display: 'flex',
                height: '100%'
              }}
            >
              <UserCard user={user} viewMode={effectiveViewMode} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <List
      role="list"
      sx={{
        width: '100%',
        borderRadius: 1
      }}
    >
      {users.map((user) => (
        <ListItem key={user.id} role="listitem" sx={{ py: 1.5 }}>
          <UserCard user={user} viewMode={effectiveViewMode} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;