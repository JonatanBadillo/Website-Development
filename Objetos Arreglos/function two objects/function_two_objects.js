// funcion que recibe dos objetos y los compara
var process_transaction = function(account, transaction) {
	// si la cuenta es igual a la cuenta de origen de la transaccion
	if(account.account_number == transaction.from_account) {
		// se resta el monto de la transaccion al saldo actual de la cuenta
		account.current_balance = account.current_balance - transaction.amount;
	} else {
		// si la cuenta es igual a la cuenta de destino de la transaccion
		if(account.account_number == transaction.to_account) {
			// se suma el monto de la transaccion al saldo actual de la cuenta
			account.current_balance = account.current_balance + transaction.amount;
		} else {
			// Do nothing
		}
	}
};

