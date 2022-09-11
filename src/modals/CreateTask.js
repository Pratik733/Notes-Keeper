import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';


const CreateTaskPopup = ({ modal, toggle, save}) => {
    const [title, setTitle] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [body, setBody] = useState('');
    const NotesCollectionRef = collection(db, "Notes");
    var today = new Date();


    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "taskName") {
            setTitle(value)
        } else if (name === "tagLine") {
            setTagLine(value)
        } else {
            setBody(value)
        }
    }

    const notify = () => toast.error("Fill all the fields");

    const handleSave = async (e) => {
        e.preventDefault()
        if (!title || !tagLine || !body) {
            notify();
        }
        else {
            await addDoc(NotesCollectionRef, { title: title, tagline: tagLine, body: body, datetime: today, isPinned: false });
            save();
            setTitle("");
            setTagLine('');
            setBody("");
        }
    }



    return (
        <Modal isOpen={modal} toggle={toggle}>
            <Toaster position="top-right" />
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Tag Line</label>
                    <input type="text" className="form-control" value={tagLine} onChange={handleChange} name="tagLine" />
                </div>
                <div className="form-group">
                    <label>Text</label>
                    <textarea rows="5" className="form-control" value={body} onChange={handleChange} name="body"></textarea>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;