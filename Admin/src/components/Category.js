import React from "react";


export default function Category(props) {
    const { item, setName, setId } = props


    const handleDelete = (name, id) => {
        setName(name)
        setId(id)
    }

    const handleUpdate = (name, id) => {
        setName(name)
        setId(id)
    }

    return (
        <>
            <tr>
                <td>{item.id}</td>
                <td>{item.ten}</td>
                <td>
                    <button onClick={() => handleDelete(item.ten, item.id)} className="btn btn-dark me-3" data-bs-toggle="modal" data-bs-target="#DeleteModal"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <button onClick={() => handleUpdate(item.ten, item.id)} className="btn btn-dark me-3" data-bs-toggle="modal" data-bs-target="#UpdateModal"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                </td>
            </tr>
        </>

    )
}