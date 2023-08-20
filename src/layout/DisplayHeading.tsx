import React from "react";

interface IProps {
    heading: string
}

export const DisplayHeading: React.FC<IProps> = (props) => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <p className="h3 text-success">{props.heading}</p>
                    <p className="fat-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                        aliquam dolore dolorem doloremque fuga ipsam laborum maiores neque nesciunt nobis numquam
                        odio odit officiis perspiciatis, rerum sint totam ut, voluptas.</p>
                </div>
            </div>
        </div>
    );
};
