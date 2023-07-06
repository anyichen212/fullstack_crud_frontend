import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";

// Import any actions required for transformations.

const UploadWidget = (props) => {
    //const cloudinaryRef = useRef();
    //const widgetRef = useRef();
    const [image, setImage] = useState("");
    //const [upload, setUpload] = useState(false);

    /*
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
        }, function(error, result){
            if (!error && result && result.event === "success") {
                console.log(result);

                props.setState({
                    ...props.state,
                    ["image"]: result.info.secure_url,
                });

                setUpload(true);
            }
        })
    }, [])
    */

    const submitImage = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
        
        fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, {
            method: "post",
            body: data
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
            props.setState({
                ...props.state,
                ["image"]: data.info.secure_url,
            });
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //<input type="button" value={upload ? "Change Image" : "Upload Image"} onClick={() => widgetRef.current.open()} />
    return (
        <Fragment>
            <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
        </Fragment>
        
    );
}

export default UploadWidget;