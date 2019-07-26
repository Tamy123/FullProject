import React, { Component } from "react";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      id: "",
      record: ""
    };
    this.ref = React.createRef();
  }
  componentDidMount() {
    const { record, id } = this.props.location.state;
    this.setState({ input: record.name, id: id, record: record });
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ input: this.ref.current.value });
  };

  submitSearch = () => {
    const { id, input, record } = this.state;
    let url = `http://localhost:3000/shipments/${id}`;
    let data = {
      name: input,
      cargo: record.cargo,
      mode: record.mode,
      type: record.type,
      destination: record.destination,
      origin: record.origin,
      services: record.services,
      total: record.total,
      status: record.status,
      userId: record.userId
    };

    fetch(url, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => alert("Success"))
      .catch(error => alert("Error"));
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h3>Edit the Shipment's Name</h3>
        </div>
        <input
          type="text"
          value={this.state.input}
          className="custom-width margin-bottom-10"
          onChange={this.handleChange}
          ref={this.ref}
        />
        <button type="submit" onClick={this.submitSearch}>
          Edit
        </button>
      </React.Fragment>
    );
  }
}

export default Edit;
