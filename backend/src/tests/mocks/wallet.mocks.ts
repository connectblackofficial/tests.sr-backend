const wallets = [
  {
    userId: 1,
    balance: 400,
    walletName: 'Carteira Principal',
  }
];

const newWallet = {
  id: 1,
  userId: 1,
  balance: 400,
  walletName: 'Carteira Principal',
}

const newAddWallet = {
  id: 1,
  userId: 1,
  balance: 600,
  walletName: 'Carteira Principal',
}

const addWallet = {
  userId: 1,
  balance: 200,
  walletName: 'Carteira Principal',
}

const subtractWallet = {
  userId: 1,
  balance: 200,
  walletName: 'Carteira Principal',
}

const subtractWalletInvalid = {
  userId: 1,
  balance: 900,
  walletName: 'Carteira Principal',
}

const succesAddWallet = (balance : number) => {
  return { message: 'Operation successful', updatedBalance: balance }
}

export {
  wallets,
  newWallet,
  newAddWallet,
  addWallet,
  succesAddWallet,
  subtractWallet,
  subtractWalletInvalid
}