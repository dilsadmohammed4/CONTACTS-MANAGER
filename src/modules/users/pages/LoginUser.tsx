import NavBar from "../../layouts/pages/navbar/NavBar";
import {Heading} from "../../layouts/components/heading/Heading";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppDispatch, useAppDispatch} from "../../../redux/store";
import * as userAction from "../../../redux/users/users.action";


export const LoginUser = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userAction.loginUserAction({user: user})).then((response: any) => {
            if (!response.error) {
                navigate("/contacts/admin");
            }

        })
    }

    return (
        <>
            <NavBar color={'bg-dark'} heading={'Contact Manager'}/>
            <Heading color={'text-success'} heading={'Login here'}/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <form onSubmit={event => handleSubmit(event)}>
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
                                <input type="submit" className="btn btn-success" value="Login"/>
                                <Link to={"/"} className="btn btn-dark ms-2">Cancel</Link>
                            </div>
                        </form>
                        <small>Don't have an account?
                            <Link to={"/users/register"}
                                  className="text-primary text-decoration-none fw-bold"> Register</Link>
                        </small>
                    </div>
                </div>
            </div>
        </>
    );
};
