import React from "react";

interface IPros {
    errorMessage: string
}

export const ErrorMessage: React.FC<IPros> = (props) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3 className="text-danger">{props.errorMessage}</h3>
                    </div>
                </div>
            </div>
        </>
    );
};
