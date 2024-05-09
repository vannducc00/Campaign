import {
  Card,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Table,
  Button,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./ChildCampaignStyle.css";
import IconButton from "@mui/material/IconButton";
import { createSvgIcon } from "@mui/material/utils";
import { Delete } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ChildCampaign({ isCheck, dataSubCampaign }) {
  let total = 0;
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [listChildCampaign, setListChildCampaign] = useState([
    {
      name: "Chiến dịch con 0",
      status: true,
      quantity: 0,
      ads: [
        {
          name: "Quảng cáo 1",
          quantity: 0,
        },
      ],
    },
  ]);
  const [indexActiveCard, setindexActiveCard] = useState(0);

  useEffect(() => {
    dataSubCampaign([
      {
        name: "Chiến dịch con 0",
        status: true,
        quantity: 0,
        ads: [
          {
            name: "Quảng cáo 1",
            quantity: 0,
          },
        ],
      },
    ]);
  }, []);

  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>,
    "Plus"
  );

  const CardItem = ({ name, quantity, isActive, click }) => {
    return (
      <Card
        onClick={() => click()}
        className={`${isActive && "item-camp-border"} item-camp`}
        elevation={1}
      >
        <Typography>
          <span
            style={
              isCheck && (name === "" || quantity === 0)
                ? { fontSize: "1.25rem", fontWeight: "500", color: "red" }
                : { fontSize: "1.25rem", fontWeight: "500", color: "black" }
            }
          >
            {name}
          </span>
          <CheckCircleIcon style={{ paddingLeft: "5px" }} fontSize="small" />
        </Typography>
        <Typography sx={{ fontSize: "1.25rem", fontWeight: "500" }}>
          {listChildCampaign[indexActiveCard].ads.length === 0 ? 0 : quantity}
        </Typography>
      </Card>
    );
  };

  const handleAddCampaign = () => {
    setListChildCampaign((prev) => {
      const updateSubCampaign = [
        ...prev,
        {
          name: "Chiến dịch con " + prev.length,
          status: true,
          quantity: 0,
          ads: [
            {
              name: "Quảng cáo 1",
              quantity: 0,
            },
          ],
        },
      ];
      setindexActiveCard(prev.length);
      dataSubCampaign(updateSubCampaign);
      return updateSubCampaign;
    });
  };

  const handleChangeName = (e) => {
    setListChildCampaign((prev) => {
      const updateListChild = [...prev];
      const nameChildUpdate = updateListChild[indexActiveCard];
      nameChildUpdate.name = e.target.value;
      dataSubCampaign(listChildCampaign);
      return updateListChild;
    });
  };

  const handleRemoveItem = (index) => {
    setListChildCampaign((prev) => {
      const updateListChild = [...prev];
      const nameChildUpdate = updateListChild[indexActiveCard];
      total = nameChildUpdate.quantity;
      total -= +nameChildUpdate.ads[index].quantity;
      nameChildUpdate.quantity = total;
      nameChildUpdate.ads.splice(index, 1);
      return updateListChild;
    });
  };

  const handleAddItem = () => {
    setListChildCampaign((prev) => {
      const updateListChild = [...prev];
      const nameChildUpdate = updateListChild[indexActiveCard];
      total = +nameChildUpdate.quantity;
      nameChildUpdate.ads.push({
        name: "Quảng cáo " + (nameChildUpdate.ads.length + 1),
        quantity: 0,
      });
      dataSubCampaign(updateListChild)
      return updateListChild;
    });
  };

  const handleChangeQuantity = (e, index) => {
    setListChildCampaign((prev) => {
      const updateListChild = [...prev];
      const quantityChildUpdate = updateListChild[indexActiveCard];
      quantityChildUpdate.ads[index].quantity = e.target.value;
      quantityChildUpdate.ads.map((item) => {
        total += +item.quantity;
      });
      quantityChildUpdate.quantity = total;
      total = +quantityChildUpdate.quantity;

      dataSubCampaign(listChildCampaign);
      return updateListChild;
    });
  };

  const handleChangeNameComercical = (e, index) => {
    setListChildCampaign((prev) => {
      const updateListChild = [...prev];
      const quantityChildUpdate = updateListChild[indexActiveCard];
      quantityChildUpdate.ads[index].name = e.target.value;

      dataSubCampaign(listChildCampaign);
      return updateListChild;
    });
  };

  const handleCheckboxChange = (index) => {
    // Kiểm tra xem hàng đã được chọn hay chưa
    const selectedIndex = selectedRows.indexOf(index);
    let newSelectedRows = [...selectedRows];

    if (selectedIndex === -1) {
      // Nếu chưa được chọn, thêm vào danh sách các hàng được chọn
      newSelectedRows.push(index);
    } else {
      // Nếu đã được chọn, loại bỏ khỏi danh sách các hàng được chọn
      newSelectedRows.splice(selectedIndex, 1);
    }

    setSelectedRows(newSelectedRows);
  };

  const isSelected = (index) => {
    // Kiểm tra xem hàng có trong danh sách các hàng được chọn hay không
    return selectedRows.indexOf(index) !== -1;
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allSelectedRows = [
        ...listChildCampaign[indexActiveCard].ads.keys(),
      ];

      // console.log(allSelectedRows)

      setSelectedRows(allSelectedRows);
      setIsAllSelected(true);
    } else {
      // Nếu checkbox trên THead bị huỷ chọn, xóa trạng thái bôi đen của các hàng
      setSelectedRows([]);
      setIsAllSelected(false);
    }
  };

  const deleteSelectedRows = () => {
    setListChildCampaign((prev) => {
      const updateListChild = [...prev];
      const data = updateListChild[indexActiveCard];
      total = 0;
      data.quantity = total;
      data.ads = data.ads.filter((row, index) => !isSelected(index));
      dataSubCampaign(listChildCampaign);
      return updateListChild;
    });
    setSelectedRows([]);
    setIsAllSelected(false);
  };

  const handleChecked = (e) => {
    setListChildCampaign((prev) => {
      const updateListChild = [...prev];
      const data = updateListChild[indexActiveCard];
      data.status = e.target.checked;
      return updateListChild;
    });
  };

  return (
    <div style={{ padding: "16px" }}>
      <Grid container>
        <Grid item xs={12} style={{ overflow: "auto", padding: "1px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: `${listChildCampaign.length * 214 + 60}px`,
            }}
          >
            <div>
              <IconButton
                onClick={() => handleAddCampaign()}
                style={{ background: "rgb(237, 237, 237)" }}
              >
                <PlusIcon color="secondary" />
              </IconButton>
            </div>
            {listChildCampaign.map((item, index) => {
              return (
                <CardItem
                  index={index}
                  click={() => {
                    setindexActiveCard(index);
                  }}
                  key={index}
                  name={item.name}
                  quantity={item.quantity}
                  isActive={index === indexActiveCard}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "20px" }}>
        <Grid item xs={8}>
          <TextField
            id="standard-basic"
            variant="standard"
            fullWidth
            label="Tên chiến dịch con*"
            onChange={(e) => handleChangeName(e)}
            error={!listChildCampaign[indexActiveCard].name && isCheck}
            value={listChildCampaign[indexActiveCard].name}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label={<p style={{ color: "black" }}>Đang hoạt động</p>}
            control={
              <Checkbox
                name="campaignStatus"
                onChange={handleChecked}
                checked={listChildCampaign[indexActiveCard].status}
              />
            }
          />
        </Grid>
      </Grid>
      <h2 style={{ fontWeight: "400", color: "#000", textAlign: "start" }}>
        DANH SÁCH QUẢNG CÁO
      </h2>
      <div>
        <TableContainer sx={{ width: "100%" }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    style={{ padding: "0" }}
                    color="primary"
                    checked={isAllSelected}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {selectedRows.length > 0 ? (
                  <>
                    <TableCell align="left">
                      <IconButton onClick={deleteSelectedRows}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left"></TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="left">Tên quảng cáo *</TableCell>
                    <TableCell align="left">Số lượng *</TableCell>
                  </>
                )}
                <TableCell align="right">
                  <Button variant="outlined" onClick={handleAddItem}>
                    <PlusIcon
                      style={{ fontSize: "16px", paddingRight: "8px" }}
                    />
                    Thêm
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listChildCampaign &&
                listChildCampaign[indexActiveCard].ads.map((_, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    selected={isSelected(index)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isSelected(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        onChange={(e) => handleChangeNameComercical(e, index)}
                        error={
                          !listChildCampaign[indexActiveCard].ads[index].name &&
                          isCheck
                        }
                        value={
                          listChildCampaign[indexActiveCard].ads[index].name
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        type="number"
                        fullWidth
                        onChange={(e) => handleChangeQuantity(e, index)}
                        error={
                          !listChildCampaign[indexActiveCard].ads[index]
                            .quantity && isCheck
                        }
                        value={
                          listChildCampaign[indexActiveCard].ads[index].quantity
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        disabled={selectedRows.length > 0}
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ChildCampaign;
