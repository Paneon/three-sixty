import React, { useState } from 'react';
import { ModalAddTeam } from './ModalAddTeam';
import { ErrorNotification } from './ErrorNotification';
import { LoadingBar } from './LoadingBar';
import { TeamsList } from './TeamsList';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ViewModel } from '../../types/ViewModel';
import {
  TOnAddPerson,
  TOnAddTeam,
  TOnRemovePerson,
  TOnRemoveTeam,
  TOnRunFeedbackRound,
} from '../pages/AdminPage';
import { LoadingProgressBar } from './LoadingProgressBar';

interface Props {
  showLoading: boolean;
  error: string | null;
  teams: ViewModel[];
  progress: number;
  onAddTeam: TOnAddTeam;
  onRemoveTeam: TOnRemoveTeam;
  onAddPerson: TOnAddPerson;
  onRemovePerson: TOnRemovePerson;
  onRunFeedbackRound: TOnRunFeedbackRound;
}

export const AdminPageLayout = ({
  showLoading,
  error,
  teams = [],
  progress = 0,
  onAddTeam,
  onRemoveTeam,
  onAddPerson,
  onRemovePerson,
  onRunFeedbackRound,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const showProgressBar = progress !== 0;

  return (
    <section className="section">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto" id="team-details">
            <ModalAddTeam
              show={showModal}
              onHide={() => setShowModal(false)}
              onAddTeam={onAddTeam}
            />
            <LoadingBar show={showLoading} />
            <LoadingProgressBar show={showProgressBar} progress={progress} />

            <ErrorNotification errorMessage={error} />

            <TeamsList
              teams={teams}
              onRemovePerson={onRemovePerson}
              onRemoveTeam={onRemoveTeam}
              onAddPerson={onAddPerson}
              onRunFeedbackRound={onRunFeedbackRound}
            />

            <Button
              variant="primary"
              size="lg"
              className="my-3"
              onClick={() => setShowModal(true)}
            >
              Add Team
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
