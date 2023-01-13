import { MDBDataTable } from "mdbreact";
import { useEffect, useState } from "react";
import { borrowBookList } from "../../constants/tableColums";
import bookService from "../../services/book.service";
import '../BorrowList/BorrowBook.scss'

function BorrowBookList() {
  const [data, setBorrowList] = useState<any>({});
  const [isShow, setLoadData] = useState(false);

  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    const response = await bookService.getBorrowList();
    const data = {
      columns: [...borrowBookList],
      rows: [...response],
    };
    console.log("Response", data);
    setBorrowList(data);
    setLoadData(true);
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

export default BorrowBookList;
