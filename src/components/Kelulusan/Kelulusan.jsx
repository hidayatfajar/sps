import React, { Component } from "react";
import {
  Row,
  Col,
  FormSelect,
  Card,
  Form,
  Breadcrumb,
  Button,
  FormGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import DataSiswa from "./DataSiswa";
import axios from "axios";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

export default class Kelulusan extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    document.title = "Admin | Kelulusan";
    this.state = {
      data: [],
      selected_kelas: "",
      kelas: [],
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getKelas = () => {
    axios
      .get("https://api-sps.my.id/kelas/")
      .then((res) => {
        this.setState({
          kelas: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getKelas();
  }

  renderSelectedKelas(selected_kelas) {
    if (!selected_kelas) return;
    const siswa = DataSiswa[selected_kelas];

    return <DataSiswa name={this.state.selected_kelas} />;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      kelas: this.state.selected_kelas,
    };

    if (this.validator.allValid()) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Seluruh siswa kelas XII akan di luluskan",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, luluskan!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put("https://api-sps.my.id/kelulusan", data)
            .then((res) => {
              if (res.data.error === true) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${res.data.message}`,
                });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil!",
                  text: `${res.data.message}`,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Breadcrumb
              style={{
                marginTop: "-10px",
                marginBottom: "-22px",
              }}
            >
              <Breadcrumb.Item>
                <Link to="/admin/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Kelulusan</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Kelulusan</Card.Title>
            <hr />

            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={3} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Pilih Kelas<span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <FormSelect
                        name="selected_kelas"
                        value={this.state.selected_kelas}
                        onChange={this.handleChange}
                      >
                        <option value="">=== Pilih Kelas ===</option>
                        <option value="3">XII</option>
                      </FormSelect>
                      <div>
                        {this.validator.message(
                          "Kelas",
                          this.state.selected_kelas,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Pilih Kelas Yang Ingin Di Luluskan!",
                            },
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <Col>
                      <Button variant="outline-primary" type="submit">
                        Luluskan
                      </Button>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        {this.renderSelectedKelas(this.state.selected_kelas)}
      </div>
    );
  }
}
