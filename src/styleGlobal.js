const baseStyles = {
  grow: {
    flexGrow: 1,
  },
  wmax: {
    width: "100% "
  },
  container: {
    justifyContent: 'center',
    paddingTop: 94,
    minHeight: "100vh",
    maxWidth: 1000,
    flexGrow: 1,
    padding: 20,
    margin: "auto",
  },
  mrs: {
    marginRight: 5
  },
  mts: {
    marginTop: 5
  },
  mls: {
    marginLeft: 5
  },
  mbs: {
    marginBottom: 5
  },
  mrmd: {
    marginRight: 15
  },
  mtmd: {
    marginTop: 15
  },
  mlmd: {
    marginLeft: 15
  },
  mbmd: {
    marginBottom: 15
  },
  mxl: {
    marginLeft: 30,
    marginRight: 30

  },
  myl: {
    marginTop: 30,
    marginBottom: 30
  },
  fab: {
    position: 'fixed',
    bottom: 80,
    right: 80,
    zIndex: 1000
  }


};

export default function createStyles(overrides = {}) {
  return {...baseStyles, ...overrides}
}