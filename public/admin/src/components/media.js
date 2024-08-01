import React from "react"; 
import { NavbarContainer } from "./parts/navbar";
import { SidebarContainer } from "./parts/sidebar";
import { title } from "process";

var  MediaUploader = () => {
    var [uploadModal, setOpenUploadModal] = React.useState(false); 
      
    var toggleModal = () => {
        setOpenUploadModal(! uploadModal);
    }
 
    var ModalOfUploadImage = ({uploadModal, toggleModal, imageData}) => {

        var uploadImageElement = React.useRef('');
        const [selectedFile, setSelectedFile] = React.useState(null);


        var triggerFileUploader = (e) => {
            e.preventDefault();
            uploadImageElement.current.click();
        }

        var setImageObjectCallback = (data) => {
            var main_object = {...imageObject}; 
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

        var uploadMediaToServer = (e) => {
            e.preventDefault(); 
        }

        var handleFileChange = (event) => {
            
            const file = event.target.files[0];
            if (file) {
                console.log(file);
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageObjectCallback({
                        url: reader.result
                    })
                };
                reader.readAsDataURL(file);
            }

        }

       return ( 
            <div className={`modal ${uploadModal ? "open_this_modal" : ""}`}>
                <div className="modal-background" onClick={toggleModal}></div>
                <form className="modal-card modal-card-update-css">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{imageObject.name == '' ? "Upload Image": imageObject.name}</p>
                    </header>
                    <section className="modal-card-body modal-card-body-update-css">
                        <div>
                            <input style={{display: 'none'}} type="file" onChange={handleFileChange} accept="image/*" ref={uploadImageElement} />
                            {imageObject.url == ''?
                            <button onClick={triggerFileUploader} className="uploadImageBox">
                                <span>Upload Image</span>
                            </button>
                            : <img src={imageObject.url} alt={imageObject.title} className="image-responsive" />}
                        </div>
                        <div>
                            <input placeholder="url ( Full Image URL )" value={imageObject.url} onChange={e => setImageObjectCallback({url: e.target.value})} type="text" readOnly={true} />
                            <input placeholder="Title ( Image alt attribute )" value={imageObject.title} onChange={e => setImageObjectCallback({title: e.target.value})} type="text" />
                            <input placeholder="Name" value={imageObject.name} onChange={e => setImageObjectCallback({name: e.target.value})} type="text" />
                            <textarea placeholder="Description" value={imageObject.description} onChange={e => setImageObjectCallback({description: e.target.value})} />
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                    <button onClick={toggleModal} className="button">Close</button>
                    <div style={{marginLeft:"auto"}}>
                        <button onClick={toggleModal} className="button red">Delete</button>
                        {
                            imageObject.id == ''? <button onClick={uploadMediaToServer} type="submit" className="button blue">Save Media</button>: ''
                        } 
                    </div>
                    </footer>
                </form>
            </div>
        )
    }

    return (
        <div id="app">
            <NavbarContainer />
            <SidebarContainer />
            <ModalOfUploadImage uploadModal={uploadModal} toggleModal={toggleModal} />
            <section className="section main-section" style={{width:'95%', marginLeft: 'auto', marginRight: 'auto'}}>
                <button onClick={e => setOpenUploadModal(true)} className="button red">Upload Image</button>
                <div className="media-library">
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                    <div className="media-block"></div>
                </div>
                <ul className="paging-block">
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>4</a></li>
                </ul>
            </section>


        </div>
    );

}

export { MediaUploader };
