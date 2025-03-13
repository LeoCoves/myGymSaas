import React from "react";

export const CardInfo = ({title, info, image, width, height}) => {
    return(
        <div className="card" style={
            {
                width: width,
                height: height
            }
        }>
            <div className="card-body">
                <img src={image} width="50px" height="50px"></img>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {info}
                </p>
                {/* <button href={linkBtn} className="btn btn-primary">{textBtn}</button> */}
            </div>
        </div>
    )
}