import React from "react";


export default function UpdateModal(props) {
    const { name, id, setName, getApiCaterogy } = props

    const update = (id, event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/admin/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Các headers khác nếu cần
            },
            body: JSON.stringify({ name }) // Dữ liệu cần gửi lên server
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
            <form onSubmit={(e) => update(id, e)} className="modal fade" id="UpdateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sửa khóa học</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Sửa</button>
                        </div>
                    </div>
                </div>
            </form>
        </>

    )
}