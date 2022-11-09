import React, { useState } from "react";

// import { Box, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
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

const { Header, Content, Footer } = Layout;

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => "List all students";
const defaultFooter = () => "Here is footer";

const Home = () => {
  const navigate = useNavigate();

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
      dataIndex: "idCard",
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
      dataIndex: "khoa",
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
      render: () => (
        <Space size="middle">
          <Button icon={<FaUser></FaUser>} onClick={showModalDetail}></Button>
          <Button icon={<FaEdit></FaEdit>}></Button>
          <Button icon={<FaTrash></FaTrash>} onClick={confirm}></Button>
        </Space>
      ),
    },
  ];
  const data = [];
  for (let i = 1; i <= 40; i++) {
    data.push({
      key: i,
      idCard: `ID ${i}`,
      name: "John Brown",
      major: "Information Technology",
      khoa: "23",
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }

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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
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

  // show modal delete
  const [openDelete, setOpenDelete] = useState(false);

  const showModalDelete = () => {
    setOpenDelete(true);
  };

  const hideModalDelete = () => {
    setOpenDelete(false);
  };

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
                dataSource={hasData ? data : []}
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
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
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
