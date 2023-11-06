import { useState } from 'react'
import img1 from './assets/images/image-1.webp'
import img2 from './assets/images/image-2.webp'
import img3 from './assets/images/image-3.webp'
import img4 from './assets/images/image-4.webp'
import img5 from './assets/images/image-5.webp'
import img11 from './assets/images/image-11.jpeg'
import img10 from './assets/images/image-10.jpeg'
import img7 from './assets/images/image-7.webp'
import img8 from './assets/images/image-8.webp'
import img9 from './assets/images/image-9.webp'

import './App.css'
import ImageGallery from './ImageGallery/ImageGallery'

function App() {
    const [state, setState] = useState([
        { id: 1, url: img11, checked: false, hover: false },
        { id: 2, url: img3, checked: false, hover: false },
        { id: 3, url: img2, checked: false, hover: false },
        { id: 4, url: img7, checked: false, hover: false },
        { id: 5, url: img5, checked: false, hover: false },
        { id: 6, url: img9, checked: false, hover: false },
        { id: 7, url: img10, checked: false, hover: false },
        { id: 8, url: img4, checked: false, hover: false },
        { id: 9, url: img8, checked: false, hover: false },
        { id: 10, url: img1, checked: false, hover: false },
        { id: 11, url: img3, checked: false, hover: false },

    ])

    const selectedFiles = state.filter(item => item.checked == true);

    const deleteHandler = () => {
        let data = [...state];
        data = data.filter(item => item.checked != true);
        setState(data)
    }

    const checkboxHandler = () => {
        let data = [...state];
        data = data.map(item => ({ ...item, checked: false }))
        setState(data)
    }

    return (
        <>
            <div className="main">
                <div className='body'>
                    <div className="header">
                        <div style={{ fontWeight: 'bold' }}>
                            {selectedFiles.length > 0 ?
                                <span>
                                    <input type="checkbox" checked={selectedFiles.length > 0} id='headerCheckbox' onChange={checkboxHandler}></input>{"  "}
                                    <label htmlFor='headerCheckbox'>
                                        {`${selectedFiles.length == 1 ? `${selectedFiles.length} file selected` :
                                            `${selectedFiles.length} files selected`}`}
                                    </label>
                                </span> :
                                <span>Gallery</span>
                            }
                        </div>
                        {selectedFiles.length > 0 && <span onClick={deleteHandler} className='deleteFile' >Delete {`${selectedFiles.length == 1 ? 'file' : 'files'}`} </span>}
                    </div>
                    <ImageGallery state={state} setState={setState} />
                </div>


            </div>
        </>
    )
}

export default App
