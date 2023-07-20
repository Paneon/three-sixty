import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const HomePage = () => {
  return (
    <div id="home-page">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="text-center">
                  What is 360 Feedback?
                </Card.Title>
                <Card.Text className="text-justify">
                  <strong>360° Feedback</strong> is a process through which
                  feedback for a person is gathered from a multitude of sources
                  such as their subordinates, peers, managers and even customers
                  or anyone that they interact with as well as from themselves.
                  It aims to provide a fuller picture of the areas that a person
                  should sustain and those where they should focus on improving.
                  This tool is designed to provide a bare-bones system for
                  conducting this kind of feedback for teams and managers. It is
                  not designed for performance appraisals but simple as a tool
                  to support individual development.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="text-center">Results</Card.Title>
                <Card.Text>
                  In the results tab you will be able to search for a detailed
                  breakdown of an individuals 360° results. To begin head over
                  to that tab, enter the individuals full name (firstname
                  lastname) and click 'Search'.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Admin</Card.Title>
                <Card.Text>
                  The Admin panel is designed to allow you to do everything you
                  need to to manage the teams 360° feedback cycles.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
