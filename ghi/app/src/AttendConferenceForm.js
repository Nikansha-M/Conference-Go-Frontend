import React from 'react';

class AttendConferenceForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state will always be this.state -- state is referring to the component
        this.state = {
            name: '',
            email: '',
            conferences: []
        };

        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({ conference: value })
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleEmailChange(event) {
        const value = event.target.value;
        this.setState({ email: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state }; // leave this.state as is 
        delete data.conferences;
        console.log(data);

        const attendeesUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(attendeesUrl, fetchConfig);
        if (response.ok) {
            const newAttendee = await response.json();
            console.log(newAttendee);

            const cleared = {
                conference: '',
                name: '',
                email: '',
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        // from ghi/js/attend-conference.js
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            // setState method
            // since we're loading in all the conferences, use conferences
            this.setState({ conferences: data.conferences });

        }
    }

    render() {
        // show / hide the loading icon
        let spinnerClasses = 'd-flex justify-content-center mb-3';
        let dropdownClasses = 'form-select d-none';

        if (this.state.conferences.length > 0) {
            spinnerClasses = 'd-flex justify-content-center mb-3 d-none'
            dropdownClasses = 'form-select'
        }

        return (
            <div className="my-5">
                <div className="row">
                    <div className="col col-sm-auto">
                        <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
                    </div>

                    <div className="col">
                        <div className="card shadow">
                            <div className="card-body">
                                <form id="create-attendee-form">
                                    <h1 className="card-title">It's Conference Time!</h1>
                                    <p className="mb-3">
                                        Please choose which conference
                                        you'd like to attend.
                                    </p>
                                    <div className={spinnerClasses} id="loading-conference-spinner">
                                        <div className="spinner-grow text-secondary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <select value={this.state.conference} onChange={this.handleConferenceChange} name="conference" id="conference" className={dropdownClasses} required>
                                            <option value="">Choose a conference</option>
                                            {this.state.conferences.map(conference => {
                                                return (
                                                    <option key={conference.href} value={conference.href}>
                                                        {conference.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <p className="mb-3">
                                        Now, tell us about yourself.
                                    </p>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-floating mb-3">
                                                <input value={this.state.name} onChange={this.handleNameChange} required placeholder="Your full name" type="text" id="name"
                                                    name="name" className="form-control" />
                                                <label htmlFor="name">Your full name</label>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="form-floating mb-3">
                                                <input value={this.state.email} onChange={this.handleEmailChange} required placeholder="Your email address" type="email" id="email"
                                                    name="email" className="form-control" />
                                                <label htmlFor="email">Your email address</label>
                                            </div>
                                        </div>

                                    </div>
                                    <button className="btn btn-lg btn-primary">I'm going!</button>
                                </form>
                                <div className="alert alert-success d-none mb-0" id="success-message">
                                    Congratulations! You're all signed up!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AttendConferenceForm;
