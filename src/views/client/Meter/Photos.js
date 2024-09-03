// import React, { useState } from 'react';
// import { Card, Row, Col, Image } from 'react-bootstrap';
// // import MeterPhotos from '../../../assets/images/MeterPhotos.png';
// import axios from 'axios';

// import upload from '../../../assets/images/upload.svg';
// import deleteimg from '../../../assets/images/delete.svg';

// function Device() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [preview, setPreview] = useState(null);

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setSelectedFile(file);

//         // Create a preview of the selected file
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setPreview(reader.result);
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         formData.append('meterInfoID', '1');


//         try {
//             const response = await axios.post('http://49.207.11.223:3307/images/uploadMeterImages', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('File uploaded successfully:', response.data);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };

//     return (
//         <>
//             <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24 }}>
//                 <div>
//                     <form onSubmit={handleSubmit}>
//                         <Row >
//                             <Col md={12} sm={12} xs={12} style={{ textAlign: 'end' }}>

//                                 <span style={{ marginRight: 20 }}><Image src={upload} alt="upload" /></span>
//                                 <span style={{ marginRight: 20 }}><Image src={deleteimg} alt="delete" /></span>
//                             </Col>
//                         </Row>
//                         <input type="file" accept="image/*" onChange={handleFileChange} />
//                         {preview && <img src={preview} alt="Preview" style={{ width: '200px', height: '200px' }} />}
//                         <button type="submit">Upload</button>
//                     </form>
//                 </div>
//             </Card>
//         </>
//     );
// }

// export default Device;


import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Image, Button } from 'react-bootstrap';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Checkbox, IconButton } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
// import upload from '../../../assets/images/upload.svg';
import deleteimg from '../../../assets/images/delete.svg';
import UploadIcon from '@mui/icons-material/Upload';


function MeterPhoto({ data1 }) {

    console.log(data1.meterId)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [getImages, setGetImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    // const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchImages();
    }, [])

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        // Create previews of the selected files
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
        setOpenDialog(true)
    };

    // const handleUploadClick = () => {
    //     setOpenDialog(true);
    // };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };


    const fetchImages = async () => {
        try {
            const response = await axios.post('http://49.207.11.223:3307/images/fetchMeterImages', { meterInfoID: data1.meterId })
            console.log(response)
            if (response && response.data && response.data.images) {
                setGetImages(response.data.images)

            }
        } catch (error) {
            console.log('error in fecth images', error)
            setGetImages([])
        }
    }
    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const imageChunks = chunkArray(getImages, 2);
    const handleSubmit = async () => {
        setOpenDialog(false);
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });
        // formData.append('meterInfoID', '1');
        formData.append('meterInfoID', data1.meterId);

        try {
            const response = await axios.post('http://49.207.11.223:3307/images/uploadMeterImages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSnackbarMessage('Image(s) uploaded successfully!');
            setSnackbarSeverity('success');
            setSelectedFiles('')
            setPreviews("")
            fetchImages()

            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            setSnackbarMessage('Error uploading Image(s).');
            setSnackbarSeverity('error');
            console.error('Error uploading file:', error);
        }
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const handleCheckboxChange = (image) => {
        setSelectedImages(prev =>
            prev.includes(image) ? prev.filter(i => i !== image) : [...prev, image]
        );
    };
    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };
    const handleDeleteClose = () => {
        setShowDeleteDialog(true);
    }
    // const handleClose = () => {
    //     setOpen(false);
    // };


    const handleDeleteConfirm = async () => {
        try {
            for (let image of selectedImages) {
                const response = await fetch('http://49.207.11.223:3307/images/deleteImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ meterImageID: image.meterImageID, meterInfoID: image.meterInfoID }),
                });
                if (!response.ok) {
                    throw new Error('Failed to delete image');
                }
            }
            setSnackbarMessage('Images deleted successfully');
            setSnackbarSeverity('success');
            // setGetImages([])
            fetchImages()
            // Refresh the images list here
            // For example, if you have a function to fetch images, call it here
            // fetchImages();
        } catch (error) {
            setSnackbarMessage('Failed to delete images');
            setSnackbarSeverity('error');
            console.error('Error deleting images:', error);
        } finally {
            setSelectedImages([]);
            setShowDeleteDialog(false);
            setSnackbarOpen(true);
        }
    };


    return (
        <>
            <Card style={{ margin: 0, padding: '16px', borderRadius: 8, marginBottom: 24 }}>

                <div>
                    <form>
                        <Row>
                            <Col md={12} sm={12} xs={12} style={{ textAlign: 'end' }}>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    id="file-input"
                                />

                                <label htmlFor="file-input">
                                    <UploadIcon
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '30px', // Adjust the size of the icon
                                            color: '#6C757D' // Adjust the color as needed
                                        }}
                                    />
                                </label>

                                {/* <label htmlFor="file-input" >
                                    <IconButton style={{ marginRight: 20 }}>
                                        <Image src={upload} alt="upload" />
                                    </IconButton>
                                </label> */}

                                <span>
                                    <IconButton onClick={handleDeleteClick}>
                                        <Image src={deleteimg} alt="delete" />
                                    </IconButton>
                                </span>
                            </Col>
                        </Row>

                        <div className='mt-3'>
                            {getImages.length > 0 ? (
                                imageChunks.map((chunk, chunkIndex) => (
                                    <div className='row' key={chunkIndex}>
                                        {chunk.map((item, index) => (
                                            <div className='col-md-6' key={index}>
                                                <div style={{ position: 'relative' }}>
                                                    <Checkbox
                                                        checked={selectedImages.includes(item)}
                                                        onChange={() => handleCheckboxChange(item)}
                                                        style={{ position: 'absolute', top: '10px', left: '10px' }}
                                                    />
                                                    <img
                                                        src={item.imageData}
                                                        style={{ height: "200px", width: "300px", margin: '10px' }}
                                                        alt={`Meter ${index}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    minHeight: '240px',
                                    margin: 'auto',
                                  }}>
                                    <h5>No images to show</h5>
                                </div>
                            )}
                        </div>
                        {/* {previews.length > 0 && (
                            <div style={{ marginTop: '16px' }}>
                                {previews.map((preview, index) => (
                                    <img key={index} src={preview} alt="Preview" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
                                ))}
                                <br />
                                <Button variant="primary" onClick={handleUploadClick} style={{ marginTop: '16px' }}>Upload Image</Button>
                            </div>
                        )} */}
                    </form>
                </div>
            </Card>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="md"
            >
                <Row container style={{ backgroundColor: '#000' }}>
                    <Col md={10} sm={12} xs={10}>
                        <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} >
                            Selected images
                        </DialogTitle>
                    </Col>
                    <Col md={1} sm={1} xs={1}>
                        <IconButton
                            aria-label="close"
                            onClick={handleDialogClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Col>
                </Row>
                {/* <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} id="customized-dialog-title">Selected images</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        {previews.length > 0 && (
                            <div style={{ marginTop: '16px' }}>
                                {previews.map((preview, index) => (
                                    <img key={index} src={preview} alt="Preview" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
                                ))}
                                <br />
                                {/* <Button variant="primary" onClick={handleUploadClick} style={{ marginTop: '16px' }}>Upload Image</Button> */}
                            </div>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleSubmit} color="primary">Yes</Button>
                    <Button onClick={handleDialogClose} color="primary">No</Button> */}
                    <Button variant="primary" onClick={handleSubmit}>Upload Image</Button>
                    <Button onClick={handleDialogClose} color="primary">Cancel</Button>

                </DialogActions>
            </Dialog>


            <Dialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
            >
                {/* <DialogTitle>Confirm Deletion</DialogTitle> */}
                <Row container style={{ backgroundColor: '#000' }}>
                    <Col md={10} sm={12} xs={10}>
                        <DialogTitle style={{ color: '#fff' }} sx={{ m: 0, p: 2 }} >
                            Selected images
                        </DialogTitle>
                    </Col>
                    <Col md={1} sm={1} xs={1}>
                        <IconButton
                            aria-label="close"
                            onClick={handleDeleteClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Col>
                </Row>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the selected images?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteDialog(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default MeterPhoto;
