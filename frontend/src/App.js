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
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Grid from '@mui/material/Grid';

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

  const handleSubscribe = (noticia) => {
    console.log("noticiaurl:", noticia.url);
    const correo = prompt('Ingresa tu correo electrónico para suscribirte a esta noticia:');
    if (correo) {
        const data = {
            link: noticia.url,
            correo: correo,
        };
        enviarDatosAlBackend(data);
    }
  };

  const enviarDatosAlBackend = (data) => {
    console.log(data);
    fetch('http://127.0.0.1:8000/api/suscribirse/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            console.log('Suscripción exitosa');
            alert('¡Suscripción exitosa! Gracias por suscribirte.');
        } else {
            console.error('Error al suscribirse:', response.status);
        }
    })
    .catch(error => {
        console.error('Error al suscribirse:', error);
    });
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
    if (category) {
      const allowedCategories = ['business', 'sports', 'health', 'technology', 'entertainment'];
      if (allowedCategories.includes(category)) {
        apiUrl += `?category=${category}`;
      } else {
        console.error('Categoría no válida');
        return;
      }
      axios.get(apiUrl)
        .then(response => {
          setSearchResults(response.data.articles);
        })
        .catch(error => {
          console.error('Error al obtener las noticias por categoría', error);
        });
    } else {
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
      <ul style={{ marginTop: '30px' }}>
        {searchResults.map((noticia, index) => (
        <li key={index} style={{ backgroundColor: '#f0f0f0', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
            <Grid container alignItems="center">
                <Grid item xs={10}>
                    <a href={noticia.url} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
                        {noticia.title}
                    </a>
                </Grid>
                <Grid item xs={2}>
                    <MarkEmailReadIcon
                        onClick={() => handleSubscribe(noticia)}
                        sx={{
                            cursor: 'pointer',
                            color: '#344955',
                            fontSize: '2rem',
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: '#F9AA33'
                            }
                        }}
                    />
                </Grid>
            </Grid>
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
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <FacebookIcon sx={{ '&:hover': { color: '#F9AA33' } }}/>
              </a>
              </IconButton>
              <IconButton>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <TwitterIcon sx={{ '&:hover': { color: '#F9AA33' } }}/>
              </a> 
              </IconButton>
              <IconButton>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <InstagramIcon sx={{ '&:hover': { color: '#F9AA33' } }}/>
              </a>  
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