import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container, Typography, Box, CircularProgress, Alert, TextField,
  ToggleButtonGroup, ToggleButton, Paper, InputAdornment, AppBar, Toolbar
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import UserList from './components/UserList';
import { fetchUsers } from './api';
import type { User } from './types';
import './App.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f5f5',
          overflowY: 'scroll', // Always show vertical scrollbar
        },
      },
    },
  },
});

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleViewModeChange = useCallback((
    _: React.MouseEvent<HTMLElement>,
    newViewMode: 'grid' | 'list' | null,
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <AppBar 
          position="sticky" 
          elevation={1} 
          sx={{ 
            mb: 3,
            bgcolor: 'white',
            color: 'text.primary',
            width: '100%',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
                User Directory
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: 4, 
            mb: 8,
            pl: { xs: 0, sm: 0, md: 0 }, // Remove left padding
            pr: { xs: 0, sm: 0, md: 0 }  // Remove right padding
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between">
                <TextField
                  label="Search users"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ flexGrow: 1, maxWidth: { sm: '400px' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={handleViewModeChange}
                  aria-label="view mode"
                  size="medium"
                >
                  <ToggleButton value="grid" aria-label="grid view" sx={{ px: 3 }}>
                    <GridViewIcon /> 
                    <Typography sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>Grid</Typography>
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list view" sx={{ px: 3 }}>
                    <ViewListIcon />
                    <Typography sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>List</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Paper>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress size={60} />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                </Typography>
              </Box>
              <UserList users={filteredUsers} viewMode={viewMode} />
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
