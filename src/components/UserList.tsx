import { useCallback, useEffect, useState } from "react";
import { Table, Pagination, Input, Button } from "antd";
import { Link } from "react-router-dom";
import './style.css'
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
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [error, setError] = useState();
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/users/search?q=${search}&limit=10&skip=${skip}`
      );

      const data: ResponseData = await res.json();

      setUsers(data.users);
      setTotalUsers(data.total);
    } catch (error) {
      console.log(error, "error");
    }
    setIsLoading(false);
  }, [skip, search]);

  useEffect(() => {
    fetchUsers();
  }, [ skip, search]);

  const handleOnPageChange = (page: number) => {
    setSkip(10 * (page - 1));
    setCurrentPage(page);
  };
  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <div className="tableOfUsers">
      
      <Input onChange={(event) => handleSearch(event.target.value)}  placeholder="Search User"  size="middle" className="searchInput"/>
      <Table
      style={{ width: '90%' }}
        pagination={{
          position: ["none", "none"],
        }}
        loading={isLoading}
        dataSource={users}
        columns={[
          {
            title: "Name",
            dataIndex: "firstName",
            sorter: (a: User, b: User) =>
              a.firstName.localeCompare(b.firstName),
          },
          {
            title: "Surname",
            dataIndex: "lastName",
            sorter: (a: User, b: User) => a.lastName.localeCompare(b.lastName),
          },
          {
            title: "Email",
            dataIndex: "email",
            sorter: (a: User, b: User) => a.email.localeCompare(b.email),
          },
          
          {
            title: "Posts",
            render: (user: User) => {
              return (
                <div>
                  <Button><Link to={`/${user.id}`}>Check Posts </Link></Button>
                
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
