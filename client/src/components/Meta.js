import React from 'react'
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

const Meta = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title && `${title} - Reddit Clone`}</title>
      <meta name="description" content="Created by Jacob Broughton, visit my github at www.github.com/jacobbroughton"/>

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content="Created by Jacob Broughton, visit my github at www.github.com/jacobbroughton" />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default Meta
