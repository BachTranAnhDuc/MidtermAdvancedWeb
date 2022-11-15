import React, { useEffect, useState } from "react";

// import { Box, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";

import {
  ConsoleSqlOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Form,
  Radio,
  Space,
  Switch,
  Table,
  Button,
  Dropdown,
  Avatar,
  Modal,
  Descriptions,
} from "antd";
import HomeStyled from "../theme/pages/Home";

import { Breadcrumb, Layout, Menu } from "antd";

import { FaUserCircle, FaEdit, FaUser, FaTrash } from "react-icons/fa";

import student from "../model/student";

const { Header, Content, Footer } = Layout;

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => "List all students";
const defaultFooter = () => "Here is footer";

const Home = () => {
  const navigate = useNavigate();
  const { getAllStudent, user, getSingleStudent, singleUser } =
    useGlobalContext();

  const [userTemp, setUserTemp] = useState("");

  const handleLogout = () => {
    navigate("/login");
  };

  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure ?",
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  const columns = [
    {
      title: "ID Card",
      dataIndex: "id",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Information Technology",
          value: "it",
        },
        {
          text: "QTKD",
          value: "qtkd",
        },
      ],

      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Major",
      dataIndex: "major",
      filters: [
        {
          text: "Information Technology",
          value: "it",
        },
        {
          text: "QTKD",
          value: "qtkd",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Khoa",
      dataIndex: "age",
      filters: [
        {
          text: "Information Technology",
          value: "it",
        },
        {
          text: "QTKD",
          value: "qtkd",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: ({ key }) => (
        <Space size="middle">
          <Button
            icon={<FaUser></FaUser>}
            onClick={() => {
              showModalDetail();
              getSingleStudent(key);
              console.log(key);
              // setUserTemp();
            }}
          ></Button>
          <Button
            icon={<FaEdit></FaEdit>}
            onClick={() => {
              showModalEdit();
            }}
          ></Button>
          <Button icon={<FaTrash></FaTrash>} onClick={confirm}></Button>
        </Space>
      ),
    },
  ];

  const [bordered, setBordered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("large");
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);
  const handleBorderChange = (enable) => {
    setBordered(enable);
  };
  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleTableLayoutChange = (e) => {
    setTableLayout(e.target.value);
  };
  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };
  const handleTitleChange = (enable) => {
    setShowTitle(enable);
  };
  const handleHeaderChange = (enable) => {
    setShowHeader(enable);
  };
  const handleFooterChange = (enable) => {
    setShowFooter(enable);
  };
  const handleRowSelectionChange = (enable) => {
    setRowSelection(enable ? {} : undefined);
  };
  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };
  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };
  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };
  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };

  const items = [
    {
      key: "1",
      label: (
        // <a
        //   target="_blank"
        //   rel="noopener noreferrer"
        //   href="https://www.antgroup.com"
        // >
        //   1st menu item
        // </a>
        <Button>AAAAA</Button>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: <Link to={"/login"}>Logout</Link>,
    },
  ];

  // show modal detail
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const showModalDetail = () => {
    setIsModalDetailOpen(true);
  };
  const handleDetailOk = () => {
    setIsModalDetailOpen(false);
  };
  const handleDetailCancel = () => {
    setIsModalDetailOpen(false);
  };
  // show modal edot
  const [isModaEditOpen, setIsModalEditOpen] = useState(false);
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const handleEditOk = () => {
    setIsModalEditOpen(false);
  };
  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  // show modal delete
  const [openDelete, setOpenDelete] = useState(false);

  const showModalDelete = () => {
    setOpenDelete(true);
  };

  const hideModalDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  return (
    <HomeStyled>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",

            display: "grid",
            gridTemplateColumns: "min-content 1fr max-content",
            alignItems: "center",
            // backgroundColor: "var(--color-secondary)",
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            // style={{ backgroundColor: "var(--color-secondary)" }}
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={[
              { key: 1, label: "Home" },
              { key: 2, label: "About me" },
            ]}
          />

          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
          >
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<FaUserCircle />}
            />
          </Dropdown>
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 48,
              minHeight: 380,
            }}
          >
            <>
              <Table
                {...tableProps}
                pagination={{
                  position: [top, bottom],
                }}
                columns={tableColumns}
                dataSource={hasData ? user : []}
                scroll={scroll}
              />
            </>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Midterm demo
        </Footer>

        <Modal
          title="Detail"
          open={isModalDetailOpen}
          onOk={handleDetailOk}
          onCancel={handleDetailCancel}
          centered
          width={600}
          // height={600}
        >
          <Descriptions title="User Info" layout="vertical">
            <Descriptions.Item label="Id">
              {singleUser ? singleUser.id : "loading"}
            </Descriptions.Item>
            <Descriptions.Item label="UserName">
              {singleUser ? singleUser.name : "loading"}
            </Descriptions.Item>
            <Descriptions.Item label="Major">
              {singleUser ? singleUser.major : "loading"}
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {singleUser ? singleUser.age : "loading"}
            </Descriptions.Item>
            <Descriptions.Item label="Telephone">
              {singleUser ? singleUser.phone : "loading"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {singleUser ? singleUser.email : "loading"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {singleUser ? singleUser.address : "loading"}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
        <Modal
          title="Edit"
          open={isModaEditOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          centered
          width={600}
          // height={600}
        >
          <Descriptions title="User Info" layout="vertical">
            <Descriptions.Item label="Id">51900313</Descriptions.Item>
            <Descriptions.Item label="UserName">
              Bach Tran Anh Duc
            </Descriptions.Item>
            <Descriptions.Item label="Major">
              Information Technology
            </Descriptions.Item>
            <Descriptions.Item label="Khoa">23</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Email">
              anhduc@gmail.com
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </Modal>
        <Modal
          title="Delete"
          open={openDelete}
          onOk={hideModalDelete}
          onCancel={hideModalDelete}
          okText="Delete"
          cancelText="Cancel"
          centered
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </Layout>
    </HomeStyled>
  );
};

export default Home;
