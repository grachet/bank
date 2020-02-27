import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';
import NavigationBar from "../components/NavigationBar";
import Orders from "../components/account/Orders";
import Deposits from "../components/account/Deposits";
import Chart from "../components/account/Chart";
import clsx from 'clsx';
import Copyright from "../components/Copyright"
import PromptDialogue from "../components/forms/PromptDialogue"
import ActionButton from '../components/ActionButton';
import TransfertIcon from '@material-ui/icons/Send';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import * as Yup from "yup";
import { writeAccount, makeTransfert } from '../functions/firebaseFuntion';
import MaterialTable from 'material-table';

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

export default function Account({ account, setAccount }) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [openAddBeneficiary, setOpenAddBeneficiary] = useState(false);
  const [openTransfert, setOpenTransfert] = useState(false);

  return (
    <div className={classes.root}>
      <NavigationBar position="absolute" account={account} setAccount={setAccount} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart account={account} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits account={account} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders account={account} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.mtmd}>
                <MaterialTable
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
            console.log(RIB, ammount, title);
            makeTransfert(RIB, ammount, title)
          }}
          title={"Transfert money"}
          text={"Make sure to have enter the good RIB 🙂"}
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
              yup: Yup.number().required(),
              typeField: "textfield",
            }
          ]}
        />
        <PromptDialogue
          open={openAddBeneficiary}
          onCancel={() => setOpenAddBeneficiary(false)}
          onOk={({ RIB, name }) => {
            console.log(RIB, name);
            writeAccount({ ...account, beneficiaries: [...(account.beneficiaries || []), { RIB, name }] }, account.id)
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
          actions={[{ name: "Transfert", icon: <TransfertIcon />, action: () => setOpenTransfert(true) }, { name: "Add beneficiary", icon: <PersonAddIcon />, action: () => setOpenAddBeneficiary(true) }]}
        />
        <Copyright />
      </main>
    </div>
  );
}
