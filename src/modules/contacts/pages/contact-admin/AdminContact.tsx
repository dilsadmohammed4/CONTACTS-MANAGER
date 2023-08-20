import NavBar from "../../../layouts/pages/navbar/NavBar";
import {Heading} from "../../../layouts/components/heading/Heading";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Spinner} from "../../../layouts/components/spinner/Spinner";
import {ErrorMessage} from "../../../../layout/ErrorMessage";
import {ContactCard} from "./ContactCard";
import {useSelector} from "react-redux";
import store, {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as contactReducer from "../../../../redux/contacts/contacts.slice"
import * as contactAction from "../../../../redux/contacts/contacts.action"


export const AdminContact: React.FC = () => {


    const dispatch: AppDispatch = useAppDispatch();
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeature];
    })
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        dispatch(contactAction.getAllContactsAction());
        console.log("Inside contact admin useeffect");
    }, []);


    const clickDeleteContact = (contactId: string | undefined) => {

        if (contactId) {
            dispatch(contactAction.deleteContactAction({contactId: contactId}))
        }
    }

    // const searchContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchQuery(event.target.value);
    //     if (event.target.value.trim() !== "") {
    //         setState({
    //             ...state,
    //             filteredContact: state.contacts.filter(contact => contact.name.toLowerCase().trim().includes(event.target.value.toLowerCase().trim()))
    //         })
    //     } else {
    //         setState({
    //             ...state,
    //             filteredContact: state.contacts
    //         })
    //     }
    // }

    const {loading, contacts, errorMessage} = contactState;
    return (
        <>
            <NavBar color={'bg-dark'} heading={'Contact Manager'}/>
            <Heading color={'text-dark'} heading={'Manage Contacts'}/>
            {loading && <Spinner/>}
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input
                                        value={searchQuery}
                                        className="form-control" placeholder="Search here" type="text"/>
                                </div>

                                <div className="col">
                                    <input className="btn btn-dark me-2" type="Submit"/>
                                    <Link className="btn btn-success" to={'/contacts/add'}><i
                                        className="bi bi-plus-circle-fill"></i> New</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                contacts.length > 0 ? <>
                    <section className="mt-3">
                        <div className="container">
                            <div className="row">
                                {
                                    contacts.map((contact, index) => {
                                        return (
                                            <div className="col-sm-6 mt-3" key={contact._id}>
                                                {
                                                    contact && <ContactCard contact={contact}
                                                                            clickDeleteContact={clickDeleteContact}/>
                                                }
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </section>
                </> : <div className="container mt-3">
                    <div className="row">
                        <div className="col text-center">
                            <p className="h4 text-danger">No Contacts Found</p>
                        </div>
                    </div>
                </div>
            }

            {
                Object.keys(errorMessage).length > 0 && <ErrorMessage errorMessage={JSON.stringify(errorMessage)}/>
            }
        </>
    );
};
