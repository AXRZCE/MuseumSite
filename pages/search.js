import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';

export default function AdvancedSearch() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      isOnView: "true",
      isHighlight: "true",
    }
  });
  const router = useRouter();

  const submitForm = (data) => {
    // Build query string based on provided values
    let queryString = `searchBy=true`;
    if (data.geoLocation && data.geoLocation.trim() !== "") {
      queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
    }
    if (data.medium && data.medium.trim() !== "") {
      queryString += `&medium=${encodeURIComponent(data.medium)}`;
    }
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${encodeURIComponent(data.q)}`;

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3 text-center">Advanced Artwork Search</Card.Title>
              <Form onSubmit={handleSubmit(submitForm)}>
                {/* Search Term */}
                <Form.Group controlId="q" className="mb-3">
                  <Form.Label>
                    Search Term <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Impressionism, Mona Lisa"
                    {...register('q', { required: "Search term is required" })}
                    className={errors.q ? 'is-invalid' : ''}
                  />
                  {errors.q && (
                    <Form.Control.Feedback type="invalid">
                      {errors.q.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Optional Fields */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="geoLocation" className="mb-3">
                      <Form.Label>Geo Location</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          {/* Ensure Bootstrap Icons are loaded */}
                          <i className="bi bi-geo-alt"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Paris, New York"
                          {...register('geoLocation')}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="medium" className="mb-3">
                      <Form.Label>Medium</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-brush"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Paintings, Sculpture"
                          {...register('medium')}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Dropdowns */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="isOnView" className="mb-3">
                      <Form.Label>Is On View</Form.Label>
                      <Form.Select {...register('isOnView')}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="isHighlight" className="mb-3">
                      <Form.Label>Is Highlight</Form.Label>
                      <Form.Select {...register('isHighlight')}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Buttons */}
                <Row className="mt-4">
                  <Col className="d-flex justify-content-between">
                    <Button variant="primary" type="submit">
                      <i className="bi bi-search me-2"></i> Search
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => reset()}>
                      <i className="bi bi-x-circle me-2"></i> Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
