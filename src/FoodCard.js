import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
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

function FoodCard({foodItem, onDelete, idx, onChange}) {
    const [calorie, setCalorie] = useState(foodItem.calories);
    const [portion, setPortion] = useState(foodItem.portion_amount);

    // useEffect(()=>{
    //     onChange(idx, calorie);
    // },[]);

    const classes = useStyles();

    const increasePortion = () => {
        let newPortion = portion + foodItem.increment;
        setPortion(newPortion);
        let calPerPortion = (foodItem.calories/foodItem.portion_amount);
        let newCal = (calPerPortion * newPortion);
        setCalorie(newCal);
        onChange(idx, newCal);
    }

    const decreasePortion = () => {
        if (portion > 0){
            let tempPortion = portion - foodItem.increment;
            setPortion(tempPortion);
            let calPerPortion = (foodItem.calories/foodItem.portion_amount);
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
                    {calorie}{' '}Cal
                    </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick ={increasePortion}>
                    +
                </Button>
                <Button size="small" color="primary" onClick ={decreasePortion}>
                    -
                </Button>
                <Button size="small" color="primary" onClick ={onDelete}>
                    X
                </Button>
            </CardActions>
        </Card>
    )
}



export default FoodCard;