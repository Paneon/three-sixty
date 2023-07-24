import { Container, ProgressBar } from 'react-bootstrap';
import React from 'react';

interface Props {
  show?: boolean;
}
export const LoadingBar = ({ show = false }: Props) => {
  return (
    <section hidden={!show} className="section my-4">
      <Container>
        <ProgressBar now={100} striped variant="primary" animated />
      </Container>
    </section>
  );
};
