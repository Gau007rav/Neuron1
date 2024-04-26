import React from "react";

const ChildContainer = ({ name, number }) => {
    return (
        <div className={`child ${name}`}>
            <h1>Box {number}</h1>
            <h2>DataNeuron</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptate possimus nihil harum. Illo placeat, quis adipisci consequatur nostrum, vel accusantium debitis fugit ipsam ab voluptate molestias quaerat cum mollitia?
            </p>
        </div>
    );
};

export default ChildContainer;