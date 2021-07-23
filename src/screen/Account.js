import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';
import NavigationBar from "../components/NavigationBar";
import Deposits from "../components/account/Deposits";
import Chart from "../components/account/Chart";
import clsx from 'clsx';
import Copyright from "../components/Copyright"
import PromptDialogue from "../components/forms/PromptDialogue"
import ActionButton from '../components/ActionButton';
import TransfertIcon from '@material-ui/icons/Send';
import * as Yup from "yup";
import { writeAccount, makeTransfert, listenTransferts } from '../functions/firebaseFuntion';
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import PatchedPagination from '../components/PatchedPagination'

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

export function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  let result = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  return result
}

export default function Account({ account, setAccount }) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [openAddBeneficiary, setOpenAddBeneficiary] = useState(false);
  const [openTransfert, setOpenTransfert] = useState(false);
  const [transferts, setTransferts] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    listenTransferts(setTransferts)
  }, [])

  let sortedTransferts = Object.values(transferts || {}).filter(t => t.from === account.RIB || t.to === account.RIB)
    .map(t => ({
      ...t, RIB: t.from === account.RIB ? t.to : t.from,
      ammount: t.from === account.RIB ? -t.ammount : t.ammount
    })).reverse()

  let deposits = sortedTransferts.reduce((a, b) => { return parseFloat(a) + parseFloat(b.ammount) }, 0)

  return (
    <div className={classes.root}>
      <NavigationBar position="absolute" account={account} setAccount={setAccount} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart sortedTransferts={sortedTransferts} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits deposits={deposits} account={account} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.mtmd}>
                <MaterialTable
                  components={{
                    Pagination: PatchedPagination,
                  }}
                  localization={{
                    actions: null,
                    emptyDataSourceMessage: "No transferts",
                  }}
                  options={{
                    search: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 10],
                    rowStyle: rowData => ({
                      backgroundColor: rowData.ammount < 0 ? '#EEEEEE' : '#fff'
                    })
                  }}
                  columns={[
                    {
                      title: 'Date', field: 'timestamp', render: (rowdata) => {
                        return formatDate(new Date(rowdata.timestamp))
                      }
                    },
                    { title: 'Title', field: 'title' },
                    { title: 'RIB', field: 'RIB' },
                    { title: '€', field: 'ammount' },
                  ]}
                  data={sortedTransferts}
                  title="Transferts"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.mtmd}>
                <MaterialTable
                  components={{
                    Pagination: PatchedPagination,
                  }}
                  localization={{
                    actions: null,
                    emptyDataSourceMessage: "No beneficiaries",
                  }}
                  options={{
                    search: false,
                    pageSize: 5,
                    pageSizeOptions: [5, 10]
                  }}
                  columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'RIB', field: 'RIB' },
                  ]}
                  actions={[
                    {
                      icon: 'close',
                      onClick: (event, obj) => {
                        let acc = { ...account };
                        let i = obj.tableData.id;
                        acc.beneficiaries.splice(i, 1);
                        writeAccount(acc, acc.id)
                      }
                    },
                    {
                      icon: 'add',
                      tooltip: 'Add Beneficiary',
                      isFreeAction: true,
                      onClick: (event) => setOpenAddBeneficiary(true)
                    }
                  ]}
                  data={account.beneficiaries}
                  title="Beneficiaries"
                />
              </div>
            </Grid>
          </Grid>
        </Container>
        <PromptDialogue
          open={openTransfert}
          onCancel={() => setOpenTransfert(false)}
          onOk={({ RIB, ammount, title }) => {
            makeTransfert(account.RIB, RIB, ammount, title)
          }}
          defaultValue={{ RIB: account.beneficiaries && account.beneficiaries[0] && account.beneficiaries[0].RIB }}
          title={"Transfert money"}
          text={"Make sure to have enter the good RIB 🙂 ! (unlimited overdraft)"}
          fields={[
            {
              title: "Title",
              path: ["title"],
              yup: Yup.string().required(),
              typeField: "textfield"
            },
            {
              title: "Beneficiary",
              path: ["RIB"],
              yup: Yup.string().required(),
              typeField: "select",
              choice: (account.beneficiaries || []).map(b => b.RIB),
              titleChoice: (account.beneficiaries || []).map(b => b.name)
            },
            {
              title: "Ammount",
              path: ["ammount"],
              yup: Yup.number().positive().required(),
              typeField: "textfield",
            }
          ]}
        />
        <PromptDialogue
          open={openAddBeneficiary}
          onCancel={() => setOpenAddBeneficiary(false)}
          onOk={({ RIB, name }) => {
            if (RIB !== account.RIB) {
              writeAccount({ ...account, beneficiaries: [...(account.beneficiaries || []), { RIB, name }] }, account.id)
            } else {
              enqueueSnackbar("You can't add your own RIB as beneficiary", {
                variant: 'warning',
              });
            }
          }}
          title={"Add a Beneficiary"}
          text={"You can only send money to your beneficiaries"}
          fields={[
            {
              title: "Name",
              path: ["name"],
              yup: Yup.string().required(),
              typeField: "textfield"
            },
            {
              title: "RIB",
              path: ["RIB"],
              yup: Yup.string().matches(/^FR[0-9]{10}[a-zA-Z0-9]{11}[0-9]{2}$/, 'Must be a valid RIB').required(),
              typeField: "textfield"
            },
          ]}
        />
        <ActionButton
          mainAction={{ name: "Transfert", icon: <TransfertIcon />, action: () => setOpenTransfert(true) }}
        />
        <Copyright />
      </main>
    </div>
  );
}
