import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import {Observable} from 'rxjs';
// import observable$ from '../redux/epics';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '75vw',
      margin: 'auto'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: 'auto',
    },
    table: {
        width: '75vw',
        margin: 'auto'
    }
  }));

function PhotoDisplay() {

    const classes = useStyles();

    const [pics, setPics] = useState([])
    const [toggle, setToggle] = useState(true)
    
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                let res = await axios.get('https://api.pexels.com/v1/curated', {
                    headers: {
                        'Authorization': `${process.env.REACT_APP_API_KEY}`
                    }
                })
                setPics(res.data.photos)
            } catch(err){
                console.log('err in fetchPhotos func', err)
            }
        }
        fetchPhotos();
        // const observable$ = Observable.create((observer) => {
        //     axios.get('https://api.pexels.com/v1/curated', {
        //         header: {
        //             'Authorization': `${process.env.REACT_APP_API_KEY}`
        //         }
        //     }.then(res => {
        //         setPics(res.data.photos)
        //         observer.next(res.data.photos)
        //         observer.complete();
        //     })
        //     .catch(err => {
        //         observer.error(err);
        //     }))
        // });
        // observable$();
    }, [])

    const toggleSwitch = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '8px'}}>
                <FormControlLabel 
                control={<Switch onChange={toggleSwitch} />} label='Grid vs. List Toggle' labelPlacement='top' />
            </div>
            {toggle ? 
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {pics.map(elem => {
                        return( 
                            <Grid item xs={4} key={elem.id}>
                                <Paper className={classes.paper}>
                                    <a href={elem.photographer_url} style={{color: 'black'}}> {elem.photographer} </a> <br/>
                                    <a href={elem.url}> <img alt='pexel' src={elem.src.tiny}/> </a>
                                </Paper>
                        </Grid>)
                    })}
                </Grid>
            </div>
            :
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: '600', fontSize: '20px'}}>Photograph</TableCell>
                        <TableCell style={{fontWeight: '600', fontSize: '20px'}} align="right">Photographer's Name</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {pics.map((elem) => (
                        <TableRow key={elem.id}>
                        <TableCell component="th" scope="row">
                            <a href={elem.url}><img alt='pexel' src={elem.src.tiny}/></a>
                        </TableCell>
                        <TableCell align="right">
                            <a href={elem.photographer_url} style={{color: 'black'}}>{elem.photographer}</a>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>}
        </div>
    )
}

export default PhotoDisplay;