import { useCallback, useEffect, useState } from "react";
import { Table, Pagination, Input } from "antd";
import { Link } from "react-router-dom";

type ResponseData = {
  limit: number;
  skip: number;
  total: number;
  users: User[];
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [search, setSearch]=useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
    );

    const data: ResponseData = await res.json();

    setUsers(data.users);
    setTotalUsers(data.total);
    // setLimit(data.limit);
    // setSkip(data.skip);
    // setCurrentPage(data.skip / data.limit + 1);
    setIsLoading(false);
  }, [limit, skip,search]);

  useEffect(() => {
    fetchUsers();
  }, [limit, skip,search]);

  const handleOnPageChange = (page: number) => {
    setSkip(limit * (page - 1));
    setCurrentPage(page);
  };
const handleSearch =(query:string)=>{
  setSearch(query)
}
  
  return (
    <div>
      <Input onChange={(event)=>
        handleSearch(event.target.value)
      }/>
      <Table
        pagination={{
          position: ["none", "none"],
        }}
        loading={isLoading}
        dataSource={users}
        columns={[
          { title: "Title Id", dataIndex: "firstName",sorter: (a: User, b: User) => a.firstName.localeCompare(b.firstName) },
          { title: "Mbiemri", dataIndex: "lastName",sorter: (a: User, b: User) => a.lastName.localeCompare(b.lastName) },
          {
            title: "Posts",
            render: (user: User) => {
              return (
                <div>
                  <Link to={`/${user.id}`}>Go</Link>
                </div>
              );
            },
          },
        ]}
      />
      <Pagination
        current={currentPage}
        total={totalUsers}
        onChange={handleOnPageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default UserList;
