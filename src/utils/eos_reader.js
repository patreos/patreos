class EosReader {

  constructor(connection) {
    this.connection = connection;
  }

  getBalance = (contract, account, symbol, action) => {
    const currencyBalance = this.connection.getCurrencyBalance(contract, account, symbol);
    currencyBalance.then((response) => {
      action(response[0]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  };

  getTable = (contract, account, table, action) => {
    const getTable = this.connection.getTableRows(true, contract, account, table);
    getTable.then((response) => {
      action(response.rows);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  }

  getAccount = (account, action) => {
    const getAccount = this.connection.getAccount(account);
    getAccount.then((response) => {
      action(response[0]);
    }).catch(error => {
      console.log('An error occurred: ' + JSON.stringify(error)); //eslint-disable-line
    });
  }

}

module.exports = EosReader
