import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faVolumeMute
} from "@fortawesome/free-solid-svg-icons";


const PlaylistPopup = () => {
    return (<List component="nav">
        Playlist Popup
        <ListItem button>
            <ListItemIcon>
                <PinDropIcon />
            </ListItemIcon>
            <ListItemText primary="Pin to Top" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <FontAwesomeIcon icon={faEdit} size={"lg"} />
            </ListItemIcon>
            <ListItemText primary="Rename" />
        </ListItem>
    </List>);
}

export default PlaylistPopup;