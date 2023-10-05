import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import "./YourComponent.css";
const PremiumDetails = ({ user }) => {
  return (
    <div className="MainContainer">
      <div className="contactedPageMain ">
        <section>
          <div id="contactedPropertyHeading">
            <h4 className="mt-5">My Order :</h4>
          </div>
          <div style={{ maxWidth: "100%" }}>
            <div
              className="row shadow-sm no-gutters rounded-2 px-2 py-4"
              id="propertyCard"
            >
              <div className="details-wrapper d-flex align-items-center mb-2">
                <div className="premiumDetailBox detail-description">
                  <div className="labelTextForPremium">Description :</div>
                  <div className="valueTextForPremium">Bathrooms</div>
                </div>
                <div className="premiumDetailBox detail-name">
                  <div className="labelTextForPremium">Name :</div>
                  <div className="valueTextForPremium">demo</div>
                </div>
              </div>
              <hr />
              <div className="container mb-4">
                <div className="row">
                  <div className="col-6 col-md-4">
                    <div className="premiumDetailBox">
                      <div className="labelTextForPremium">Expires on :</div>
                      <div className="valueTextForPremium">
                        03 Novmber, 2023
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="premiumDetailBox">
                      <div className="labelTextForPremium">Order ID :</div>
                      <div className="valueTextForPremium">12345678</div>
                    </div>
                  </div>
                  <div className="col- col-md-4">
                    <div className="premiumDetailBox">
                      <div className="labelTextForPremium">Credits :</div>
                      <div className="valueTextForPremium">05 August, 2023</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-md-4">
                    <div className="premiumDetailBox">
                      <div className="labelTextForPremium">Credit used :</div>
                      <div className="valueTextForPremium">
                        03 Novmber, 2023
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="premiumDetailBox">
                      <div className="labelTextForPremium">
                        Remaining Credit :
                      </div>
                      <div className="valueTextForPremium">12345678</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="premiumDetailBox">
                      <div className="labelTextForPremium">
                        Remaining Credit :
                      </div>
                      <div className="valueTextForPremium">12345678</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-iterms-center justify-content-end">
                <Link to="/myaccount/contactedproperty">
                  <button className="btn btn-outline-primary rounded-pill ms-auto">
                    Contacted Property
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div id="contactedPropertyHeading">
            <h4 className="mt-5">Priority Details :</h4>
          </div>
          <div style={{ maxWidth: "100%" }}>
            <div
              className="row shadow-sm no-gutters rounded-2 px-2 py-4"
              id="propertyCard"
            >
              <Form>
                <FormGroup className="mb-3">
                  <Label for="budget">Budget</Label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="Please enter budget"
                    type="number"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label for="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Please enter your preffered location"
                    type="text"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label for="number-of-people">Number of People</Label>
                  <Input
                    id="number-of-people"
                    name="number-of-people"
                    type="select"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label for="exampleText">Description</Label>
                  <Input id="exampleText" name="text" type="textarea" />
                </FormGroup>

                <Button outline className="rounded-pill px-4" color="primary">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PremiumDetails;