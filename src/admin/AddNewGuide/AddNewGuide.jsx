import { useEffect, useState } from "react";
import { UseSearchUser, UseUpdateRoleUser } from "./UseAddNewGuide";
import TableBookingAdmin from "../BookingAdmin/components/BookingAdmin/TableBookingAdmin";
import { formatDateId } from "../../utils/convertDate";
import TablesAdmin from "../GlobalComponents/TablesAdmin";
import { FiUsers } from "react-icons/fi";
import PopupUpdateRole from "./components/PopupUpdateRole";

export default function AddNewGuide() {
  const { mutate: InsertSearch, data: ResultSearch } = UseSearchUser();
  const { mutate: UpdateRole } = UseUpdateRoleUser();
  const [valueSearch, setValueSearch] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [valueUser, setValueUser] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      InsertSearch({ valueSearch });
    }, 500);

    return () => clearTimeout(timeOut);
  }, [valueSearch]);

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

      <TablesAdmin
        headline={"Handle User"}
        searchQuery={valueSearch}
        setIsActive={setIsActive}
        setSearchQuery={setValueSearch}
        Icon={FiUsers}
      />

      <TableBookingAdmin
        valueTable={filterVal}
        handleEdit={handleEdit}
        tableHead={tableHead}
        noDisplayDelete={true}
      />
    </div>
  );
}
