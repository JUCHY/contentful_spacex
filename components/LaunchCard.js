import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function LaunchCard({ launch }) {
  const { name, launchDetails, missionPatchUrl } = launch.fields;
  const { id } = launch.sys;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Img variant="top" src={missionPatchUrl} />
        <Card.Text>{launchDetails}</Card.Text>
        <Button href={`/launch_overview/${id}`} variant="primary">Learn More</Button>
      </Card.Body>
    </Card>

  );
}

LaunchCard.propTypes = {
  launch: PropTypes.shape({
    fields: PropTypes.shape({
      name: PropTypes.string,
      launchDetails: PropTypes.string,
      missionPatchUrl: PropTypes.string,
    }).isRequired,
    sys: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default LaunchCard;
