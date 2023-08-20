import React from "react";
import {Link} from "react-router-dom";
import {IContactsView} from "../../models/IContactsView";

interface IProps {
    contact: IContactsView,
    clickDeleteContact: (contactId: string|undefined) => void
}

export const ContactCard: React.FC<IProps> = (props) => {
    const {contact, clickDeleteContact} = props;
    return (
        <>
            <div className="card shadow-lg">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-sm-3">
                            <img alt="Image not found" className="img-fluid rounded-circle"
                                 src={contact.imageUrl}/>
                        </div>
                        <div className="col-sm-8">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Name: <span
                                    className="fw-bold">{contact.name}</span>
                                </li>
                                <li className="list-group-item">
                                    Email: <span
                                    className="fw-bold">{contact.email}</span>
                                </li>
                                <li className="list-group-item">
                                    Mobile: <span
                                    className="fw-bold">+91 {contact.mobile}</span>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="col-sm-1 d-flex flex-column align-items-center">
                            <Link to={`/contacts/view/${contact._id}`}
                                  className="btn btn-warning">
                                <i className="bi bi-eye-fill"></i>
                            </Link>
                            <Link to={`/contacts/edit/${contact._id}`}
                                  className="btn btn-primary mt-2">
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                            <button className="btn btn-danger mt-2" onClick={() => clickDeleteContact(contact._id)}>
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
