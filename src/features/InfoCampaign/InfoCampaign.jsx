import React, { useState } from "react";
import { TextField } from "@mui/material";

export default function InfoCampaign({ dataCampaign, isCheck }) {
  const [nameCampaign, setNameCampaign] = useState("");
  const [descCampaign, setDescCampaign] = useState("");

  const handleChangeNameCampaign = (e) => {
    setNameCampaign(e.target.value);
    dataCampaign({ name: e.target.value, describe: descCampaign });
  };

  const handleChangeDescCampaign = (e) => {
    setDescCampaign(e.target.value);
    dataCampaign({ name: nameCampaign, describe: e.target.value });
  };

  return (
    <div style={{ padding: "8px" }}>
      <TextField
        id="standard-basic"
        variant="standard"
        name="nameCampaign"
        label="Tên chiến dịch *"
        fullWidth
        onChange={handleChangeNameCampaign}
        error={!nameCampaign && isCheck}
        helperText={!nameCampaign && isCheck && "Dữ liệu không hợp lệ"}
        value={nameCampaign}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        id="standard-basic"
        variant="standard"
        name="descCampaign"
        label="Mô tả chiến dịch"
        fullWidth
        onChange={handleChangeDescCampaign}
        value={descCampaign}
      />
    </div>
  );
}
