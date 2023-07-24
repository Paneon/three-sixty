import { Container, Form, ProgressBar } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

interface Props {
  show?: boolean;
  progress: number;
}
export const LoadingProgressBar = ({ show = false, progress = 0 }: Props) => {
  return (
    <section hidden={!show} className="section my-4">
      <Container>
        We're just creating all the docs for your new user: this usually takes
        around a minute.
        <ProgressBar now={progress} striped variant="primary" animated />
      </Container>
    </section>
  );
};
