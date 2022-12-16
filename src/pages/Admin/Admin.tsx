import { IonButton, IonContent, useIonPopover } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import '../Admin/Admin.scss'
import AddBook from '../../components/AddBook/AddBook';
import bookService from '../../services/book.service';
import { useLoadingAndToast } from '../../hooks/useLoadingAndToast';
import { column } from '../../constants/tableColums';

const AdminPage: React.FC = () => {
  const Popover = () => <IonContent className="ion-padding"> <AddBook /></IonContent>;
  const { showToast, presentLoader, dismissLoader } = useLoadingAndToast();

  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data: any, role: string) => dismiss(data, role),
  });

  let books: any = [];
  let tableData = [];
  const [roleMsg, setRoleMsg] = useState('');
  const [book, setBooks] = useState('');
  const [isShow, setIsBooks] = useState(false);
  const [data, setData] = useState<any>({});


  useEffect(() => {
    dismissLoader();
    loadData()
  }, []);

  const loadData = async () => {
    const books = await getBook();
    const data = {
      columns: [...column],
      rows: [...books]
    }
    console.log(data);
    setData(data)
    setIsBooks(true)
  }

  const getBook = async () => {
    books = await bookService.getBooks();
    console.log('TCL ->  ~ file: Admin.tsx:32 ~ getBook ~ books', books);
    return books.map((row: any) => {
      return {
        ...row,
        delete: (
          <IonButton onClick={editBook}>Edit</IonButton>
        ),
        edit: (
          <IonButton onClick={deleteBook}>Delete</IonButton>
        ),
      };
    })
  }



  const deleteBook = () => {
    console.log("deleteData")
  }

  const editBook = () => {
    console.log("update data")
  }

  // const data = {

  //   columns: [...column],
  //   rows: [...books],
  //   // rows: [
  //   //   {
  //   //     book_name: 'Tiger Nixon',
  //   //     autour_name: 'System Architect',
  //   //     book_category: 'Comic Book',
  //   //   },
  //   //   {
  //   //     book_name: 'Garrett Winters',
  //   //     autour_name: 'Accountant',
  //   //     book_category: 'Historical Fiction',
  //   //   },
  //   //   {
  //   //     book_name: 'Ashton Cox',
  //   //     autour_name: 'Junior Technical Author',
  //   //     book_category: 'Science Fiction (Sci-Fi)',
  //   //   },
  //   //   {
  //   //     book_name: 'Tiger Nixon',
  //   //     autour_name: 'System Architect',
  //   //     book_category: 'History',
  //   //   },
  //   // ].map((row) => {
  //   //   return {
  //   //     ...row,
  //   //     delete: (
  //   //       <IonButton onClick={editBook}>Edit</IonButton>
  //   //     ),
  //   //     edit: (
  //   //       <IonButton onClick={deleteBook}>Delete</IonButton>
  //   //     ),
  //   //   };
  //   // }),
  // };
  console.log("Data", data);

  return (
    <div className="container">
      <button
        onClick={(e: any) =>
          present({
            onDidDismiss: (e: CustomEvent) => setRoleMsg('event'),
          })
        }
      >
        Add Book
      </button>
      {isShow && <div>
        <MDBDataTable striped bordered small data={data} barReverse />
      </div>}
    </div>
  );
};

export default AdminPage;
