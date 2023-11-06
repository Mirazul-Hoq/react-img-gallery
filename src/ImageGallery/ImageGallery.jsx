import { useRef } from 'react'
import './ImageGallery.css'
import img from '../assets/images/store_img.png'

export default function ImageGallery({ state, setState }) {

    const dragItem = useRef();
    const dragOverItem = useRef();

    const inputFileProp = useRef(null);

    const dragStart = (e, position) => {
        dragItem.current = position;

    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...state];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setState(copyListItems);
    };

    const checkedHandler = (e, id) => {
        const imageIndex = state.findIndex(item => item.id == id);
        const imageUpdate = state.find(item => item.id == id);
        const copyListItems = [...state];
        copyListItems[imageIndex] = { ...imageUpdate, checked: !imageUpdate.checked }
        setState(copyListItems)
    }

    const handleFileChange = (event) => {
        const copyListItems = [...state];
        copyListItems.push({ id: copyListItems.length + 1, url: URL.createObjectURL(event.target.files[0]), hover: false })
        setState(copyListItems)
        event.target.files = null
    };

    return (
        <div className='image-grid'>
            {state.map((image, index) => (
                <div
                    className={`main-div ${index == 0 ? 'image-grid-col-2 image-grid-row-2' : ''}`}
                    key={index}
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={drop}
                    draggable={!image.checked}
                    style={{ opacity: image.checked ? 0.6 : 1 }}
                >
                    <label className="container" >
                        <input
                            type="checkbox" checked={image.checked} onChange={e => checkedHandler(e, image.id)}></input>
                        <span className="checkmark"></span>
                    </label>
                    <img
                        src={image.url}
                        className="grid-img"
                    />

                    {
                        !image.checked &&
                        <div className="overlay">
                            <div className="text"></div>
                        </div>
                    }
                </div>
            ))}

            <div>
                <img src={img} className="grid-img" onClick={() => inputFileProp.current.click()} />
                <input
                    type="file"
                    onChange={e => handleFileChange(e)}
                    ref={inputFileProp}
                    style={{ display: "none" }}
                    multiple
                />
            </div>
        </div>
    )
}
