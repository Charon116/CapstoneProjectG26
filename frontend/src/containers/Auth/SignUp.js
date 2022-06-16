import React, { Component} from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './SignUp.scss';
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { handleSignUpApi } from "../../services/userService";
import AuthService from '../../services/auth.service';

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
        <div className="invalid-feedback d-block">
            This is not a valid email.
        </div>
        );
    }
};
const validPhone = (value) => {
    if(value && value.length !== 10){
        return (
            <div className="invalid-feedback d-block">
                This is not a valid phone number.
            </div>
        );
    }
}

const vpassword = (value) => {
if (value.length < 6 || value.length > 40) {
    return (
    <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
    </div>
    );
}
};


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            successful: false,
            message: '',
        };
    }

    onChangeUsername(e) {
        this.setState({
        username: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
        firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
        lastName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
        email: e.target.value
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
        phoneNumber: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
        address: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
        gender: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
        password: e.target.value
        });
    }

    handleRegister = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {           
            AuthService.register(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName,
                this.state.phoneNumber,
                this.state.address,
                this.state.gender
                ).then(
                response => {
                    this.setState({
                        //message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                    this.setState({
                    successful: false,
                    message: resMessage
                    });
                }
                );
        }
    }

    render() {
        return (
        <div className=" signup-background">
            <div className="signup-container">
                <div className="signup-content row">
                <div className='col-12 text-signup'>Sign Up</div>
                <Form
                    onSubmit={this.handleRegister}
                    ref={c => {
                    this.form = c;
                    }}
                >
                    {!this.state.successful && (
                    <div>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChangeFirstName}
                                    validations={[required]}
                                />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChangeLastName}
                                    validations={[required]}
                                />
                                </div>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="email"
                            className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            validations={[required, validEmail]}
                        />
                        </div>

                        <div className="form-group mt-3">
                        <label htmlFor="phoneNumber">PhoneNumber</label>
                        <Input
                            type="tel"
                            className="form-control"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                            validations={[required, validPhone]}
                        />
                        </div>

                        <div className="form-group mt-3">
                        <label htmlFor="address">Address</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                            validations={[required]}
                        />
                        </div>

                        <div className="form-group mt-3">
                        <label htmlFor="gender">Gender</label>
                        <select
                            className="form-control"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.onChangeGender}
                            validations={[required]}
                        >
                            <option selected>Choose gender...</option>
                            <option value={1}>Male</option>
                            <option value={0}>Female</option>
                        </select>
                        </div>

                        <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required, vpassword]}
                        />
                        </div>

                        <div className="form-group mt-3">
                        <button className="btn-signup">Sign Up</button>
                        </div>
                    </div>
                    )}

                    {this.state.message && (
                    <div className="form-group">
                        <div
                        className={
                            this.state.successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                        >
                        {this.state.message}
                        </div>
                    </div>
                    )}
                    <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                    />
                </Form>
                </div>
            </div>
        </div>
        );
    }
}

