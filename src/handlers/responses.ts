const sendResponse = (result: unknown, message: string) => {
  const response = {
    success: true,
    message: message,
    data: result,
  }

  return response
}

const errorResponse = (message: string) => {
  const response = {
    success: false,
    message: message,
  }
  return response
}

export { sendResponse, errorResponse }
