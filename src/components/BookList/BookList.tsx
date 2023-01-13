import { IonButton, IonContent, useIonPopover } from "@ionic/react";
import { MDBDataTable } from "mdbreact";
import { useEffect, useState } from "react";
import bookService from '../../services/book.service';
import { dashboardColums } from '../../constants/tableColums';
import BorrowBook from "../BorrowBook/BorrowBook";
import '../BookList/BookList.scss'

function BookList() {
  const [isShow, setLoadData] = useState(false);
  const [data, setData] = useState<any>({});
  const Popover = () => <IonContent className="ion-padding"> <h1><BorrowBook data={ borrow } dismiss={dismiss}/></h1></IonContent>;
  const [present, dismiss] = useIonPopover(Popover, {});
  const [borrow, setBorrowBook] = useState<any>({});

  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
      const books = await getBook();
      const data = {
        columns: [...dashboardColums],
        rows: [...books]
      }
      setData(data)
      setLoadData(true);
  }

  const getBook = async () => {
    const books = await bookService.getBooks();
    return books.map((data:any) => {
      return {
        ...data,
        borrowBook: (
          <IonButton onClick={()=>borrowBook(data)} disabled={data.status ==='Pending' || data.status ==='Unavailable'}>Borrow</IonButton>
        )
      };
    })
  }

  const borrowBook = (data:any) => {
    setBorrowBook(data);
    present();
  }

  return (
    <div className="bookBody"> 
      <h1 className="ion-text-center ion-margin">Book List</h1>
      {isShow && (
        <div>
          <MDBDataTable striped bordered small data={data} barReverse />
        </div>
      )}
    </div>
  );
}

export default BookList;
