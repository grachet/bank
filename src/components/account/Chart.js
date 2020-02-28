import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { formatDate } from "../../screen/Account"

export default function Chart({ sortedTransferts }) {

  let chartedTransferts = sortedTransferts.map((sum => t => sum += parseFloat(t.ammount))(0)).map((ammount, i) => ({ ammount, timestamp: formatDate(new Date(sortedTransferts[i].timestamp)) }));

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={chartedTransferts}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="timestamp" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Deposit (€)
            </Label>
          </YAxis>
          <Line type="stepAfter" dataKey="ammount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
