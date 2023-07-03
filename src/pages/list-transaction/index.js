import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useQuery } from "react-query";
import admin from "../../assets/action-admin.png";
import { API } from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import {
  findTransaction,
  getTransaction,
} from "../../redux/actions/transaction";
import { BallTriangle } from "react-loader-spinner";
import * as COMP from "../../components";

export default function AdminList(props) {
  document.title = "Table Transaction";

  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState();
  const [transac, setTransac] = useState();

  const [search, setSearch] = useState("");

  const { data: trans, refetch } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    setTransac(response.data.data);
    return response.data.data;
  });

  const {
    findTransactionResult: transaction,
    findTransactionLoading,
    findTransactionError,
  } = useSelector((state) => state.trans);

  const [searchedTransaction, setSearchedTransaction] = useState([]);
  useEffect(() => {
    if (search !== "") {
      const filteredTransaction = transaction.filter((e) => {
        if (
          e.trip.title.toLowerCase().includes(search.toLowerCase()) ||
          e.trip.country.name.toLowerCase().includes(search.toLowerCase()) ||
          e.status.toLowerCase().includes(search.toLowerCase()) ||
          e.user.fullName.toLowerCase().includes(search.toLowerCase())
        ) {
          return e;
        }
      });
      setSearchedTransaction(filteredTransaction);
    } else {
      setSearchedTransaction([]);
    }
  }, [search, transaction]);

  //  handle pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts =
    transaction && transaction.slice(firstPostIndex, lastPostIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findTransaction());
  }, [dispatch]);

  useEffect(() => {
    trans?.filter((item) => {
      if (item.id == id) {
        setData(item);
      }
    });
  }, [id]);

  function lookTrans(id) {
    dispatch(getTransaction(id));
  }

  return findTransactionLoading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "30rem" }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#ffaf00"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  ) : transaction ? (
    <>
      <div className="container-list-admin">
        <p className="text-avenir fw-900 fs-36">Incoming Transaction</p>
        <Form.Control
          type="text"
          placeholder="Search Transaction"
          name="search"
          className="mt-4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="wrapper-list-admin">
          <table className="table-transactions" cellSpacing={0}>
            <thead>
              <tr>
                <th>No.</th>
                <th>ID Transaction</th>
                <th>Users</th>
                <th>Trip</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchedTransaction.length > 0
                ? searchedTransaction.map((e, index) => (
                    <tr key={e.id}>
                      <td>{index + 1}</td>
                      <td>{e.id}</td>
                      <td>{e.user.fullName}</td>
                      <td>{e.trip.title}</td>
                      {e.status == "success" ? (
                        <td>
                          <span
                            style={{
                              backgroundColor: "lightgreen",
                              color: "green",
                            }}
                            className="px-3 py-2 ms-1 rounded fw-semibold"
                          >
                            {e.status}
                          </span>
                        </td>
                      ) : e.status == "pending" ? (
                        <td>
                          <span
                            style={{
                              backgroundColor: "lightyellow",
                              color: "yellow",
                            }}
                            className="px-3 py-2 ms-1 rounded fw-semibold"
                          >
                            {e.status}
                          </span>
                        </td>
                      ) : e.status == "failed" ? (
                        <td>
                          <span
                            style={{
                              backgroundColor: "pink",
                              color: "red",
                            }}
                            className="px-3 py-2 ms-1 rounded fw-semibold"
                          >
                            {e.status}
                          </span>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      {/* {e.status} */}
                      <td>
                        <button
                          className="btn-popup-transactions"
                          onClick={() => {
                            setId(e.id);
                            setShow(true);
                          }}
                        >
                          <img
                            src={admin}
                            alt="..."
                            style={{
                              width: "40rem",
                              width: "2rem",
                              height: "2rem",
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                : currentPosts.length > 0
                ? currentPosts.map((e, i) => {
                    const serialNumber =
                      (currentPage - 1) * postPerPage + i + 1;
                    return (
                      <tr key={i}>
                        <td>{serialNumber}</td>
                        <td>{e.id}</td>
                        <td>{e.user.fullName}</td>
                        <td>{e.trip.title}</td>
                        {e.status == "success" ? (
                          <td>
                            <span
                              style={{
                                backgroundColor: "lightgreen",
                                color: "green",
                              }}
                              className="px-3 py-2 ms-1 rounded fw-semibold"
                            >
                              {e.status}
                            </span>
                          </td>
                        ) : e.status == "pending" ? (
                          <td>
                            <span
                              style={{
                                backgroundColor: "lightyellow",
                                color: "yellow",
                              }}
                              className="px-3 py-2 ms-1 rounded fw-semibold"
                            >
                              {e.status}
                            </span>
                          </td>
                        ) : e.status == "failed" ? (
                          <td>
                            <span
                              style={{
                                backgroundColor: "pink",
                                color: "red",
                              }}
                              className="px-3 py-2 ms-1 rounded fw-semibold"
                            >
                              {e.status}
                            </span>
                          </td>
                        ) : (
                          <td></td>
                        )}
                        {/* {e.status} */}
                        <td>
                          <button
                            className="btn-popup-transactions"
                            onClick={() => {
                              setId(e.id);
                              setShow(true);
                              lookTrans(e.id);
                            }}
                          >
                            <img
                              src={admin}
                              alt="..."
                              style={{
                                width: "40rem",
                                width: "2rem",
                                height: "2rem",
                              }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : searchedTransaction.length === 0 && (
                    <tr>
                      <td colSpan={6}>Data tidak ditemukan</td>
                    </tr>
                  )}
              {/* NOTE ini belum bisa jalan */}
            </tbody>
          </table>

          <COMP.Pagination
            totalposts={transaction.length}
            postsperpage={postPerPage}
            setcurrentpage={setCurrentPage}
            currentpage={currentPage}
          />
          <COMP.DetailTrans show={show} onHide={() => setShow(false)} id={id} />
        </div>
      </div>
    </>
  ) : findTransactionError ? (
    <p className="fs-3 fw-semibold">{findTransactionError}</p>
  ) : (
    <p className="fs-3 fw-semibold">Data tidak ada</p>
  );
  //   <>
  //   {trans && show ? (
  //     <div className="container-modal-approve" onClick={() => setShow(false)}>
  //       <div className="history-trip ps-relative">
  //         <div className="wrapper-booking wrapper-booking-history">
  //           <div className="header-booking">
  //             <img src={logo} />
  //             <div className="wrapper-date-booking">
  //               <p className="p-booking fw-800 text-avenir">Booking</p>
  //               <p className="date-booking text-avenir text-grey"></p>
  //             </div>
  //           </div>
  //           <div className="info-trip-booking">
  //             <div className="title-and-status-trip w-100">
  //               <div className="wrapper-title-trip">
  //                 <p className="fw-900 text-avenir fs-24 m-0">
  //                   {data?.trip.title}
  //                 </p>
  //                 <p className="m-0 text-avenir fs-14 text-grey">
  //                   {data?.trip.country.name}
  //                 </p>
  //               </div>
  //               {data?.status == "success" ? (
  //                 <p
  //                   className="approve-payment text-avenir"
  //                   style={{ fontSize: "1.3rem" }}
  //                 >
  //                   success
  //                 </p>
  //               ) : data?.status == "pending" ? (
  //                 <p
  //                   className="wait-payment text-avenir"
  //                   style={{ fontSize: "1rem" }}
  //                 >
  //                   pending
  //                 </p>
  //               ) : (
  //                 <p
  //                   className="cancel-payment text-avenir"
  //                   style={{ fontSize: "1rem" }}
  //                 >
  //                   Cancel
  //                 </p>
  //               )}
  //             </div>
  //             <div className="wrapper-info-trip-booking w-100">
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Date Trip
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {data?.trip.date_trip}
  //                 </p>
  //               </div>
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Duration
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {data?.trip.day} Day - {data?.trip.night} Night
  //                 </p>
  //               </div>
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Accomodation
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {data?.trip.accomodation}
  //                 </p>
  //               </div>
  //               <div className="detail-info-trip-booking">
  //                 <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
  //                   Transportation
  //                 </p>
  //                 <p className="content-info-trip-booking fs-14 text-avenir text-grey">
  //                   {data?.trip.transportation}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="wrapper-table-info-user">
  //             <table className="table-info-user w-100" cellSpacing={0}>
  //               <tr className="w-100">
  //                 <th>No</th>
  //                 <th
  //                   className="text-avenir fw-800 fs-18"
  //                   style={{ width: "25.3rem" }}
  //                 >
  //                   Full Name
  //                 </th>
  //                 <th
  //                   className="text-avenir fw-800 fs-18"
  //                   style={{ width: "13.5rem" }}
  //                 >
  //                   Phone
  //                 </th>
  //                 <th></th>
  //                 <th></th>
  //               </tr>
  //               <tr
  //                 className="w-100"
  //                 style={{ borderBottom: "1px solid black" }}
  //               >
  //                 <td className="fw-400 fs-18 text-grey">1</td>
  //                 <td className="fw-400 fs-18 text-grey">
  //                   {data?.user.fullName}
  //                 </td>
  //                 <td className="fw-400 fs-18 text-grey">
  //                   {data?.user.phone}
  //                 </td>
  //                 <td className="text-avenir fs-18 fw-800">
  //                   Qty : {data?.counterQty}
  //                 </td>
  //                 <td></td>
  //               </tr>
  //             </table>
  //             <div className="text-end total-booking d-flex justify-content-end">
  //               <p
  //                 className="text-avenir fs-18 fw-800 total-booking-p text-start"
  //                 style={{ width: "16.4rem" }}
  //               >
  //                 Total :{" "}
  //                 {new Intl.NumberFormat("id-ID", {
  //                   style: "currency",
  //                   currency: "IDR",
  //                 }).format(data?.total)}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   ) : (
  //     <div></div>
  //   )}
  // </>
}
