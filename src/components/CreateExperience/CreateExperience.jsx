// import { useDispatch } from "react-redux";
import React from "react";
import styles from "../CreateExperience/CreateExperience.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { createNewExperience, getAllPackages } from "../../redux/action";


export default function Experiences() {
  const allPackages = useSelector((state) => state.allPackages);

  const [newExperience, setNewExperience] = React.useState({
    name: "",
    subTitle: "",
    price: "",
    decription: "",
    image: "",
    video: "",
    duration: "",
    score: "",
    categoryId: "",
    packageId: "",
  });

  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewExperience({
      ...newExperience,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    dispatch(createNewExperience(newExperience));
    setNewExperience({
      name: "",
      subTitle: "",
      price: "",
      decription: "",
      image: "",
      video: "",
      duration: "",
      score: "",
      categoryId: "",
      packageId: "",
    });
  };

  return (
    <div>
      <div className={styles.separator}></div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.modalbuttons}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="bi bi-node-plus"></i> New Experience
              </button>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Create a new experience
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Row className="mb-1">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Ex: Whale Watching"
                            name="name"
                            value={newExperience.name}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row className="mb-1">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom02"
                        >
                          <Form.Label>Subtitle</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Ex: A close encounter with wonderful beings"
                            name="subTitle"
                            value={newExperience.subTitle}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom03"
                        >
                          <Form.Label>Price $</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Ex: 7.500"
                            required
                            name="price"
                            value={newExperience.price}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a price.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom04"
                        >
                          <Form.Label>Duration</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ex: 3 hours"
                            required
                            name="duration"
                            value={newExperience.duration}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom05"
                        >
                          <Form.Label>Stock</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Ex: 3"
                            required
                            name="stock"
                            value={newExperience.stock}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please, enter a number other than 0.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-1">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom06"
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Write a description"
                            required
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-1">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom08"
                        >
                          <Form.Label></Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            name="categoryId"
                            value={newExperience.categoryId}
                            onChange={(e) => handleChange(e)}
                          >
                            <option selected>Select a category</option>
                            <option value="1">Cultural</option>
                            <option value="2">Adventure</option>
                            <option value="3">Landscape</option>
                            <option value="3">Air</option>
                            <option value="3">Nautic</option>
                            <option value="3">Termas</option>
                            <option value="3">Entertainment</option>
                            <option value="3">Gastronomic</option>
                            <option value="3">Sports</option>
                          </Form.Select>
                        </Form.Group>
                      </Row>
                      <Row className="mb-1">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom08"
                        >
                          <Form.Label></Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            name="packageId"
                            value={newExperience.packageId}
                            onChange={(e) => handleChange(e)}
                          >
                            <option selected>Select a package</option>
                            {allPackages &&
                              allPackages
                                .sort((a, b) => {
                                  if (a.name < b.name) return -1;
                                  if (a.name > b.name) return 1;
                                  return 0;
                                })
                                .map((p) => {
                                  return (
                                    <option value={p.id} key={p.id}>
                                      {p.name}
                                    </option>
                                  );
                                })}
                            ;
                          </Form.Select>
                        </Form.Group>
                      </Row>
                      <Row className="mb-1">
                        <Form.Label>
                          <i className="bi bi-card-image"></i> Images
                        </Form.Label>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom09"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Link image"
                            required
                            name="image"
                            value={newExperience.image}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid link.
                          </Form.Control.Feedback>
                        </Form.Group>

                      </Row>
                      <Row className="mb-1">
                        <Form.Label>
                          <i className="bi bi-play-btn-fill"></i> Video
                        </Form.Label>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom09"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Insert link video"
                            required
                            name="video"
                            value={newExperience.video}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid link.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Check
                          required
                          label="Agree to terms and conditions"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                      <Button type="submit">Submit form</Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.separator}></div>
    </div>
  );
}
