import { IonButton } from "@ionic/react";
import { MDBDataTable } from "mdbreact";
import { useEffect, useState } from "react";
import { adminPendingList } from "../../constants/tableColums";
import bookService from "../../services/book.service";

function AdminPendingList() {
  const [data, setBorrowList] = useState<any>({});
  const [isShow, setLoadData] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const books = await getBook();
    const data = {
      columns: [...adminPendingList],
      rows: [...books],
    };
    setBorrowList(data);
    setLoadData(true);
  };

  const getBook = async () => {
    const books = await bookService.getBorrowList();
    return books.map((data: any) => {
      return {
        ...data,
        approveBook: (
          <IonButton color="success" onClick={() => approveBook(data)}>
            Approve
          </IonButton>
        ),
      };
    });
  };

  const approveBook = async (data: any) => {
    console.log("Data", data);
    if (data.status === "pending") {
      data.status = "Taken";
      bookService
        .borrowBookEdit(data)
        .then(async(res) => {
          await loadData();
          console.log("Approve data", res);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  return (
    <div className="borrow-body">
      <h1 className="ion-text-center ion-margin">Borrow Book List</h1>
      {isShow && (
        <div>
          <MDBDataTable striped bordered small data={data} barReverse />
        </div>
      )}
    </div>
  );
}

export default AdminPendingList;
