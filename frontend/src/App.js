import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemText } from '@mui/material';
import axios from 'axios';
import "./App.css";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PoliticsIcon from '@mui/icons-material/EmojiPeople'; 
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import HealthIcon from '@mui/icons-material/LocalHospital';
import TechnologyIcon from '@mui/icons-material/Devices';
import VideosIcon from '@mui/icons-material/Movie';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import {  Link } from 'react-router-dom';

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

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/noticias/everything/')
      .then(response => {
        setSearchResults(response.data.articles);
      })
      .catch(error => {
        console.error('Error al obtener las noticias', error);
      });
  }, []);

  const handleSearch = () => {
    axios.get(`http://127.0.0.1:8000/api/noticias/everything/?q=${searchTerm}`)
      .then(response => {
        console.log('Datos de noticias:', response.data.articles);
        setSearchResults(response.data.articles);
      })
      .catch(error => {
        console.error('Error al buscar noticias', error);
      });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    let apiUrl = `http://127.0.0.1:8000/api/noticias/${category}/`;


    // Verifica si hay una categoría seleccionada
    if (category) {
      const allowedCategories = ['business', 'sports', 'health', 'technology', 'entertainment'];
      if (allowedCategories.includes(category)) {
        apiUrl += `?category=${category}`;
      } else {
        console.error('Categoría no válida');
        return;
      }
      // Realiza la solicitud a la API con la categoría seleccionada
      axios.get(apiUrl)
        .then(response => {
          setSearchResults(response.data.articles);
        })
        .catch(error => {
          console.error('Error al obtener las noticias por categoría', error);
        });
    } else {
      // Si no hay categoría seleccionada, limpia los resultados de búsqueda
      setSearchResults([]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column-reverse', minHeight: '100vh'}}>
      <div style={{ flexGrow: 1 }}>
      </div>
      <div className="search-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <TextField
          style={{ height: '40px', color: '#232F34', borderColor: '#4A6572' }}
          InputLabelProps={{
            style: { color: '#4A6572', borderColor: '#4A6572' },
            shrink: false,
          }}
          className='SearchBar'
          label={searchTerm ? '' : 'Escribe su busqueda...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained"
          style={{ height: '52px', backgroundColor: '#F9AA33', color: '#344955' }}
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Buscar
        </Button>
      </div>
      <ul style={{ marginTop: '30px'}}>
        {searchResults.map((noticia, index) => (
          <li key={index} style={{ backgroundColor: '#f0f0f0', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
            <a href={noticia.url} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
              {noticia.title}
            </a>
            <p style={{ color: '#666' }}>Autor: {noticia.author}</p>
            <img src={noticia.urlToImage} alt={`Imagen de ${noticia.title}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
        <AppBar position="static" style={{ background: '#344955', flexDirection: 'column', position: 'fixed', bottom: 0}}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}
              sx={{ '&:hover': { backgroundColor: '#F9AA33' }, '&.Mui-focusVisible': { backgroundColor: '#F9AA33' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" style={{ flexGrow: 1, fontFamily: 'Work Sans, sans-serif' }}>
              Noticias Mundial
            </Typography>
            <Button
              component={Link}
              to="/LoginTemplate" 
              color="inherit"
              sx={{ '&:hover': { backgroundColor: '#F9AA33' }, '&.Mui-focusVisible': { backgroundColor: '#F9AA33' } }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose} style={{ height: '100%', overflow: 'auto'}}>
          <div style={{ backgroundColor: '#4A6572' , fontFamily: 'Work Sans, sans-serif', padding: '20px'}}>
            <Typography variant="h5" color="white" gutterBottom>
              Categorías
            </Typography>
            <List>
              {[
                { category: 'business', icon: <PoliticsIcon /> },
                { category: 'sports', icon: <SportsSoccerIcon /> },
                { category: 'health', icon: <HealthIcon /> },
                { category: 'technology', icon: <TechnologyIcon /> },
                { category: 'entertainment', icon: <VideosIcon /> },
                ].map(({ category, icon }) => (
                  <ListItemButton
                    onClick={() => handleCategoryClick(category)}
                    selected={selectedCategory === category}
                    sx={{
                      '&:hover': { backgroundColor: '#F9AA33' },
                      '&.Mui-focusVisible': { backgroundColor: '#F9AA33' },
                    }}
                    key={category}
                    >
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={category} style={{ color: 'white' }} />
                </ListItemButton>
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
      </div>
    </ThemeProvider>
  );
}
export default App;