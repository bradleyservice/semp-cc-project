import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { pexelsActions } from '../containers/Pexels';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
    error: {
        display: 'flex',
        color: 'red',
        justifyContent: 'center'
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

const PhotoDisplay = (props) => {

    const {
        getPhotos,
        photos,
        isLoading,
        hasBeenLoaded,
        error
    } = props;

    const classes = useStyles();
    const [toggle, setToggle] = useState(true)
    
    useEffect(() => {
        if (!isLoading && !hasBeenLoaded) {
            getPhotos();
        }
    }, [])

    const toggleSwitch = () => {
        setToggle(!toggle)
    }

    const _gridView = () => (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {photos.map(elem => {
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
        )
    const _tableView = () => (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight: '600', fontSize: '20px'}}>Photograph</TableCell>
                    <TableCell style={{fontWeight: '600', fontSize: '20px'}} align="right">Photographer's Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {photos.map((elem) => (
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
        </TableContainer>
    )


    return (
        <div>
            {error && <p className={classes.error}>{String(error)}</p> }
            {!error && (
                <div style={{display: 'flex', justifyContent: 'center', margin: '8px'}}>
                    <FormControlLabel 
                    control={<Switch onChange={toggleSwitch} />} label='Grid vs. List Toggle' labelPlacement='top' />
                </div>)
            }

            {!hasBeenLoaded ?
                <p>Fetching Photos...</p>
            :
                isLoading ? <p>Loading...</p>
                :
                toggle ? _gridView() : _tableView()
            }
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        photos: state.pexelsReducer.get('photos'),
        isLoading: state.pexelsReducer.get('isLoading'),
        hasBeenLoaded: state.pexelsReducer.get('hasBeenLoaded'),
        error: state.pexelsReducer.get('error'),
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        getPhotos: () => {
			dispatch(pexelsActions.getPhotos());
		}
    };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoDisplay);