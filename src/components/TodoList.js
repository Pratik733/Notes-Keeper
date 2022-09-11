import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import PaginatedItems from "./Pagination";
import { ColorRing } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [fnotes, setFNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const NotesCollectionRef = collection(db, "Notes");

  const notifySave = () => toast.success("Note Saved Successfully");
  const notifyfetch = () => toast.error("Unable to fetch Notes");

  const q = query(
    NotesCollectionRef,
    orderBy("isPinned", "desc"),
    orderBy("datetime")
  );

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      const data = await getDocs(q);
      try {
        setFNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      catch (err) {
        notifyfetch();
      }
      setLoading(false);
    };
    getNotes();
  }, []);

  const saveTask = async () => {
    setModal(false);
    console.log("save");
    const data = await getDocs(q);
    setFNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    notifySave();
  };

  const reload = async () => {
    setModal(false);
    console.log("save");
    const data = await getDocs(q);
    setFNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const toggle = () => {
    setModal(!modal);
  };


  return (
    <>
      <Toaster position="top-right" />
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          class="btn btn-outline-light my-2 my-sm-0 navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setModal(true)}
        >
          Add Note
        </button>
        <a class="navbar-brand" href="" onClick={() => window.location.reload()}>
          Note Keeper
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <button
            class="btn btn-outline-light my-2 my-sm-0"
            onClick={() => setModal(true)}
          >
            Add Note
          </button>
        </div>
      </nav>

      <div className="task-container">
        {loading ? (
          <ColorRing
            visible={true}
            height="60vh"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
          />
        ) : (
          <PaginatedItems items={fnotes} itemsPerPage={6} saveTask={saveTask} reload={reload} />
        )}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} data={fnotes} reload={reload} />
    </>
  );
};

export default TodoList;
