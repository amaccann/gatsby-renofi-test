import * as React from "react"
import { Link } from "gatsby"
import { Box } from 'rebass'

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <Box>Computer says no</Box>
    </main>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
