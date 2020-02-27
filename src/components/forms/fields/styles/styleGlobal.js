export const drawerWidth = "20vw";


const spacing = theme => {
  let spacingConst = {};
  ["margin", "padding"].forEach(type => {

    let sizes = ["s", "sm", "md", "l", "xl", "xxl", "xxxl"];
    let sides = ["Left", "Right", "Top", "Bottom"];

    //ms...
    sizes.forEach((size, i) => {
      spacingConst[type[0] + size] = {
        [type + "Left"]: theme.spacing(i + 1),
        [type + "Right"]: theme.spacing(i + 1),
        [type + "Top"]: theme.spacing(i + 1),
        [type + "Bottom"]: theme.spacing(i + 1)
      }
    });

    //mys
    sizes.forEach((size, i) => {
      spacingConst[type[0] + "y" + size] = {
        [type + "Top"]: theme.spacing(i + 1),
        [type + "Bottom"]: theme.spacing(i + 1)
      }
    });

    //mxs
    sizes.forEach((size, i) => {
      spacingConst[type[0] + "x" + size] = {
        [type + "Right"]: theme.spacing(i + 1),
        [type + "Left"]: theme.spacing(i + 1)
      }
    });

    //mts...
    sides.forEach(side => {
      spacingConst[type[0] + side[0].toLowerCase() + "auto"] = {
        [type + side]: "auto"
      };
      sizes.forEach((size, i) => {
        spacingConst[type[0] + side[0].toLowerCase() + size] = {
          [type + side]: theme.spacing(i + 1)
        }
      })
    })

  });
  return spacingConst
};

export const baseStyles = theme => ({
  ...spacing(theme),
  flex: {
    display: "flex"
  },
  flexGrow: {
    flexGrow: 1,
  },
  w100: {
    width: "100%"
  },
  wM100: {
    maxWidth: "100%"
  },
  verticalAlignMiddle: {
    verticalAlign: "middle"
  },
  wmaxOpen: {
    maxWidth: "calc(100vw - 57px - " + drawerWidth + ")",
    overflowX: "auto"
  },
  wmaxClose: {
    maxWidth: "calc(100vw - 57px)",
    overflowX: "auto"
  },
  container: {
    justifyContent: 'center',
    paddingTop: 72 + theme.spacing(4),
    minHeight: "100vh",
    maxWidth: 1000,
    flexGrow: 1,
    padding: theme.spacing(4),
    margin: "auto"
  },
  toolbarWithShadow: { ...theme.mixins.toolbar, marginTop: 6 },
  toolbar: theme.mixins.toolbar,
  warningText: {
    color: "#d93a3d"
  },
  warningButton: {
    backgroundColor: "#EB962C",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ce8128",
    }
  },
  warningColor: {
    color: "#8c2728"
  },
  successButton: {
    backgroundColor: "#007000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#005700",
    }
  },
  multiline: {
    whiteSpace: "pre-wrap"
  },
  dangerButton: {
    backgroundColor: "#cc635e",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ba5a56",
    }
  },
  focusedIconButtonSecondary: {
    backgroundColor: "#EDF6FD",
  },
  fab: {
    position: 'fixed',
    bottom: 60,
    right: 60,
    zIndex: 1000
  },
  title: {
    fontSize: 20,
    color: "#000"
  },
  smallTitleRight: {
    float: "right",
    fontSize: "80%",
  },
  floatRight: {
    float: "right",
  },
  iconSmall: {
    fontSize: 20,
  },
  bgDanger: {
    backgroundColor: "#cc635e"
  },
  bgDangerLight: {
    backgroundColor: "rgba(204,99,94,0.2)",
  },
  textCenter: {
    textAlign: "center"
  },
  borderContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: 10
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  iconButtonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  },
  listIconProgress: {
    position: 'absolute',
    marginTop: -4,
    marginLeft: 12,
    left: '0%',
  },
  textPills: {
    border: "1px solid",
    borderRadius: 4,
    padding: 1,
    marginLeft: 5,
    fontSize: 11
  },
});

export default function createStyles(overrides = {}, theme) {
  return { ...baseStyles(theme), ...overrides }
}
