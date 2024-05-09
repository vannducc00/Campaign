import { Button } from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import { Box, Tabs, Tab, Grid } from "@mui/material";
import InfoCampaign from "./features/InfoCampaign/InfoCampaign";
import ChildCampaign from "./features/ChildCampaign/ChildCampaign";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isCheck, setIsCheck] = useState(false);
  const [newValues, setNewValues] = useState({
    information: {
      name: "",
      describe: "",
    },
    subCampaigns: [
      {
        name: "",
        status: true,
        ads: [
          {
            name: "",
            quantity: 0,
          },
        ],
      },
    ],
  });
  const handleChange = (event, val) => {
    setCurrentTab(val);
  };

  const onSubmitAllForms = () => {
    let isVerifySubCampaign = false;

    newValues.subCampaigns.map((item) => {
      item.ads.map((itemAds) => {
        isVerifySubCampaign =
          item.name !== "" &&
          itemAds.name !== "" &&
          itemAds.quantity !== "" &&
          +itemAds.quantity > 0;
      });
    });

    if (!newValues.information.name) {
      alert("Vui lòng nhập dữ liệu");
    } else if (!isVerifySubCampaign) {
      alert("Vui lòng nhập thông tin");
    } else {
      alert("Thêm thành công chiến dịch" + JSON.stringify(newValues));
    }

    setIsCheck(true);
  };

  return (
    <div>
      <div className="button-block">
        <Button variant="contained" onClick={onSubmitAllForms}>
          Submit
        </Button>
      </div>
      <div style={{ padding: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={currentTab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Thông tin" {...a11yProps(0)} />
                    <Tab label="Chiến dịch con" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <div
                  style={
                    currentTab === 1
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  <InfoCampaign
                    dataCampaign={(values) => {
                      setNewValues({
                        ...newValues,
                        information: {
                          name: values.name,
                          describe: values.describe,
                        },
                      });
                    }}
                    isCheck={isCheck}
                  />
                </div>
                <div
                  style={
                    currentTab === 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  <ChildCampaign
                    dataSubCampaign={(values) => {
                      let data = values.map((item, index) => ({
                        name: item.name,
                        status: item.status,
                        ads: item.ads,
                      }));
                      setNewValues({ ...newValues, subCampaigns: data });
                    }}
                    isCheck={isCheck}
                  />
                </div>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
