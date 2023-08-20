import NavBar from "../../../layouts/pages/navbar/NavBar";
import {Heading} from "../../../layouts/components/heading/Heading";
import {Link, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Spinner} from "../../../layouts/components/spinner/Spinner";
import {ErrorMessage} from "../../../../layout/ErrorMessage";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as contactReducer from "../../../../redux/contacts/contacts.slice"
import * as contactAction from "../../../../redux/contacts/contacts.action"

export const ViewContact: React.FC = () => {


    const {contactId} = useParams();
    const dispatch: AppDispatch = useAppDispatch();

    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeature];
    })

    console.log(contactState)

    useEffect(() => {
        if (contactId) {
            dispatch(contactAction.getAContactAction({contactId: contactId}));
        }
    }, [contactId]);

    const {loading, contact, errorMessage, group} = contactState;
    return (
        <>
            <NavBar color={'bg-dark'} heading={'Contact Manager'}/>
            <Heading color={'text-warning'} heading={'View Contact'}/>
            {loading && <Spinner/>}
            {
                contact && group && Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                <section className="mt-3">
                    <div className="container">
                        <div className="row mt-3 align-items-center">
                            <div className="col-sm-3">
                                <img alt="Image not found" className="img-fluid rounded-circle shadow-lg"
                                     src={contact.imageUrl}/>
                            </div>
                            <div className="col-sm-8 offset-1">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Name: <span className="fw-bold">{contact.name}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Email: <span className="fw-bold">{contact.email}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Mobile: <span className="fw-bold">{contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Company: <span className="fw-bold">{contact.company}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Title: <span className="fw-bold">{contact.title}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Group: <span className="fw-bold">{group.name}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Link to="/contacts/admin" className="btn btn-warning">
                                    <i className="bi bi-arrow-left-circle-fill"></i> Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            }
            {!loading && Object.keys(errorMessage).length > 0 &&
                <ErrorMessage errorMessage={JSON.stringify(errorMessage)}/>}

        </>
    );
};
