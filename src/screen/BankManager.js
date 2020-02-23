import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, IconButton, CircularProgress } from '@material-ui/core';
import NavigationBar from "../components/NavigationBar";
import Copyright from "../components/Copyright"
import MaterialTable from "material-table";
import { listenAllAccounts, writeAccount } from "../functions/firebaseFuntion";
import { storage } from "../config/firebase";
import DownloadIcon from "@material-ui/icons/AttachFile"
import { useSnackbar } from 'notistack';
import { deleteAccount } from '../functions/authFunctions';

const useStyles = makeStyles(theme => ({
  circularProgressIconButton: {
    position: "absolute"
  },
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


export default function BankManager({ account, setAccount }) {

  const [allAccounts, setAllAccounts] = React.useState({});
  const [loadingIdCard, setLoadingIdCard] = React.useState({});
  const [loadingSignature, setLoadingSignature] = React.useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    listenAllAccounts(setAllAccounts)
  }, []);

  const classes = useStyles();

  let accountsToRemove = [];
  let accountsToValidate = [];

  Object.values(allAccounts).forEach(val => {
    if (val.toRemove) {
      accountsToRemove.push(val);
    } else if (!val.isVerified) {
      accountsToValidate.push(val);
    }
  });

  return (
    <div className={classes.root}>
      <NavigationBar position="absolute" account={account} setAccount={setAccount} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MaterialTable
                localization={{
                  actions: null,
                  emptyDataSourceMessage: "No account need validation",
                }}
                options={{
                  search: false,
                  pageSize: 5,
                  pageSizeOptions: [5, 10]
                }}
                actions={[
                  {
                    icon: 'check',
                    tooltip: 'Validate account',
                    onClick: (event, { id }) => {
                      writeAccount({ ...allAccounts[id], isVerified: true }, id)
                    }
                  }
                ]}
                columns={[
                  { title: 'Email', field: 'email' },
                  {
                    title: 'Name', field: 'id', render: rowData => {
                      return rowData.name + " " + rowData.firstName
                    }
                  },
                  {
                    title: 'Id Card.pdf', render: rowData => {
                      return <IconButton
                        onClick={() => {
                          setLoadingIdCard(lod => ({ ...lod, [rowData.id]: true }));
                          storage.ref("idCard/" + rowData.id + ".pdf").getDownloadURL().then(url => {
                            setLoadingIdCard(lod => ({ ...lod, [rowData.id]: false }));
                            window.open(url)
                          }).catch(err => {
                            setLoadingIdCard(lod => ({ ...lod, [rowData.id]: false }));
                            enqueueSnackbar(err.message_, {
                              variant: 'warning',
                            });
                          })
                        }}
                      >
                        <DownloadIcon />
                        {loadingIdCard[rowData.id] && <CircularProgress className={classes.circularProgressIconButton} />}
                      </IconButton>
                    }
                  },
                ]}
                data={accountsToValidate}
                title="Account Validation"
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTable
                localization={{
                  actions: null,
                  emptyDataSourceMessage: "No account need to be removed",
                }}
                options={{
                  search: false,
                  pageSize: 5,
                  pageSizeOptions: [5, 10]
                }}
                columns={[
                  { title: 'Email', field: 'email' },
                  {
                    title: 'Name', field: 'id', render: rowData => {
                      return rowData.name + " " + rowData.firstName
                    }
                  },
                  {
                    title: 'Signature.pdf', render: rowData => {
                      return <IconButton
                        onClick={() => {
                          setLoadingSignature(lod => ({ ...lod, [rowData.id]: true }));
                          storage.ref("signature/" + rowData.id + ".pdf").getDownloadURL().then(url => {
                            setLoadingSignature(lod => ({ ...lod, [rowData.id]: false }));
                            window.open(url)
                          }).catch(err => {
                            setLoadingSignature(lod => ({ ...lod, [rowData.id]: false }));
                            enqueueSnackbar(err.message_, {
                              variant: 'warning',
                            });
                          })
                        }}
                      >
                        <DownloadIcon />
                        {loadingSignature[rowData.id] && <CircularProgress className={classes.circularProgressIconButton} />}
                      </IconButton>
                    }
                  }
                ]}
                actions={[
                  {
                    icon: 'delete',
                    tooltip: 'Remove account',
                    onClick: (event, { id }) => {
                      deleteAccount(id)
                    }
                  }
                ]}
                data={accountsToRemove}
                title="Account To Remove"
              />
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}

