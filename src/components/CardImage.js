import '../css/CardImage.css';
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import PowerSettingsNewRoundedIcon from "@material-ui/icons/PowerSettingsNewRounded";
import React from "react";


export const CardImage = (props) => {
    switch (props.card.type) {
        case 'digital':
            return ('')
        case 'discrete':
            if (props.card.value) {
                return (<ToggleOnIcon fontSize={'large'}/>)
            } else {
                return (<ToggleOffIcon fontSize={'large'}/>)
            }
        case 'discrete2':
            if (props.card.value) {
                    return (<PowerSettingsNewRoundedIcon fontSize={'large'} style={{background: 'green', borderRadius: '50%'}}/>)
            } else {
                   return (<PowerSettingsNewRoundedIcon fontSize={'large'} style={{background: 'red', borderRadius: '50%'}}/>)
            }
    }

}