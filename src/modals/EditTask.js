import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


const EditTaskPopup = ({ modal, toggle, taskdata, reload, notifyEdit, notifyEditErr }) => {
    const [title, setTitle] = useState(taskdata.title);
    const [tagLine, setTagLine] = useState(taskdata.tagline);
    const [body, setBody] = useState(taskdata.body);

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

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!title || !tagLine || !body) {
            notifyEditErr();
        }
        else {
            const noteDoc = doc(db, "Notes", taskdata.id)
            await updateDoc(noteDoc, { title: title, tagline: tagLine, body: body });
            toggle();
            reload();
            notifyEdit();
        }
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
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
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;