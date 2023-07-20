import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ProgressBar,
  Form,
  Toast,
} from 'react-bootstrap';
import { TeamCard } from '../components/TeamCard';
import { Google } from '../../types/GoogleRunScript';
import { serverFunctions } from '../utils/serverFunctions';
import { ModalAddTeam } from '../components/ModalAddTeam';

declare const google: Google;

export const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState([] as ViewModel[]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSuccessHandler = (responseData) => {
    setIsLoading(false);
    if ('error' in responseData && responseData.error) {
      setError(responseData.error);
      return;
    }
    setTeams(responseData);
  };

  const onErrorHandler = (error: ErrorMessage) => {
    setIsLoading(false);
    setError(error.error);
  };

  const handleAddTeam = (teamName: string) => {
    setIsLoading(true);
    serverFunctions
      .addTeam(teamName)
      .then(onSuccessHandler)
      .catch(onErrorHandler);
  };

  useEffect(() => {
    setIsLoading(true);
    serverFunctions.getTeams().then(onSuccessHandler).catch(onErrorHandler);
  }, []);

  const handleOnRemovePerson = (
    firstName: string,
    lastName: string,
    teamName: string,
  ) => {
    serverFunctions
      .removePerson({ firstName, lastName, teamName })
      .then(onSuccessHandler)
      .catch(onErrorHandler);
  };

  const handleRemoveTeam = (teamName: string) => {
    serverFunctions
      .removeTeam(teamName)
      .then(onSuccessHandler)
      .catch(onErrorHandler);
  };

  return (
    <div id="admin-page">
      <ModalAddTeam
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddTeam={handleAddTeam}
      />

      <Toast show={!!error} onClose={() => setError(null)}>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>

      <section className="section">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto" id="team-details">
              {teams.map((team, i) => {
                return (
                  <TeamCard
                    key={i}
                    teamName={team.teamName}
                    members={team.members}
                    onRemovePerson={handleOnRemovePerson}
                    onRemoveTeam={handleRemoveTeam}
                  />
                );
              })}
            </Col>
          </Row>
        </Container>
      </section>

      <section hidden={!isLoading} className="section">
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
    </div>
  );
};
