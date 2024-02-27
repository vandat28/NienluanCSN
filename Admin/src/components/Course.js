import React, { useState } from "react";

export default function Course(props) {
    const { category } = props
    const [data, setData] = useState()
    const [categoryId, setcategoryId] = useState()
    const [listTitle, setListTitle] = useState()
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        video: '',
        description: '',
        category: ''
    });

    const handleClick = (id, name) => {
        getApiData(id);
        setcategoryId(id)
        setListTitle(name)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Truy cập dữ liệu đã nhập trong formData và xử lý theo yêu cầu của bạn
        fetch('http://localhost:8080/api/admin/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(result => {
                // Xử lý kết quả từ server
                console.log(result);
                getApiData(formData.category)
                setFormData({
                    name: '',
                    image: '',
                    video: '',
                    description: '',
                    category: ''
                })


            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
        // Gửi dữ liệu đến server, thực hiện các tác vụ cần thiết, vv.
    };

    const getApiData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/course?id=${id}`);
            const data = await response.json();
            if (data) {
                setData(data);
            }
        } catch (error) {
            console.log('Đã xảy ra lỗi:', error);
        }

    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có muốn xóa")) {
            fetch(`http://localhost:8080/api/admin/course/${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    getApiData(categoryId)
                })
                .catch(error => {
                    console.error('Error:', error);

                });
        } else {
            return
        }

    }

    return (
        <main>
            <div className="container-fluid px-4 mt-4">
                <div className="list-group mb-4">
                    <p>
                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Danh sách khóa học<i className="fa fa-arrow-down ms-2" aria-hidden="true"></i>
                        </button>
                    </p>
                    <div className="collapse" id="collapseExample">
                        {category && category.map(item => (
                            <button key={item.id} onClick={() => handleClick(item.id, item.ten)} className="list-group-item list-group-item-action">
                                {item.ten}
                            </button>
                        ))
                        }
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                        {listTitle ? listTitle : 'Chọn khóa học'}
                    </div>
                    <div className="card-body">
                        <table id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th>Tên bài học</th>
                                    <th>Hình ảnh</th>
                                    <th>Miêu tả ngắn</th>
                                    <th>Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.ten}</td>
                                        <td>{item.hinhanh}</td>
                                        <td>{item.mieuta}</td>
                                        <td className="d-flex justify-content-left">
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-dark me-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                            <button className="btn btn-dark "><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                ))

                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-end">
                    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Thêm bài học</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label" >Tên bài học</label>
                                    <input type="tex" className="form-control" value={formData.name} name="name" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" >Hình ảnh</label>
                                    <input type="text" className="form-control" value={formData.image} name="image" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" >Video</label>
                                    <input type="text" className="form-control" value={formData.video} name="video" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" >Miêu tả ngắn</label>
                                    <input type="text" className="form-control" value={formData.description} name="description" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Thể loại</label>
                                    <select value={formData.category} name="category" onChange={handleChange} className="form-select" aria-label="Default select example">
                                        <option>--Chọn--</option>
                                        {category && category.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.ten}
                                            </option>
                                        ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="submit" className="btn btn-primary">Lưu</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}