import { useEffect, useState } from "react";

import TableBookingAdmin from "../BookingAdmin/components/BookingAdmin/TableBookingAdmin";
import { formatDateId } from "../../utils/convertDate";
import TablesAdmin from "../GlobalComponents/TablesAdmin";
import { FiUsers } from "react-icons/fi";
import PopupUpdateRole from "./components/PopupUpdateRole";
import { useSearchParams } from "react-router-dom";
import { UseSearchUser, UseUpdateRoleUser } from "./UseAddNewGuide";
import { GetParamsAddNewGuide } from "@/features/tours/components/Params";
import PaginationSimpel from "@/components/PaginationSimpel";
import NewLoading from "@/components/loading/NewLoading";

export default function AddNewGuide() {
  const [pagination, setPagination] = useState(1);
  const [paramsFilter] = useSearchParams();

  const params = GetParamsAddNewGuide({ params: paramsFilter });

  const { data: ResultSearch = [], isPending } = UseSearchUser({
    page: pagination,
    filter: params,
  });
  const { mutate: UpdateRole } = UseUpdateRoleUser();
  const [valueUser, setValueUser] = useState(null);

  if (isPending) return <NewLoading />;

  const tableHead = [
    "name",
    "email",
    "telphone",
    "role",
    "Booking Aktif",
    "createAt",
  ];
  const filterVal = ResultSearch?.map((el) => ({
    id: el._id,
    data: [
      el.name,
      el.email,
      el.telphone,
      el.role,
      el.isActiveTrip,
      formatDateId(el.createAt),
    ],
  }));

  function handleEdit(idUser) {
    const getUser = ResultSearch?.find((el) => el._id === idUser);
    setValueUser(getUser);
  }

  function handleCancel() {
    setValueUser(null);
  }

  function handleSave(value) {
    UpdateRole({ value });
    handleCancel();
  }

  return (
    <div className="p-10 pt-5">
      {valueUser && (
        <PopupUpdateRole
          valueUser={valueUser}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}

      <TablesAdmin headline={"Handle User"} Icon={FiUsers} params={params} />

      <TableBookingAdmin
        valueTable={filterVal}
        handleEdit={handleEdit}
        tableHead={tableHead}
        noDisplayDelete={true}
      />

      {ResultSearch.length > 0 && (
        <PaginationSimpel
          pagination={pagination}
          setPagination={setPagination}
          lengthData={ResultSearch?.length}
          route={"admin/addNewGuide"}
        />
      )}
    </div>
  );
}
