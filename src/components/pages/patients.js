import React from "react"
import { Row, Col, Input, Button, H4, Container } from "@everlywell/leaves"

const KitStatus = () => (
  <Container>
    <H4>Patients Page</H4>

    <Row>
      <Col md={10} xs={8}>
        <Input
          name="kit-status-search"
          type="search"
          placeholder="Search for name, phone, email"
        />
      </Col>
      <Col md={2} xs={4}>
        <Button appearance="primary">Advanced</Button>
      </Col>
    </Row>

    <Row>
      <Col>
        <H4>Table...</H4>
      </Col>
    </Row>
  </Container>
)

export default KitStatus
