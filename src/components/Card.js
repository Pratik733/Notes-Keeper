import React, { useState } from 'react';
import EditTask from '../modals/EditTask'
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const Card = ({ taskObj, index, save, reload }) => {
    const [modal, setModal] = useState(false);
    const notifyDel = () => toast('Note Deleted Successfully!', {
        icon: '🗑️',
    });
    const notifyEditErr = () => toast.error("Fill all the Fields");

    const notifyEdit = () => toast('Note Edited Successfully!', {
        icon: '📝',
    });
    const notifyPin = () => toast('Note Pinned Successfully!', {
        icon: '📌',
    });
    const notifyUnPin = () => toast('Note Unpinned Successfully!', {
        icon: '❌',
    });

    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }


    const handleDelete = async () => {
        const deldoc = doc(db, "Notes", taskObj.id);
        await deleteDoc(deldoc);
        notifyDel();
        reload();
    }

    const togglePin = async () => {
        const pindoc = doc(db, "Notes", taskObj.id);
        await updateDoc(pindoc, { isPinned: !taskObj.isPinned });
        reload();
        if (!taskObj.isPinned) {
            notifyPin();
        } else {
            notifyUnPin();
        }
    }


    return (
        <div class="card-wrapper mx-4 my-4">
            <div class="card-top" style={{ "background-color": colors[index % 5].primaryColor }}></div>
            <div class="task-holder">
                <span class="card-header " style={{ "background-color": colors[index % 5].secondaryColor, "border-radius": "10px" }}>{taskObj.title}</span>
                <p className="mt-3"><span style={{ "fontWeight": "600" }}>Tag Line:</span> {" "}{taskObj.tagline}</p>
                <p className="overflow-auto scrollbar scrollbar-pink bordered-pink thin mb-4" style={{"--scroller":colors[index % 5].primaryColor}}>{taskObj.body}</p>
                <div style={{ "position": "absolute", "right": "20px", "bottom": "10px" }}>
                    <i className={`fa ${taskObj.isPinned ? "fa-bookmark" : "fa-bookmark-o"} mr-3`} style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={togglePin}></i>
                    <i className="far fa-edit mr-3" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={handleDelete}></i>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} taskdata={taskObj} reload={reload} notifyEdit={notifyEdit} notifyEditErr={notifyEditErr}/>
        </div>
    );
};

export default Card;