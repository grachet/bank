import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, Paper} from '@material-ui/core';
import NavigationBar from "../components/NavigationBar";
import Copyright from "../components/Copyright"
import MaterialTable from "material-table";

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


export default function BankManager({account}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar position="absolute" account={account}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <MaterialTable
                  localization={{
                    actions: null,
                    emptyDataSourceMessage: "No account need validation",
                  }}
                  options={{
                    columnsButton: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 6, 10, 20, 40, 80]
                  }}
                  columns={[
                    {title: 'Root Course Number', field: 'rootCourseNumber'},
                    {title: 'Product', field: 'productName'},
                    {title: 'Release', field: 'productRRRR'},
                    {title: 'Delivery Format', field: 'deliveryFormat'},
                    {title: 'Status', field: 'statusProject', hidden: true},
                    {title: 'Owner', field: 'owner', hidden: true},
                    {
                      title: 'Last Update', field: 'lastModificationTimestamp', hidden: true, render: rowData => {
                        return formatDistance(toTimestamp(rowData.lastModificationTimestamp), new Date()) + " ago"
                      }
                    },
                    {
                      title: 'Creation', field: 'creationTimestamp', hidden: true, render: rowData => {
                        return formatDistance(toTimestamp(rowData.creationTimestamp), new Date()) + " ago"
                      }
                    },
                  ]}
                  actions={actions}
                  data={}
                  title="Account Validation"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright/>
      </main>
    </div>
  );
}

