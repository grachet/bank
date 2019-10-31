import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid} from '@material-ui/core';
import NavigationBar from "../components/NavigationBar";
import Copyright from "../components/Copyright"
import MaterialTable from "material-table";
import {deleteAccount, listenAllAccounts, writeAccount} from "../functions/firebaseFuntion";
import {getIdCardUrl} from "../functions/fileFunctions";

const useStyles = makeStyles(theme => ({
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


export default function BankManager({account,setAccount}) {

  const [allAccounts, setAllAccounts] = React.useState({});

  useEffect(() => {
    listenAllAccounts(setAllAccounts)
  }, []);

  const classes = useStyles();

  let accountsToRemove = [];
  let accountsToValidate = [];

  Object.values(allAccounts).forEach(val => {
    if (val.toRemove) {
      accountsToRemove.push(val);
      // getIdCardUrl(val.id, urlIdCard => setAllAccounts(state => ({...state, [val.id]: {...val, urlIdCard}})))
    } else if (!val.isVerified) {
      accountsToValidate.push(val);
    }
  });

  console.log("allAccounts", allAccounts);

  return (
    <div className={classes.root}>
      <NavigationBar position="absolute" account={account}  setAccount={setAccount}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
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
                    onClick: (event, {id}) => {
                      writeAccount({...allAccounts[id], isVerified: true}, id)
                    }
                  }
                ]}
                columns={[
                  {title: 'Email', field: 'email'},
                  {
                    title: 'Name', field: 'id', render: rowData => {
                      return rowData.name + " " + rowData.firstName
                    }
                  },
                  {
                    title: 'Id Card.pdf', render: rowData => {
                      return rowData.urlIdCard
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
                  {title: 'Email', field: 'email'},
                  {
                    title: 'Name', field: 'id', render: rowData => {
                      return rowData.name + " " + rowData.firstName
                    }
                  },
                  {
                    title: 'Signature.pdf', field: 'id', render: rowData => {
                      return rowData.id
                    }
                  },
                ]}
                actions={[
                  {
                    icon: 'delete',
                    tooltip: 'Remove account',
                    onClick: (event, {id}) => {
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
        <Copyright/>
      </main>
    </div>
  );
}

