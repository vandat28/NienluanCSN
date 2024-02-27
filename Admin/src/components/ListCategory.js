import React, { useState } from "react";
import Category from "./Category";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";


export default function ListCategory(props) {
    const [input, setInput] = useState('');
    const { category, getApiCaterogy } = props
    const [name, setName] = useState()
    const [id, setId] = useState()


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { categoryName: input }
        fetch('http://localhost:8080/api/admin/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // Xử lý kết quả từ server
                console.log(result);
                getApiCaterogy()
                setInput('')
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
        console.log(data);

    }

    return (
        <main>
            <div className="container-fluid px-4 mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Thêm khóa học</label>
                        <div className="d-flex justify-content-center">
                            <input type="text" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} />
                            <div className="text-end"><button className="btn btn-dark"><i className="fa fa-plus" aria-hidden="true"></i></button></div>
                        </div>
                    </div>
                </form>
                <div className="card mb-4">
                    <div className="card-header ">
                        <i className="fas fa-table me-1"></i>
                        Danh sách loại khóa học
                    </div>
                    <div className="card-body">
                        <table id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên khóa học</th>
                                    <th>Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category ? (category.map(item => (
                                    <Category key={item.id} item={item} setName={setName} setId={setId} />
                                ))) : (
                                    <>
                                        Loading...
                                    </>
                                )
                                }
                            </tbody>
                        </table>
                        <DeleteModal name={name} id={id} getApiCaterogy={getApiCaterogy} />
                        <UpdateModal name={name} id={id} getApiCaterogy={getApiCaterogy} setName={setName} />
                    </div>
                </div>
            </div>
        </main>
    )
}