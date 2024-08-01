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
        var triggerFileUploader = () => {
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

       return ( 
            <div className={`modal ${uploadModal ? "open_this_modal" : ""}`}>
                <div className="modal-background" onClick={toggleModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{imageObject.name == '' ? "Upload Image": imageObject.name}</p>
                    </header>
                    <section className="modal-card-body">
                        <input style={{display: 'none'}} type="file" ref={uploadImageElement} />

                        {imageObject.url == ''?
                        <button onClick={triggerFileUploader} className="uploadImageBox">
                            <span>Upload Image</span>
                        </button>
                        : "Image url is found show it"}
                        <input placeholder="Title ( Image alt attribute )" value={imageObject.title} onChange={e => setImageObjectCallback({title: e.target.value})} type="text" />
                        <input placeholder="Name" value={imageObject.name} onChange={e => setImageObjectCallback({name: e.target.value})} type="text" />
                        <textarea placeholder="Description" value={imageObject.description} onChange={e => setImageObjectCallback({description: e.target.value})} />
                    </section>
                    <footer className="modal-card-foot">
                    <button onClick={toggleModal} className="button">Close</button>
                    <div style={{marginLeft:"auto"}}>
                        <button onClick={toggleModal} className="button red">Delete</button>
                        <button onClick={toggleModal} className="button blue">Save Media</button>
                    </div>
                    </footer>
                </div>
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
