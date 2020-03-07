import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useState } from 'react';
import axios from 'axios';
import FoodCard from './FoodCard';
import "./App.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Dwan W.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  body: {
    background: 'linear-gradient(to bottom right, #C4DB84 0%, #ccff90 100%)',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "inherit",
    color: "#34344A",
    padding: theme.spacing(8, 0, 6),
    height: '80vh',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      height: '60vh',
    },
  },
  heroHeader: {
    marginBottom: theme.spacing(6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    transition: "0.35s",
    backgroundColor: fade("#C89B7B", 1),
    '&:hover': {
      backgroundColor: fade("#C89B7B", 0.8),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 'auto',
    },
    height: "70vh",
  },
  searchGrid: {
    marginTop: theme.spacing(6),
    zIndex:2,
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '36px',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    borderBottom: 'solid 1px black',
    [theme.breakpoints.up('sm')]: {
      width: '30vw',
      '&:focus': {
        width: '40vw',
      },
    },
  },
  listRoot: {
    width: '50vw',
    zIndex:2,
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
    maxHeight: 300,
    overflowY: 'auto',
    backgroundColor: "#CC5A71",
    borderRadius: theme.shape.borderRadius,
  },
  listName: {
    width: '50%',
    zIndex:2,
  },
  listUnit: {
    width: '25%',
    zIndex:2,
  },
  listCal: {
    width: '25%',
    textAlign: 'right',
    zIndex:2,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: "#9AB550",
    padding: theme.spacing(6),
  },
}));

export default function Calorie() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [basket, setBasket] = useState([]);
  const [itemCal, setItemCal] = useState([]);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   let ignore = false;

  //   async function fetchData() {
  //     const result = await axios.post('http://localhost:3000/',{
  //       name: query
  //     });
  //     if (!ignore) setData(result.data);
  //   }
  //   fetchData();
  //   return () => { ignore = true;}
  // } , [query]);

  const handleQueryChange = (e) => {
    let newQuery = e.target.value;
    setQuery(newQuery); //set state not sync
    if (newQuery.length > 2) {
      async function fetchData() {
        const result = await axios.post('https://warm-retreat-69626.herokuapp.com/', {
          name: newQuery
        });
        setData(result.data);
      }
      fetchData();
    } else {
      setData([]);
    }
  }

  const addToBasket = (foodObj) => {
    const newBasket = [...basket, foodObj];
    setBasket(newBasket);
    let newArr = [...itemCal, foodObj.calories];
    setItemCal(newArr);
    setOpen(true);
  }

  const onDelete = (idx) => {
    const tempBasket = [...basket];
    tempBasket.splice(idx, 1);
    setBasket(tempBasket);
    let newArr = [...itemCal];
    newArr.splice(idx, 1);
    setItemCal(newArr);
  }

  const onValueChange = (idx, value) => {
    let newArr = [...itemCal];
    newArr[idx] = value;
    setItemCal(newArr);
    // setItemCal({[item.name]: value})
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const createFoodCards = () => {
    return basket.map((Item, idx) => (
      <Grid item key={Item.name + Item.portion_display_name + idx} xs={10} sm={6} md={4}>
        <FoodCard
          key={Item.name + Item.portion_display_name + idx}
          foodItem={Item}
          idx={idx}
          onDelete={() => onDelete(idx)}
          onChange={onValueChange}
        />
      </Grid>
    )
    )
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.body}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography className={classes.heroHeader} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Great way to manage your diet
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              <span role="img" aria-label="lightning">⚡</span> fast tool built for your health
            </Typography>
            <Typography variant="h6" align="center" color="primary" paragraph>
              Total Calorie:
            </Typography>
            <Typography className={classes.heroHeader} variant="h2" align="center" color="textPrimary">
              {(itemCal.length > 0) ? (itemCal.reduce((a, b) => a + b)).toFixed(2) : 0} {" "}Cal
            </Typography>
          </Container>
        </div>
        {/* End hero unit */}

        {/* Start search unit */}
        <div className={classes.search}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.searchGrid}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search your food here..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={handleQueryChange}
              />
            </Grid>

            <Grid item>
              <div className={classes.listRoot}>
                {data.map(item => (
                  <ListItem button onClick={() => addToBasket(item)} key={item.name + item.portion_display_name}>
                    <ListItemText className={classes.listName} primary={`${item.name}`} />
                    <ListItemText className={classes.listUnit} primary={`${item.portion_amount} ${item.portion_display_name}`} />
                    <ListItemText className={classes.listCal} primary={`${item.calories}cal`} />
                  </ListItem>
                ))
                }
              </div>
            </Grid>
          </Grid>
        </div>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Successfully added the Item :)
              </Alert>
        </Snackbar>
        {/* End search unit */}

        {/* Start card unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {createFoodCards()}
          </Grid>
        </Container>
        {/* End card unit */}

        {/* Start background css unit */}
        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {/* End background css unit */}
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Built with enthusiasm and passion <span role='img' aria-label="OK">👌</span>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Database pulled from US government open data.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
