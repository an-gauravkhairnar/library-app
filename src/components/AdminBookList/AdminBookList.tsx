import { IonButton, IonContent, useIonPopover } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import bookService from "../../services/book.service";
import { useLoadingAndToast } from "../../hooks/useLoadingAndToast";
import { adminColumn } from "../../constants/tableColums";
import { DELETERECORD, ERROR } from "../../constants/constants";
import AddBook from "../AddBook/AddBook";
import '../AdminBookList/AdminBookList.scss'

function AdminBookList() {
const Popover = () => <IonContent className="ion-padding"> <AddBook data={editData} dismiss={dismissModel} loadData={loadData}/></IonContent>;
  const { dismissLoader, showToast, presentLoader } = useLoadingAndToast();
  const [present, dismiss] = useIonPopover(Popover, {});
  const [isShow, setLoadData] = useState(false);
  const [data, setData] = useState<any>({});
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    dismissLoader();
    loadData();
  }, []);

  const loadData = async () => {
    const books = await getBook();
    const data = {
      columns: [...adminColumn],
      rows: [...books],
    };
    setData(data);
    setLoadData(true);
  };

  const getBook = async () => {
    const books = await bookService.getBooks();
    return books.map((data: any) => {
      return {
        ...data,
        edit: <IonButton color="secondary" onClick={() => editBook(data)}>Edit</IonButton>,
        delete: (
          <IonButton color="danger" onClick={() => removeBook(data.docId)}>Delete</IonButton>
        ),
      };
    });
  };

  const removeBook = async (id: any) => {
    presentLoader();
    bookService
      .removeBook(id)
      .then((res) => {
        showToast(DELETERECORD);
        loadData();
        dismissLoader();
      })
      .catch((error) => {
        showToast(ERROR);
      });
  };

  const editBook = (data: any) => {
    data.isEdit = true;
    setEditData(data);
    present();
  };

  const dismissModel = async () => {
    dismiss();
  };
  return (
    <div>
      <div className="container">
        <IonButton
          className="ion-margin"
          onClick={(e: any) => {
            setEditData("");
            present();
          }}
        >
          Add Book
        </IonButton>
        {isShow && (
          <div>
            <MDBDataTable striped bordered small data={data} barReverse />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBookList;
