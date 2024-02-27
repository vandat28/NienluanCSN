import React from "react";


export default function DeleteModal(props) {
    const { id, name, getApiCaterogy } = props

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/admin/category/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                getApiCaterogy()
            })
            .catch(error => {
                console.error('Error:', error);

            });
    }


    return (
        <>
            <div className="modal fade" id="DeleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bạn có chắc chắn muốn xóa?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {name}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button onClick={() => handleDelete(id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}