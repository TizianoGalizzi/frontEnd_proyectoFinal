// import nav
//import useEffect, useState
import "./css/style.css";
import React, { useState, useEffect } from "react";
import NavAdmin, { NavPublic } from "./Nav";
import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faArrowLeft,
  faUserPlus,
  faUserXmark,
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [docente, setDocente] = useState([])

  const destructureId = (docente) => {
    for (let i = 0; i < docente.length; i++) {
        if (users.indexOf(docente[i].id == -1)) {
            setUsers(users => [...users, alumnos[i].id])
        } else {
            continue;
        }
    }
debugger
}
  useEffect(() => {
      let usersMethod = {
          method: 'GET',
          headers:{'authorization': sessionStorage.getItem('token')}
        }
        let docentesId = {
            method : 'POST',
            headers:{'authorization':sessionStorage.getItem('token')}
        }
    fetch("http://localhost:3030/users/setRol", docentesId).then(res=>{
        return res.json().then(body=>{
            return{
                status: res.status,
                ok: res.ok,
                headers: res.headers,
                body:body
            }
        })
    })
    .then(result=>{
        if(result.ok){
            setDocente(result.body)
        }else{
            alert(result.body.message)
        }
    })
    
    fetch("http://localhost:3030/users/setRol", usersMethod).then((res) => {
      return res
        .json()
        .then((body) => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body,
          };
        })
    })
    .then((result) => {
        if (result.ok) {
          alert("Fue un exito!");
          setUsers(result.body);
        } else {
          alert(result.body.message);
        }
      }); 
  }, []);
  return (
    <>
      <div>
        <Table className="table-listCourses" responsive="sm" striped bordered>
          <thead>
            <tr className="t-head-bg"> 
              <th>ID</th>
              <th>Nickname</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              let docente = IDdocentes.indexOf(user.id) != -1;
              return (
                <tr className={docente ? "inscriptedAlumns-tr" : ""}>
                  <td className="listCourses-td">{user.id} </td>
                  <td className="listCourses-td">{user.nickname} </td>
                  <td className="listCourses-td">{user.email} </td>
                  <td className="listCourses-td">{user.rol} </td>
                  {docente ? (
                    <td className="settingsButton-container">
                      <Button className="settingsButton-td td-delete">
                        <FontAwesomeIcon icon={faUserUnlock} />
                      </Button>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <Modal
          show={confirmModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Otorgar Privilegios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Seguro que deseas otorgar privilegios a <b>{user.nickname}</b>?.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button onClick={() => addPrivilegies()} variant="primary">
              Convertir en docente
            </Button>
          </Modal.Footer>
        </Modal> */}
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}
export default function SetRol() {
  let token = sessionStorage.getItem("token");
  const [users, setUsers] = useState([]);

  if (token) {
    let decoded = jwt_decode(token);
    return (
      <>
        <NavAdmin nickname={decoded.nickname} />
        <section>
          <div className="container">
            <p>Lista de usuarios</p>
            <ListUsers/>
          </div>
        </section>
      </>
    );
  }
}
