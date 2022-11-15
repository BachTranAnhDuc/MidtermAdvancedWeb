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

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";

import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  MUIButtonCustom02,
  MUIButtonCustom01,
  MUIButtonCustom03,
  MUIButtonCustom04,
  MUIButtonLoading01,
} from "../theme/components/Button";

import { MUIInputCustom01, MUIInputCustom02 } from "../theme/components/Input";

import {
  Box,
  InputLabel,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
  Checkbox,
} from "@mui/material";

import { HeadingPrimary, DefaultParagraph } from "../theme/Typography";
import { red } from "@mui/material/colors";

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

  // show modal add
  const [isModaAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };
  const handleAddCancel = () => {
    setIsModalAddOpen(false);
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
              display: "grid",
              gap: "1.6rem 3.2rem",
            }}
          >
            <>
              <Button
                type="primary"
                style={{ justifySelf: "start" }}
                onClick={() => {
                  showModalAdd();
                }}
              >
                Add Student
              </Button>
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
          <Formik
            initialValues={{
              id: "",
              name: "",
              major: "",
              age: "",
              address: "",
              phone: "",
              email: "",
            }}
            // validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              console.log("Form submit");
              // const data = {
              //   username: username,
              //   password: password,
              // };
              // window.electron.login(data);
            }}
          >
            {(props) => (
              <Form
                onSubmit={props.handleSubmit}
                style={{ display: "grid", gap: "2rem 0" }}
              >
                <Field name="id">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="id"
                        name="id"
                        label="ID Card"
                        value={props.values.id}
                        onChange={props.handleChange}
                        error={props.touched.id && Boolean(props.errors.id)}
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.id && props.errors.id}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="name">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="name"
                        name="name"
                        label="Name"
                        value={props.values.name}
                        onChange={props.handleChange}
                        error={props.touched.name && Boolean(props.errors.name)}
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.name && props.errors.name}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="major">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="major"
                        name="major"
                        label="Major"
                        value={props.values.major}
                        onChange={props.handleChange}
                        error={
                          props.touched.major && Boolean(props.errors.major)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.major && props.errors.major}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="age">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="age"
                        name="age"
                        label="Age"
                        value={props.values.age}
                        onChange={props.handleChange}
                        error={props.touched.age && Boolean(props.errors.age)}
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.age && props.errors.age}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="address">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="address"
                        name="address"
                        label="Address"
                        value={props.values.address}
                        onChange={props.handleChange}
                        error={
                          props.touched.address && Boolean(props.errors.address)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.address && props.errors.address}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="phone">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={props.values.phone}
                        onChange={props.handleChange}
                        error={
                          props.touched.phone && Boolean(props.errors.phone)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.phone && props.errors.phone}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="email"
                        name="email"
                        label="Email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        error={
                          props.touched.email && Boolean(props.errors.email)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.email && props.errors.email}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <MUIButtonCustom02
                  variant="contained"
                  type="submit"
                  // disabled={isCountDown}
                  onClick={() => {}}
                >
                  Submit
                </MUIButtonCustom02>
              </Form>
            )}
          </Formik>
        </Modal>

        <Modal
          title="Add Student"
          open={isModaAddOpen}
          onOk={handleAddOk}
          onCancel={handleAddCancel}
          centered
          width={600}
          // height={600}
        >
          <Formik
            initialValues={{
              id: "",
              name: "",
              major: "",
              age: "",
              address: "",
              phone: "",
              email: "",
            }}
            // validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              console.log("Form submit");
              // const data = {
              //   username: username,
              //   password: password,
              // };
              // window.electron.login(data);
            }}
          >
            {(props) => (
              <Form
                onSubmit={props.handleSubmit}
                style={{ display: "grid", gap: "2rem 0" }}
              >
                <Field name="id">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="id"
                        name="id"
                        label="ID Card"
                        value={props.values.id}
                        onChange={props.handleChange}
                        error={props.touched.id && Boolean(props.errors.id)}
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.id && props.errors.id}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="name">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="name"
                        name="name"
                        label="Name"
                        value={props.values.name}
                        onChange={props.handleChange}
                        error={props.touched.name && Boolean(props.errors.name)}
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.name && props.errors.name}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="major">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="major"
                        name="major"
                        label="Major"
                        value={props.values.major}
                        onChange={props.handleChange}
                        error={
                          props.touched.major && Boolean(props.errors.major)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.major && props.errors.major}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="age">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="age"
                        name="age"
                        label="Age"
                        value={props.values.age}
                        onChange={props.handleChange}
                        error={props.touched.age && Boolean(props.errors.age)}
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.age && props.errors.age}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="address">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="address"
                        name="address"
                        label="Address"
                        value={props.values.address}
                        onChange={props.handleChange}
                        error={
                          props.touched.address && Boolean(props.errors.address)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.address && props.errors.address}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="phone">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={props.values.phone}
                        onChange={props.handleChange}
                        error={
                          props.touched.phone && Boolean(props.errors.phone)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.phone && props.errors.phone}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field, form, meta }) => (
                    <FormControl>
                      <MUIInputCustom02
                        {...field}
                        id="email"
                        name="email"
                        label="Email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        error={
                          props.touched.email && Boolean(props.errors.email)
                        }
                        aria-describedby="component-helper-text"
                        // disabled={isCountDown}
                        // helperText={
                        //   props.touched.id && props.errors.id
                        // }
                      />
                      <FormHelperText
                        id="component-helper-text"
                        sx={{
                          fontSize: "1.2rem",
                          color: `${red[500]}`,
                        }}
                      >
                        {props.touched.email && props.errors.email}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <MUIButtonCustom02
                  variant="contained"
                  type="submit"
                  // disabled={isCountDown}
                  onClick={() => {}}
                >
                  Submit
                </MUIButtonCustom02>
              </Form>
            )}
          </Formik>
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
