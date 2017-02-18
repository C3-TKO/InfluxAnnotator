export const HTTP_METHOD = (process.env.HTTP_METHOD === 'http' || process.env.HTTP_METHOD === 'https' )
    ? process.env.HTTP_METHOD
    : 'https';