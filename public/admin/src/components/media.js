import React from "react";
import { NavbarContainer } from "./parts/navbar";
import { SidebarContainer } from "./parts/sidebar";
import { Helper } from "../helper";

var MediaUploader = () => {
    var [uploadModal, setOpenUploadModal] = React.useState(false);
    var [media, setMedia] = React.useState([]);
    var [imageData, setImageDataObject] = React.useState(null);
    var [currentPage, setCurrentPage] = React.useState(1);
    var mediaPerPage = 15;

    var toggleModal = () => {
        setOpenUploadModal(!uploadModal);
    }

    var resetImageObject = () => {
        setImageDataObject({
            url: '',
            title: '',
            name: '',
            description: '',
            id: ''
        });
    };

    var ModalOfUploadImage = ({ uploadModal, toggleModal, imageData }) => {
        var uploadImageElement = React.useRef('');
        var [selectedFile, setSelectedFile] = React.useState(null);
        var [preloader, setPreloader] = React.useState(false);

        var triggerFileUploader = (e) => {
            e.preventDefault();
            uploadImageElement.current.click();
        }

        var setImageObjectCallback = (data) => {
            var main_object = { ...imageObject };
            var keys = Object.keys(data);
            keys.forEach(x => {
                main_object[x] = data[x];
            });
            setImageObject(main_object)
        }

        var [imageObject, setImageObject] = React.useState({
            url: '',
            title: '',
            name: '',
            description: '',
            id: ''
        });

        React.useEffect(() => {
            if (imageData) {
                setImageObject({
                    url: imageData.url,
                    title: imageData.title,
                    name: imageData.name,
                    description: imageData.description,
                    id: imageData._id,
                });
            }
        }, [imageData]);
         
        var uploadMediaToServer = (e) => {
            e.preventDefault();
            setPreloader(true);
        
            if (imageObject.title === '' || imageObject.name === '') {
                alert("Name and title of image should not be empty!");
                setPreloader(false);
                return;
            }
        
            const formData = new FormData();
            if (!imageObject.id) {
                // Only append the file if it's a new upload
                formData.append('image', selectedFile);
                formData.append('name', imageObject.name);
            }
            formData.append('title', imageObject.title);
            formData.append('description', imageObject.description);
            if (imageObject.id) {
                formData.append('id', imageObject.id);
            }
        
            Helper.sendRequest({
                is_file: true,
                api: "media/upload",
                method: "post",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                setPreloader(false);
                if (res.is_error) {
                    return;
                }
                 
                setImageObjectCallback({
                    title: res.data.title,
                    name: res.data.name,
                    url: res.data.url,
                    description: res.data.description
                });

                fetchAllMedia();
                toggleModal(); // Close the modal after saving
            });
        }
        

        var handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    var name = file.name;
                    if (name.lastIndexOf('.') !== -1) {
                        name = name.substring(0, name.lastIndexOf('.'))
                    }
                    setImageObjectCallback({
                        url: reader.result,
                        name: name
                    })
                };
                reader.readAsDataURL(file);
            }
        }

        var deleteImageFromServer = (id) => {
            Helper.sendRequest({
                api: `media/${id}`,
                method: "delete",
                data: {}
            }).then(res => {
                if (res.is_error) {
                    alert(res.message);
                    return;
                }

                fetchAllMedia();
                toggleModal(); // Close the modal after deleting
            });
        }

        return (
            <div className={`modal ${uploadModal ? "open_this_modal" : ""}`}>
                <div className="modal-background" onClick={toggleModal}></div>
                <div className="modal-card modal-card-update-css">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{imageObject.name === '' ? "Upload Image" : imageObject.name}</p>
                    </header>
                    <section className="modal-card-body modal-card-body-update-css">
                        <div>
                            <input style={{ display: 'none' }} type="file" onChange={handleFileChange} accept="image/*" ref={uploadImageElement} />
                            {imageObject.url === '' ?
                                <button onClick={triggerFileUploader} className="uploadImageBox">
                                    <span>Upload Image</span>
                                </button>
                                : <img crossOrigin="anonymous" src={imageObject.url} alt={imageObject.title} className="image-responsive" />}
                        </div>
                        <div>
                            <input placeholder="url ( Full Image URL )" value={imageObject.url} onChange={e => setImageObjectCallback({ url: e.target.value })} type="text" readOnly={true} />
                            <input placeholder="Title ( Image alt attribute )" value={imageObject.title} onChange={e => setImageObjectCallback({ title: e.target.value })} type="text" />
                            <input placeholder="Name" value={imageObject.name} onChange={e => setImageObjectCallback({ name: e.target.value })} type="text" />
                            <textarea placeholder="Description" value={imageObject.description} onChange={e => setImageObjectCallback({ description: e.target.value })} />
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={toggleModal} className="button">Close</button>
                        <div style={{ marginLeft: "auto" }}>
                            
                            {
                                imageObject.id !== '' ?  <button onClick={e => deleteImageFromServer(imageObject.id)} className="button red">Delete</button>: ''
                            }
                           
                           <button onClick={uploadMediaToServer} type="submit" className="button blue">
                                {preloader ? <span className='loader'></span> : 'Save Media'}
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }

    var fetchAllMedia = () => {
        Helper.sendRequest({
            api: "media/all",
            method: "get",
            data: {}
        }).then(x => {
            if (x.is_error) {
                return;
            }
            setMedia(x.data);
        });
    }

    React.useEffect(() => {
        fetchAllMedia();
    }, []);

    var handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    var renderPagination = () => {
        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(media.length / mediaPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <a onClick={() => handlePageChange(number)} className="page-link">
                    {number}
                </a>
            </li>
        ));
    }

    var indexOfLastMedia = currentPage * mediaPerPage;
    var indexOfFirstMedia = indexOfLastMedia - mediaPerPage;
    var currentMedia = media.slice(indexOfFirstMedia, indexOfLastMedia);

    var restoreObjectData = (imgObject) => {
        setImageDataObject(imgObject);
        setOpenUploadModal(true);
    }

    var handleUploadImageClick = () => {
        setImageDataObject(null);
        resetImageObject();
        setOpenUploadModal(true);
    }

    return (
        <div id="app">
            <NavbarContainer />
            <SidebarContainer />
            <ModalOfUploadImage uploadModal={uploadModal} toggleModal={toggleModal} imageData={imageData} />
            <section className="section main-section" style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                <button onClick={handleUploadImageClick} className="button red">Upload Image</button>
                <div className="media-library">
                    {
                        currentMedia.map((x, k) => {
                            return (
                                <div onClick={e => restoreObjectData(x)} className="media-block" key={k}>
                                    <img crossOrigin="anonymous" src={x.url} alt={x.title}/>
                                </div>
                            );
                        })
                    }
                </div>
                <ul className="paging-block">
                    {renderPagination()}
                </ul>
            </section>
        </div>
    );
}

export { MediaUploader };
