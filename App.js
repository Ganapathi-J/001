import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Grid, Paper, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
// import Swal from 'sweetalert2';

const textFiledStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "black", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": {
    color: "black",
    "&.Mui-focused": {
      transform: "translate(16px, -10px)",
    },
  },
  "& input, & label": {
    height: "15px",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
}

export default function CustomerDT() {
  const [OrderID, setOrderID] = React.useState(true);
  const [PayemntID, setPayemntID] = React.useState(false);
  const [StatusID, setStatusId] = useState(null);
  // const [StatusData, setStatusData] = useState([])

  const [rows, setRows] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    amount : false
  })

  const getRowClassName = (params) => {
    const rowIndex = params.indexRelativeToCurrentPage;
    return rowIndex % 2 === 0 ? "row-even" : "row-odd";
  };

  const columns = [
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 110,
    //   renderCell: (params) => (
    //     <>
    //       <ModeEditOutlineRoundedIcon
    //         sx={{ color: "blue", marginRight: 2 }}
    //         style={{
    //           cursor: "pointer",
    //           opacity: 1,
    //           transition: "opacity 0.3s",
    //         }}
    //         onMouseOver={(e) => {
    //           e.currentTarget.style.opacity = 0.7;
    //           e.currentTarget.style.color = "lightblue";
    //         }}
    //         onMouseOut={(e) => {
    //           e.currentTarget.style.opacity = 1;
    //           e.currentTarget.style.color = "blue";
    //         }}
    //         onClick={() => { handleEdit(params.row) }}
    //       >
    //         Edit
    //       </ModeEditOutlineRoundedIcon>

    //     </>
    //   ),
    // },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 90
    },
    {
      field: 'captured',
      headerName: 'Captured',
      width: 170,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 190,
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 170,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 160,
    },
    {
      field: 'entity',
      headerName: 'Entity',
      width: 150,
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'method',
      headerName: 'Method',
      width: 170,
    },

  ];


  const handleRadio = (e) => {
    const { value } = e.target;
    if (value === 'Code') {
      setOrderID(true);
      setPayemntID(false);
      // FetchData()
    } else if (value === 'Name') {
      setOrderID(false);
      setPayemntID(true);
      // FetchData()
    }
  }

  const handleFieldChange = (fieldName, value) => {

    if (fieldName === "OrderID") {
      setStatusId(value);
    }

    if (fieldName === "PaymentID") {
      setStatusId(value);
    }

  }

  const handleSearch = async () => {
    if (OrderID === true) {
      try {
        const response = await fetch(`https://indtmu.in/fecthsinglepayment_byorderid.php?order_id=order_NuRYtReFbaGO5M`);
        const data = await response.json();
        setRows(data.items);
      } catch (error) {
        console.log(error);
      }
    }

    if (PayemntID === true) {
      try {
        const response = await fetch(`https://indtmu.in/fecthsinglepayment.php?payment_id=pay_NuRErVidc7l0b7`);
        const data = await response.json();
        setRows(data.items);
      } catch (error) {
        console.log(error);
      }
    }
  }


  React.useEffect(() => {

  }, [])


  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={12} lg={12} sm={12} xs={12} width={1000}>
                <Typography variant='h5'>
                  Payment Status Check
                </Typography>
              </Grid>
              <Grid item md={2} lg={2} sm={12} xs={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="Search"
                    onChange={(e) => { handleRadio(e) }}
                  >
                    <FormControlLabel
                      value="Code"
                      control={<Radio checked={OrderID} />}
                      label="OrderID"
                    />
                    <FormControlLabel
                      value="Name"
                      control={<Radio checked={PayemntID} />}
                      label="PayemntID  "
                    />

                  </RadioGroup>
                </FormControl>
              </Grid>
              {OrderID && (
                <Grid item md={3} lg={3} sm={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="OrderID"
                    variant="outlined"
                    size='small'
                    name='statusName'
                    required
                    sx={textFiledStyle}
                    fullWidth
                    value={StatusID}
                    onChange={(e) => handleFieldChange("OrderID", e.target.value)}
                  // error={Boolean(errors.pan)}
                  // helperText={errors.pan}
                  />
                </Grid>
              )}
              {PayemntID && (
                <Grid item md={3} lg={3} sm={12} xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="PaymentID"
                    variant="outlined"
                    size='small'
                    name='statusName'
                    required
                    sx={textFiledStyle}
                    fullWidth
                    value={StatusID}
                    onChange={(e) => handleFieldChange("PaymentID", e.target.value)}
                  // error={Boolean(errors.pan)}
                  // helperText={errors.pan}
                  />
                </Grid>
              )}

              <Grid item md={2} lg={2} sm={12} xs={12}>
                <Button variant="contained"
                  size='small'
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>


      <Paper elevation={3} sx={{ width: "100%", marginTop: 3, }}>
        <Grid item md={12} lg={12} sm={10} xs={10}>
          <Box sx={{ height: 315, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id.toString()}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              getRowHeight={() => 35}
              getRowClassName={getRowClassName}
            />
          </Box>
        </Grid>
      </Paper>
    </>
  )
}