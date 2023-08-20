import NavBar from "../navbar/NavBar";
import notFoundImage from "../../../../asset/image/404.gif";

export const NotFound = () => {
    return (
        <>
            <NavBar color={'bg-dark'} heading={'React Routing'}/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <img alt="Image not found" src={notFoundImage} style={{height: "500px"}}
                             className="m-auto d-block"/>
                    </div>
                </div>
            </div>
        </>
    );
};
