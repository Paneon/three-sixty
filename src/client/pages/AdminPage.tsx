import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ProgressBar,
  Form,
} from 'react-bootstrap';
import { serverFunctions } from '../utils/serverFunctions';
import { TeamCard } from '../components/TeamCard';

export const AdminPage = () => {
  const [teamName, setTeamName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);

  const handleAddTeam = (e) => {
    e.preventDefault();
    setIsLoading(true);
    serverFunctions.addTeam(teamName).then((r) => setTeams(r));
  };

  useEffect(() => {
    serverFunctions.getTeams().then((data) => {
      setTeams(data);
    });
  }, []);

  const handleOnRemovePerson = (
    firstName: string,
    lastName: string,
    teamName: string,
  ) => {
    serverFunctions
      .removePerson({ firstName, lastName, teamName })
      .then((data) => {
        setTeams(data);
      });
  };

  return (
    <div id="admin-page">
      <section className="section">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto" id="team-details">
              {teams.map((team) => {
                return (
                  <TeamCard
                    teamName={team.teamName}
                    members={team.members}
                    onRemovePerson={handleOnRemovePerson}
                  />
                );
              })}
            </Col>
          </Row>
        </Container>
      </section>

      <section id="page-loading" className="section">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <ProgressBar now={45} striped variant="primary" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowModal(true)}
              >
                Add Team
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="add-team-name">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. The trombones"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter the name for your new team here
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleAddTeam}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
