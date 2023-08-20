import NavBar from "../../layouts/pages/navbar/NavBar";
import {Heading} from "../../layouts/components/heading/Heading";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {AppDispatch, useAppDispatch} from "../../../redux/store";
import * as userAction from "../../../redux/users/users.action"


export const RegisterUser = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userAction.registerUserAction({user: user})).then((response: any) => {
            if (!response.error) {
                navigate("/users/login");
            }

        })
    }

    return (
        <>
            <NavBar color={'bg-dark'} heading={'Contact Manager'}/>
            <Heading color={'text-primary'} heading={'Register here'}/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <form onSubmit={event => handleSubmit(event)}>
                            <div className="mb-2">
                                <input
                                    name={'username'}
                                    onChange={e => updateInput(e)}
                                    value={user.username}
                                    required
                                    type="text" className="form-control" placeholder="Username"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    name={'email'}
                                    onChange={e => updateInput(e)}
                                    value={user.email}
                                    required
                                    type="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    name={'password'}
                                    onChange={e => updateInput(e)}
                                    value={user.password}
                                    required
                                    type="password" className="form-control" placeholder="Password"/>
                            </div>
                            <div className="mb-2">
                                <input type="submit" className="btn btn-primary" value="Register"/>
                                <Link to={"/"} className="btn btn-dark ms-2">Cancel</Link>
                            </div>
                        </form>
                        <small>Already have an account?
                            <Link to={"/users/login"}
                                  className="text-success text-decoration-none fw-bold"> Login</Link>
                        </small>
                    </div>
                </div>
            </div>
        </>
    );
};
