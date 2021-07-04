import React from "react"
import PropTypes from "prop-types"

import { Container, Row, Col, H4 } from "@everlywell/leaves"

const Header = ({ siteTitle, className }) => (
  <header className={className}>
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <H4>
            {siteTitle} <small>reports</small>
          </H4>
        </Col>
      </Row>
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
