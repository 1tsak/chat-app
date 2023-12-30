import React from 'react'

export const MessageOptions = ({ id, elref, onAction }) => {
    const bodyStyle = {
        position: "absolute",
        borderRadius: "0.25rem",
        zIndex: "100",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        top: "20%",
        left: "50%",
        backgroundColor: "rgba(20, 20, 31, 11)"
    }
    const listStyle = {
        listStyle: "none",
        padding: "0.5rem 1rem",
        fontSize: "0.8rem"
    }
    const listItemStyle = {
        cursor: "pointer"
    }
    return (
        <div ref={elref} style={bodyStyle}>
            <ul style={listStyle}>
                <li onClick={() => { onAction("delete", id) }} style={listItemStyle}>Delete</li>
            </ul>
        </div >
    )
}
