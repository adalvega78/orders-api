class InvalidOrderTotalAmountException extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default InvalidOrderTotalAmountException;