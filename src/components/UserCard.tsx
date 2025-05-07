import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Divider, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { UserCardProps } from '../types';

const UserCard: React.FC<UserCardProps> = ({ user, viewMode }) => {
  const isListView = viewMode === 'list';

  const GridViewLayout = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box alignItems="flex-start" display="flex" mb={2}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 56, 
              height: 56, 
              mr: 2,
              fontWeight: 'bold'
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0, flexGrow: 1, textAlign: 'left' }}>
            <Typography variant="h6" component="h2" gutterBottom={false} noWrap align="left">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap align="left">
              @{user.username}
            </Typography>
          </Box>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <Divider />
      </Grid>
      
      <Grid item xs={12}>
        <Box display="flex" alignItems="flex-start">
          <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary', flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary" noWrap sx={{ flexGrow: 1 }} align="left">
            {user.email}
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <Box display="flex" alignItems="flex-start">
          <LocationOnIcon fontSize="small" sx={{ mr: 1, mt: 0.3, color: 'text.secondary', flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }} align="left">
            {user.address.street}, {user.address.city}, {user.address.zipcode}
          </Typography>
        </Box>
      </Grid>
      
      {user.company && (
        <Grid item xs={12} sx={{ textAlign: 'left' }}>
          <Box mt={1} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Chip 
              label={user.company.name} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );

  const ListViewLayout = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' }, // Stack content on small screens
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          width: 56,
          height: 56,
          fontWeight: 'bold',
          fontSize: '1.25rem',
        }}
      >
        {user.name.charAt(0)}
      </Avatar>
  
      {/* Name + Username */}
      <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          @{user.username}
        </Typography>
      </Box>
  
      {/* Email */}
      <Box
        sx={{
          flex: 1.2,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}
      >
        <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary" noWrap>
          {user.email}
        </Typography>
      </Box>
  
      {/* Address */}
      <Box
        sx={{
          flex: 1.5,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}
      >
        <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary" noWrap>
          {user.address.street}, {user.address.city}, {user.address.zipcode}
        </Typography>
      </Box>
  
      {user.company?.name && (
        <Box sx={{ flex: 0.8, minWidth: 0, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
          <Chip
            label={user.company.name}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ whiteSpace: 'nowrap' }}
          />
        </Box>
      )}

    </Box>
  );

  return (
    <Card
      role="article"
      aria-labelledby={`user-card-title-${user.id}`}
      aria-describedby={`user-card-description-${user.id}`}
      sx={{ 
        height: '100%', 
        width: '100%',
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2, textAlign: 'left' }}>
        {isListView ? ListViewLayout : GridViewLayout}
      </CardContent>
    </Card>
  );
};

export default UserCard;
