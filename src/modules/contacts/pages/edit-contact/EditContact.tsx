import NavBar from "../../../layouts/pages/navbar/NavBar";
import {Heading} from "../../../layouts/components/heading/Heading";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IContactsView} from "../../models/IContactsView";
import {Spinner} from "../../../layouts/components/spinner/Spinner";
import {ErrorMessage} from "../../../../layout/ErrorMessage";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import * as contactAction from "../../../../redux/contacts/contacts.action"
import {useSelector} from "react-redux";

interface IState {
    loading: boolean,
    contact: IContactsView,
    errorMessage: string
}

export const EditContact: React.FC = () => {

    const navigate = useNavigate();
    const {contactId} = useParams();
    const dispatch: AppDispatch = useAppDispatch();
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeature];
    })
    const {loading, contact: contactRedux, groups, errorMessage} = contactState;

    const [contact, setContact] = useState<IContactsView>({
        name: "",
        company: "",
        email: "",
        title: "",
        mobile: "",
        imageUrl: "",
        groupId: ""
    });


    useEffect(() => {
        if (contactId) {
            dispatch(contactAction.getAContactAction({contactId: contactId}));
        }
    }, [contactId]);

    useEffect(() => {
        dispatch(contactAction.getAllGroupsAction());
    }, []);

    useEffect(() => {
        if (contactRedux && Object.keys(contactRedux).length > 0) {
            setContact({
                ...contact,
                name: contactRedux.name ? contactRedux.name : "",
                company: contactRedux.company ? contactRedux.company : "",
                email: contactRedux.email ? contactRedux.email : "",
                title: contactRedux.title ? contactRedux.title : "",
                mobile: contactRedux.mobile ? contactRedux.mobile : "",
                imageUrl: contactRedux.imageUrl ? contactRedux.imageUrl : "",
                groupId: contactRedux.groupId ? contactRedux.groupId : "",
            })
        }
    }, [contactRedux]);

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(contactAction.updateContactAction({
            contact: contact,
            contactId: contactId
        })).then((response: any) => {
            if (!response.error) {
                navigate("/contacts/admin");
            }
        })

    }


    return (
        <>
            <NavBar color={'bg-dark'} heading={'Contact Manager'}/>
            <Heading color={'text-primary'} heading={'Edit Contacts'}/>
            {loading && <Spinner/>}
            {!loading && Object.keys(errorMessage).length > 0 &&
                <ErrorMessage errorMessage={JSON.stringify(errorMessage)}/>}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'name'}
                                        value={contact.name}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Name" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'imageUrl'}
                                        value={contact.imageUrl}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Photo Url" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'mobile'}
                                        value={contact.mobile}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Mobile" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'email'}
                                        value={contact.email}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Email" type="email"/>
                                </div>

                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'company'}
                                        value={contact.company}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Company" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'title'}
                                        value={contact.title}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Title" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <select
                                        required={true}
                                        name={'groupId'}
                                        value={contact.groupId}
                                        onChange={e => updateInput(e)}
                                        className="form-control">
                                        <option value="">Select a Group</option>
                                        {
                                            groups.map((group, index) => {
                                                return (<>
                                                    <option key={index} value={group._id}>{group.name}</option>
                                                </>)
                                            })
                                        }


                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-primary me-2" type="Submit" value="Update"/>
                                    <Link className="btn btn-dark" to="/contacts/admin">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                            {contact && contact.imageUrl &&
                                <img className="img-fluid rounded-circle shadow-lg" src={contact.imageUrl}
                                     alt="Image not found"/>}

                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};
