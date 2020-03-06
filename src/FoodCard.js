import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function FoodCard({ foodItem, onDelete, idx, onChange }) {
    const [calorie, setCalorie] = useState(foodItem.calories);
    const [portion, setPortion] = useState(foodItem.portion_amount);

    // useEffect(()=>{
    //     onChange(idx, calorie);
    // },[]);

    const classes = useStyles();

    const increasePortion = () => {
        let newPortion = portion + foodItem.increment;
        setPortion(newPortion);
        let calPerPortion = (foodItem.calories / foodItem.portion_amount);
        let newCal = (calPerPortion * newPortion);
        setCalorie(newCal);
        onChange(idx, newCal);
    }

    const decreasePortion = () => {
        if (portion > 0) {
            let tempPortion = portion - foodItem.increment;
            setPortion(tempPortion);
            let calPerPortion = (foodItem.calories / foodItem.portion_amount);
            let newCal = (calPerPortion * tempPortion);
            setCalorie(newCal);
            onChange(idx, newCal);
        }
    }

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                    {foodItem.name}
                </Typography>
                <Typography>
                    {portion}  {foodItem.portion_display_name}
                </Typography>
                <Typography onChange={onChange}>
                    {(calorie).toFixed(2)}{' '}Cal
                    </Typography>
            </CardContent>
            <CardActions>
                <IconButton size="small" color="primary" onClick={increasePortion} aria-label="increase" component="span">
                     <KeyboardArrowUpIcon fontSize={"large"}/>
                </IconButton>
                <IconButton size="small" color="primary" onClick={decreasePortion} aria-label="decrease" component="span">
                     <KeyboardArrowDownIcon fontSize={"large"}/>
                </IconButton>
                <IconButton color="secondary" onClick={onDelete} aria-label="remove" component="span">
                    <CloseIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}



export default FoodCard;