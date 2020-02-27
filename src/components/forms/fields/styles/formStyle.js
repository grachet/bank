import createStyles from './styleGlobal'
import { blue } from '@material-ui/core/colors';

export default theme => createStyles({
    clickableText: {
        cursor: "pointer",
        "&:hover": {
            opacity: 0.4,
        }
    },
    centeredContainer: {
        textAlign: "center",
        marginTop: "30vh"
    },
    circularProgressList2: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -44,
    },
    circularProgressList3: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -18,
    },
    fab: {
        position: 'fixed',
        bottom: 60,
        right: 60,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    fabOpen: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        position: 'fixed',
        bottom: 60,
        right: 60,
        marginRight: "20vw",
    },

    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    titleContainerModuleDescription: {
        marginLeft: 10,
        minHeight: 48,
        paddingTop: 8
    },
    paperContainer: {
        margin: "auto",
        padding: theme.spacing(4),
    },
    buttonHint: {
        // marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        display: "inline-block"
    },
    leftButtonHint: {
        // marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        display: "inline-block"
    },
    wrapperArrayField: {
        border: "1px solid rgba(0,0,0,0.25)",
        padding: 20,
        borderRadius: 4
    },
    button: {
        marginBottom: 2 * theme.spacing(1),
        marginRight: 2 * theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    copied: {
        color: "#000",
        backgroundColor: "#EBEBEB",
        padding: 3,
        paddingRight: 6,
        paddingLeft: 6,
        borderRadius: 15,
        marginRight: 15,
    },
    rowTableColored: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    browserContainer: {
        backgroundColor: "#FAFAFA",
        height: "100vh",
        width: "100vw",
    },
}, theme);
