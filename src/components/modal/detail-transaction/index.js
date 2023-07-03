import * as React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as IMG from "../../../assets";
import Loader from "../../loader";

const DetailTrans = (props) => {
  const {
    getTransactionResult: data,
    getTransactionLoading,
    getTransactionError,
  } = useSelector((state) => state.trans);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* Carousel bootstrap */}
      {getTransactionLoading ? (
        <Loader />
      ) : data ? (
        <>
          <div className="container-modal-approve">
            <div className="history-trip ps-relative">
              <div className="wrapper-booking wrapper-booking-history">
                <div className="header-booking">
                  <img src={IMG.logo} />
                  <div className="wrapper-date-booking">
                    <p className="p-booking fw-800 text-avenir">Booking</p>
                    <p className="date-booking text-avenir text-grey"></p>
                  </div>
                </div>
                <div className="info-trip-booking">
                  <div className="title-and-status-trip w-100">
                    <div className="wrapper-title-trip">
                      <p className="fw-900 text-avenir fs-24 m-0">
                        {data?.trip.title}
                      </p>
                      <p className="m-0 text-avenir fs-14 text-grey">
                        {data?.trip.country.name}
                      </p>
                    </div>
                    {data?.status == "success" ? (
                      <p
                        className="approve-payment text-avenir"
                        style={{ fontSize: "1.3rem" }}
                      >
                        success
                      </p>
                    ) : data?.status == "pending" ? (
                      <p
                        className="wait-payment text-avenir"
                        style={{ fontSize: "1rem" }}
                      >
                        pending
                      </p>
                    ) : (
                      <p
                        className="cancel-payment text-avenir"
                        style={{ fontSize: "1rem" }}
                      >
                        Cancel
                      </p>
                    )}
                  </div>
                  <div className="wrapper-info-trip-booking w-100">
                    <div className="detail-info-trip-booking">
                      <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                        Date Trip
                      </p>
                      <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                        {data?.trip.date_trip}
                      </p>
                    </div>
                    <div className="detail-info-trip-booking">
                      <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                        Duration
                      </p>
                      <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                        {data?.trip.day} Day - {data?.trip.night} Night
                      </p>
                    </div>
                    <div className="detail-info-trip-booking">
                      <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                        Accomodation
                      </p>
                      <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                        {data?.trip.accomodation}
                      </p>
                    </div>
                    <div className="detail-info-trip-booking">
                      <p className="title-info-trip-booking fw-800 fs-18 text-avenir">
                        Transportation
                      </p>
                      <p className="content-info-trip-booking fs-14 text-avenir text-grey">
                        {data?.trip.transportation}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="wrapper-table-info-user">
                  <table className="table-info-user w-100" cellSpacing={0}>
                    <tr className="w-100">
                      <th>No</th>
                      <th
                        className="text-avenir fw-800 fs-18"
                        style={{ width: "25.3rem" }}
                      >
                        Full Name
                      </th>
                      <th
                        className="text-avenir fw-800 fs-18"
                        style={{ width: "13.5rem" }}
                      >
                        Phone
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr
                      className="w-100"
                      style={{ borderBottom: "1px solid black" }}
                    >
                      <td className="fw-400 fs-18 text-grey">1</td>
                      <td className="fw-400 fs-18 text-grey">
                        {data?.user.fullName}
                      </td>
                      <td className="fw-400 fs-18 text-grey">
                        {data?.user.phone}
                      </td>
                      <td className="text-avenir fs-18 fw-800">
                        Qty : {data?.counterQty}
                      </td>
                      <td></td>
                    </tr>
                  </table>
                  <div className="text-end total-booking d-flex justify-content-end">
                    <p
                      className="text-avenir fs-18 fw-800 total-booking-p text-start"
                      style={{ width: "16.4rem" }}
                    >
                      Total :{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(data?.total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : getTransactionError ? (
        <p className="fs-3 fw-semibold">{getTransactionError}</p>
      ) : (
        <p className="fs-3 fw-semibold">Data tidak ada</p>
      )}
    </Modal>
  );
};

export default DetailTrans;
