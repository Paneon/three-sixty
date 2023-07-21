import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { serverFunctions } from '../utils/serverFunctions';
import { ErrorNotification } from '../components/ErrorNotification';
import { SurveyRounds } from '../components/SurveyRounds';

export const ResultsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    setIsLoading(true);
    serverFunctions
      .getFeedbackData(searchValue)
      .then((responseData) => {
        setIsLoading(false);
        if ('error' in responseData && responseData.error) {
          setError(responseData.error);
        } else {
          setData(responseData);
        }
      })
      .catch((e: ErrorMessage) => {
        setError(e);
      });
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8} id="results-header">
            <ErrorNotification error={error} />
            <Card>
              <Card.Body>
                <Form>
                  <Row className="align-items-center">
                    <Col xs="auto" className="my-1">
                      <Form.Control
                        type="text"
                        placeholder="Firstname Lastname"
                        value={searchValue}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col xs="auto" className="my-1">
                      <Button
                        id="results-search"
                        variant="primary"
                        onClick={handleSearchClick}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Search'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={9} id="results-main">
            <SurveyRounds data={data} />
          </Col>
        </Row>
      </Container>
      <div id="vis"></div>
    </div>
  );
};

function createVegaSpec(roundData) {
  var width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  var chartWidth = width * 0.5;
  var chartHeight = chartWidth * 0.6;
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v3.json',
    description: '360 feedback output',
    title: '360 Feedback Results',
    width: chartWidth,
    height: chartHeight,
    layer: [
      {
        mark: {
          type: 'rule',
        },
        data: {
          values: [
            {
              color: 'Where you see yourself',
            },
          ],
        },
        encoding: {
          color: {
            field: 'color',
            sort: false,
            type: 'nominal',
            legend: {
              title: 'Legend',
            },
          },
        },
      },
      {
        mark: {
          type: 'rule',
        },
        data: {
          values: [
            {
              color: 'Where the team sees you',
            },
          ],
        },
        encoding: {
          color: {
            field: 'color',
            sort: false,
            type: 'nominal',
            legend: {
              title: '',
            },
          },
        },
      },
      {
        data: roundData.individual,
        mark: { type: 'point', size: 150 },
        encoding: {
          y: {
            field: 'result',
            type: 'quantitative',
            scale: { domain: [0, 3] },
          },
          x: { field: 'value', type: 'nominal', axis: { labelAngle: -40 } },
        },
      },
      {
        data: roundData.team,
        mark: { type: 'point', size: 150 },
        encoding: {
          y: {
            field: 'result',
            type: 'quantitative',
            scale: { domain: [0, 3] },
          },
          x: { field: 'value', type: 'nominal', axis: { labelAngle: -40 } },
          color: {
            value: 'orange',
          },
        },
      },
      {
        data: roundData.individual,
        mark: 'rule',
        encoding: {
          y: { field: 'result', type: 'quantitative', aggregate: 'mean' },
          size: { value: 2 },
          color: { value: '#377386' },
        },
      },
      {
        data: roundData.team,
        mark: 'rule',
        encoding: {
          y: { field: 'result', type: 'quantitative', aggregate: 'mean' },
          size: { value: 2 },
          color: { value: 'orange' },
        },
      },
    ],
  };
}
