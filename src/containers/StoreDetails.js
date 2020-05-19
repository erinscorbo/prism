import React, { useState } from "react";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

const StoreDetails = (props) => {
  const [formState, setFormState] = useState(
    props.mode === "add"
      ? {
          name: "",
          city: "",
          thumbnail: "",
          Products: [
            { productname: "", productdescript: "", productprice: "" },
          ],
        }
      : {
          name: props.storeData.name,
          city: props.storeData.city,
          thumbnail: props.storeData.thumbnail,
          Products: props.storeData.productsList.map((product) => ({
            productname: product.productTitle,
            productdescript: product.productDescription,
            productprice: product.price,
          })),
        }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleChange = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });
  const handleAddProduct = (e) => {
    const newList = [
      ...formState.Products,
      { productname: "", productdescript: "", productprice: "" },
    ];
    var someProperty = { ...formState, Products: newList };
    setFormState(someProperty);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.mode === "add") {
      props.handleSubmit(formState);
    } else {
      props.handleSubmit(props.id, formState);
    }
    toggleModal();
  };
  const handleProduct = (e, index) => {
    var stateinfo = formState.Products.map((product, productIndex) => {
      if (index === productIndex) {
        return { ...product, [e.target.name]: e.target.value };
      } else {
        return product;
      }
    });
    var someProperty = { ...formState, Products: stateinfo };
    setFormState(someProperty);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(props.id);
    toggleModal();
  };
  return (
    <>
      <Modal toggle={toggleModal} isOpen={isModalOpen}>
        <ModalHeader toggle={toggleModal}>
          {props.mode === "add" ? "New" : "Edit"} Store Details
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="storeName" sm={3}>
                {" "}
                Store name:
              </Label>
              <Col sm={9}>
                <Input
                  value={formState.name}
                  type="text"
                  id="storeName"
                  name="name"
                  placeholder="Enter the name of your store.."
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="city" sm={3}>
                {" "}
                City:
              </Label>
              <Col sm={9}>
                <Input
                  value={formState.city}
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter the city of your store.."
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="thumbnail" sm={3}>
                {" "}
                Thumbnail:
              </Label>
              <Col sm={9}>
                <Input
                  value={formState.thumbnail}
                  type="text"
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Enter the logo URL.."
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            {formState.Products.map((product, index) => (
              <div key={index}>
                <FormGroup row>
                  <Label for={"product" + index} sm={3}>
                    {" "}
                    Product title:
                  </Label>
                  <Col sm={9}>
                    <Input
                      value={product.productname}
                      type="text"
                      id={"product" + index}
                      name={"productname"}
                      placeholder="Enter the name of your product.."
                      onChange={(e) => handleProduct(e, index)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for={"productdescript" + index} sm={3}>
                    {" "}
                    Product description:
                  </Label>
                  <Col sm={9}>
                    <Input
                      value={product.productdescript}
                      type="text"
                      id={"productdescript" + index}
                      name={"productdescript"}
                      placeholder="Enter the description of your product.."
                      onChange={(e) => handleProduct(e, index)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for={"productprice" + index} sm={3}>
                    {" "}
                    Product price:
                  </Label>
                  <Col sm={9}>
                    <Input
                      value={product.productprice}
                      type="text"
                      id={"productprice" + index}
                      name={"productprice"}
                      placeholder="Enter the price of your product.."
                      onChange={(e) => handleProduct(e, index)}
                    />
                  </Col>
                </FormGroup>
              </div>
            ))}
            <FormGroup>
              <Button
                color="info"
                onClick={handleAddProduct}
                style={{ margin: "10px" }}
              >
                Add product
              </Button>
            </FormGroup>
            <FormGroup check row className="float-right">
              {props.mode === "add" ? (
                ""
              ) : (
                <Button
                  color="warning"
                  onClick={handleDelete}
                  style={{ margin: "10px" }}
                >
                  Delete
                </Button>
              )}
              <Button
                color="success"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Button color="primary" onClick={toggleModal} style={{ margin: "10px" }}>
        {props.mode === "add" ? "Add a Store" : "Edit"}
      </Button>
    </>
  );
};

export default StoreDetails;
