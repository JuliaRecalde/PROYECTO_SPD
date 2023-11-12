import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import axios from 'axios';
import "./App.css";
import '@mui/material/styles';
import '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const theme = createTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8010/api/noticias/')
      .then(response => {
        setSearchResults(response.data.articles);
      })
      .catch(error => {
        console.error('Error al obtener las noticias', error);
      });
  }, []);

  const handleSearch = () => {
    axios.get(`http://127.0.0.1:8010/api/noticias/?q=${searchTerm}`)
      .then(response => {
        console.log('Datos de noticias:', response.data.articles);
        setSearchResults(response.data.articles);
      })
      .catch(error => {
        console.error('Error al buscar noticias', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: 'white', display: 'flex'}}>
        <AppBar position="static" style={{ background: '#344955', flexDirection: 'column', marginBottom: '20px' }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}
              sx={{ '&:hover': { backgroundColor: '#F9AA33' }, '&.Mui-focusVisible': { backgroundColor: '#F9AA33' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" style={{ flexGrow: 1, fontFamily: 'Work Sans, sans-serif' }}>
              NoticiasMundial.com
            </Typography>
            <Button color="inherit"
              sx={{ '&:hover': { backgroundColor: '#F9AA33' }, '&.Mui-focusVisible': { backgroundColor: '#F9AA33' } }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose} style={{ height: '100%', overflow: 'auto'}}>
          <div style={{ backgroundColor: '#4A6572' , fontFamily: 'Work Sans, sans-serif', padding: '20px'}}>
            <Typography variant="h3" color="#232F34" gutterBottom>
              Categorías
            </Typography>
            <List>
              {['Política', 'Deportes', 'Salud', 'Tecnología', 'Vídeos'].map((category) => (
                <ListItem
                  key={category}
                  button
                  onClick={() => handleCategoryClick(category)}
                  selected={selectedCategory === category}
                  sx={{
                    '&:hover': { backgroundColor: '#F9AA33' },
                    '&.Mui-focusVisible': { backgroundColor: '#F9AA33' },
                  }}
                >
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
              <IconButton>
                <FacebookIcon/>
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </div>
            <div style={{ wordWrap: 'break-word' }}>
              <p style={{ fontSize: '10px' }}>Síguenos en nuestras redes</p>
              <p style={{ fontSize: '10px' }}>sociales para mas contenido.</p>
            </div>
          </div>
        </Drawer>
        <div className="search-container">
          <TextField
            style={{ marginBottom: '20px', marginRight: '5px', color: '#232F34', borderColor: '#4A6572' }}
            InputLabelProps={{
              style: { color: '#4A6572', borderColor: '#4A6572' }
            }}
            className='SearchBar'
            label="Escribe lo que desee buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained"
            style={{ backgroundColor: '#F9AA33', color: '#344955' }}
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Buscar
          </Button>
        </div>
        <ul>
          {searchResults.map((noticia, index) => (
            <li key={index} style={{ backgroundColor: '#f0f0f0', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
              <a href={noticia.url} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
                {noticia.title}
              </a>
              <p style={{ color: '#666' }}>Autor: {noticia.author}</p>
          </li>
          ))}
        </ul>
      </div>
    </ThemeProvider>
  );
}

export default App;