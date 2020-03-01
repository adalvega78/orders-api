class OrderNotFoundException extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default OrderNotFoundException;