import React from 'react';
import Select from "react-select";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../common/header';
import { Divider, Typography } from '@material-ui/core';

//drawer
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from "react-router-dom";
import VideocamIcon from '@material-ui/icons/Videocam';
import TextField from '@material-ui/core/TextField';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ScheduleIcon from '@material-ui/icons/Schedule';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Datacard from './dataCard';
import SideBar from '../common/sidebar';



const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({

    selectwrapper: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(0),
        marginLeft: 0,
        width: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(6.5),
            width: 'auto',
        },
    },
    selectShow: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'lightgrey',
        marginLeft: "2vw",
        [theme.breakpoints.down('md')]: {
            marginLeft: '1vw'
        },
    },

    selectSortby: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'lightgrey',
        marginLeft: "1vw",
    },

    totalplaylist: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'lightgrey',
        marginLeft: "28vw",
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },

    Show: {
        marginLeft: "2vw",
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(7)}px)`,
        transition: theme.transitions.create('width'),
        width: '20ch',
        [theme.breakpoints.down('md')]: {
            width: '13ch',
            marginLeft: '1vw'
        },
    },
    Sortby: {
        marginLeft: "2vw",
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(7)}px)`,
        transition: theme.transitions.create('width'),
        width: '20ch',
        [theme.breakpoints.down('md')]: {
            width: '10ch',
            marginLeft: "1vw",
        },
    },
    createplaylist: {
        marginLeft: "32vw",
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(7)}px)`,
        transition: theme.transitions.create('width'),
        width: 'fit-content',
        [theme.breakpoints.down('md')]: {
            width: 'fit-content',
            marginLeft: "auto",
        },
    },
    Participants: {
        // marginLeft: "0.1vw",
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(7)}px)`,
        transition: theme.transitions.create('width'),
        width: '20ch',
        [theme.breakpoints.down('md')]: {
            width: '13ch',
        },
    },
    root: {
        maxWidth: 235,
        margin: '1vw 1vw ',
        WebkitFlexFlow: 'column',
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(10),
            width: 235,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
    },
    contentShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        // marginTop: '5%'
    },
    hide: {
        display: 'none',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    drawerbody: {
        padding: theme.spacing(2, 2),

    },
    drawerForm: {
        margin: theme.spacing(2, 0),
    },
    textfield: {
        margin: theme.spacing(1, 0),

    },
    selectPrivacy: {
        marginLeft: "1vw",
        padding: theme.spacing(0, 0, 0, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(7)}px)`,
        transition: theme.transitions.create('width'),
        width: '16ch',
        [theme.breakpoints.down('md')]: {
            width: '13ch',
        },
    }
}));

const customStyles = {
    option: (base, state) => ({
        ...base,
        color: state.isSelected ? 'black' : 'black',
        ':active': {
            color: state.isSelected ? 'black' : 'black'
        }
    }),
    control: (base, state) => ({
        ...base,
        background: "#F8F8F8",
        // match with the menu
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "blue" : "#F8F8F8",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        // width 
        width: "auto !important",

        "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "red" : "blue"
        }
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    }),

};

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const dataDummy = [
    { 1: "1", role: "member" },
    { 1: "2", role: "member" },
    { 1: "3", role: "member" },
    { 1: "4", role: "member" },
    { 1: "5", role: "member" },
    { 1: "6", role: "member" },
    { 1: "7", role: "member" },
    { 1: "8", role: "member" }
]

export default function Startbroadcast() {


    const [likedCards, updatelikedCards] = React.useState([]);
    const classes = useStyles();

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const history = useHistory();
    const [createBroadcast, setCreateBroadcast] = React.useState(1);

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCreatebroadcast = () => {
        setCreateBroadcast(1);
    };

    const handleSchdulebroadcast = () => {
        setCreateBroadcast(0);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ backgroundColor: "white", height: "100%" }}>
            
            <div style={{ marginLeft: '3vw' }}>

                <Header />

            </div>
            <SideBar />
            {/* <CssBaseline /> */}

            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>

                    <div className={classes.selectwrapper} >


                        <div style={{ display: "flex" }}>


                            <div className={classes.selectSortby}>
                                Sort By
                                </div>

                            <div className={classes.Sortby}>
                                <Select
                                    defaultValue={options[0]}
                                    options={options}
                                    styles={customStyles}
                                    autosize={true}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary: 'lightgrey',
                                            primary25: '#F8F8F8',

                                        },
                                    })}
                                    components={{
                                        IndicatorSeparator: () => null
                                    }}

                                />
                            </div>
                        </div>
                    </div>

                    <div className={classes.selectwrapper} >

                        <div className={classes.createplaylist}>
                            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleDrawerOpen}
                                className={clsx(open && classes.hide)}>Create Broadcast</Button>
                        </div>

                    </div>

                </div>

                <div>
                    <div>
                        <div style={{ marginLeft: "4vw", marginTop: '3vh', width: '86%', backgroundColor: "gold", padding: "1em", borderRadius: '15px' }}>
                            <Typography variant="h5" style={{ fontSize: '2.215vw', alignItems: "center" }}>
                                Hey Name,
                        </Typography>
                            <Typography variant="h5" style={{ fontSize: '2.215vw', alignItems: "center" }}>
                                Let's Start a Broadcast!
                        </Typography>
                            <div style={{ display: "flex", flexFlow: "wrap" }}>
                                {/* <div style={{ border: '1px solid black', borderRadius: '4px', padding: '0.25em', backgroundColor: 'white', cursor: 'pointer' }}>
                                    New Broadcast
                                </div> */}
                                <div style={{ border: '1px solid black', borderRadius: '4px', padding: '0.25em', marginLeft: '0.5vw', cursor: 'pointer', marginTop: '2vh' }}
                                    onClick={() => { console.log('hello'); history.push('/broadcast/uploadvideo') }}
                                >
                                    Upload Video</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{ display: "flex", flexFlow: "wrap", marginLeft: '6vw', marginTop: '2vh' }} >

                    {
                        dataDummy.map((data) =>

                            <Datacard
                                data={data}
                                updatelikedCards={updatelikedCards}
                                likedCards={likedCards}>
                            </Datacard>
                        )}
                </div>
            </main>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {/* <div style={{display:"flex", alignItems: 'flex-end'}}> */}
                <div>
                    <div>
                        {createBroadcast ? (
                            <div >
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={handleDrawerClose}>
                                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                    </IconButton>

                                    <div style={{ display: "flex" }}>
                                        <VideocamIcon fontSize="large" style={{ color: 'blue' }} />
                                        <Typography style={{ marginLeft: '0.5vw', marginTop: '0.75vh', color: 'blue' }} component="p"> Live Broadcast</Typography>
                                    </div>
                                </div>
                                <Divider />
                                <div className={classes.drawerbody}>
                                    <Typography variant="h5" style={{ color: "lightgrey" }}>Create New Broadcast </Typography>

                                    <form className={classes.drawerForm} noValidate autoComplete="off">

                                        <TextField id="title" variant="outlined" placeholder="Broadcast Title" fullWidth className={classes.textfield} />
                                        <TextField id="outlined-multiline-static" variant="outlined" placeholder="Description" fullWidth className={classes.textfield} multiline rows={6} />

                                    </form>

                                    <div style={{ display: "flex" }}>
                                        <Typography component="p" style={{ marginTop: '0.75vh' }}>Select who gets to see</Typography>
                                        <div className={classes.selectPrivacy}>
                                            <Select
                                                defaultValue={options[0]}
                                                options={options}
                                                styles={customStyles}
                                                autosize={true}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: 'lightgrey',
                                                        primary25: '#F8F8F8',

                                                    },
                                                })}
                                                components={{
                                                    IndicatorSeparator: () => null
                                                }}

                                            />
                                        </div>
                                    </div>

                                    <form className={classes.drawerForm} noValidate autoComplete="off">

                                        <TextField id="outlined-multiline-static" variant="outlined" placeholder="Add Tags" fullWidth className={classes.textfield} multiline rows={3} />

                                    </form>

                                </div>
                            </div>

                        ) : (
                                <div >
                                    <div className={classes.drawerHeader}>
                                        <IconButton onClick={handleDrawerClose}>
                                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                        </IconButton>

                                        <div style={{ display: "flex" }}>
                                            <ScheduleIcon fontSize="large" style={{ color: 'blue' }} />
                                            <Typography style={{ marginLeft: '0.5vw', marginTop: '0.75vh', color: 'blue' }} component="p"> Schedule Broadcast</Typography>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className={classes.drawerbody}>
                                        <Typography variant="h5" style={{ color: "lightgrey" }}>Create New Broadcast </Typography>

                                        <form className={classes.drawerForm} noValidate autoComplete="off">

                                            <TextField id="title" variant="outlined" placeholder="Broadcast Title" fullWidth className={classes.textfield} />
                                            <TextField id="outlined-multiline-static" variant="outlined" placeholder="Description" fullWidth className={classes.textfield} multiline rows={6} />

                                        </form>

                                        <div style={{ display: "flex" }}>
                                            <Typography component="p" style={{ marginTop: '0.75vh' }}>Select who gets to see</Typography>
                                            <div className={classes.selectPrivacy}>
                                                <Select
                                                    defaultValue={options[0]}
                                                    options={options}
                                                    styles={customStyles}
                                                    autosize={true}
                                                    theme={theme => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary: 'lightgrey',
                                                            primary25: '#F8F8F8',

                                                        },
                                                    })}
                                                    components={{
                                                        IndicatorSeparator: () => null
                                                    }}

                                                />
                                            </div>
                                        </div>

                                        <form className={classes.drawerForm} noValidate autoComplete="off">

                                            <TextField id="outlined-multiline-static" variant="outlined" placeholder="Add Tags" fullWidth className={classes.textfield} multiline rows={3} />

                                        </form>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }} >
                                                {/* <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    label="Date picker inline"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                /> */}
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Date picker dialog"
                                                    format="MM/dd/yyyy"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    style={{ margin: '0 1vw' }}
                                                />
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="Time picker"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                    style={{ margin: '0 1vw' }}

                                                />
                                            </div>
                                        </MuiPickersUtilsProvider>

                                    </div>
                                </div>
                            )}
                    </div>

                </div>

                {createBroadcast ? (
                    <div style={{ display: 'flex', position: 'relative', marginTop: 'auto' }} className={classes.drawerbody}>
                        <div style={{ display: 'flex', border: '1px solid blue', borderRadius: '4px', padding: '0.15em', cursor: "pointer", width: '50%', margin: '0 0.3em', justifyContent: "center", backgroundColor: 'blue' }} onClick={(() => { handleCreatebroadcast() })}>
                            <VideoCallIcon style={{ marginRight: '0.5vw', color: 'white' }} />
                            <Typography component="p" style={{ color: 'white' }}>Let's Go Live</Typography>
                        </div>
                        <div style={{ display: 'flex', border: '1px solid blue', borderRadius: '4px', padding: '0.15em', cursor: "pointer", width: '50%', margin: '0 0.3em', justifyContent: "center" }} onClick={(() => { handleSchdulebroadcast() })}>
                            <ScheduleIcon style={{ marginRight: '0.5vw' }} fontSize="small" />
                            <Typography component="p">Schedule</Typography>
                        </div>
                    </div>
                )
                    :
                    (
                        <div style={{ display: 'flex', position: 'relative', marginTop: 'auto' }} className={classes.drawerbody}>
                            <div style={{ display: 'flex', border: '1px solid blue', borderRadius: '4px', padding: '0.15em', cursor: "pointer", width: '50%', margin: '0 0.3em', justifyContent: "center" }} onClick={(() => { handleCreatebroadcast() })}>
                                <VideoCallIcon style={{ marginRight: '0.5vw' }} />
                                <Typography component="p">Let's Go Live</Typography>
                            </div>
                            <div style={{ display: 'flex', border: '1px solid blue', borderRadius: '4px', padding: '0.15em', cursor: "pointer", width: '50%', margin: '0 0.3em', justifyContent: "center", backgroundColor: 'blue' }} onClick={(() => { handleSchdulebroadcast() })}>
                                <ScheduleIcon style={{ marginRight: '0.5vw', color: 'white' }} fontSize="small" />
                                <Typography component="p" style={{ color: "white" }}>Schedule</Typography>
                            </div>
                        </div>
                    )
                }

            </Drawer>

        </div>
    );
}

