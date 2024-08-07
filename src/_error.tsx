import { NextPageContext } from 'next'

const ErrorPage = ({ statusCode, err }: { statusCode: number, err: Error }) => {
  console.error(`Error occurred: ${statusCode}`, err);
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  console.error(`getInitialProps error: ${statusCode}`, err);
  return { statusCode, err }
}

export default ErrorPage