import React, { useState, useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  Typography,
  //Select,
  //MenuItem,
  FormControl,
  // InputLabel,
  Button,
  Popover,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Grid,
  //OutlinedInput
} from '@mui/material';
import navigation from '../../../menu-items';
import { BASE_TITLE } from '../../../config/constant';
import { DateRange, FilterAltOutlined } from '@mui/icons-material';

const Breadcrumb = () => {
  const location = useLocation();
  //const [value, setValue] = useState("")
  const [selectedDate, setSelectedDate] = useState("7D");
  const [main, setMain] = useState([]);
  const [item, setItem] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open;

  useEffect(() => {
    navigation.items.map((item, index) => {
      if (item.type && item.type === 'group') {
        getCollapse(item, index);
      }
      return false;
    });
  });

  const getCollapse = (item, index) => {
    if (item.children) {
      item.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse, index);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(item);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  let mainContent;
  let breadcrumbContent = '';
  let title = '';
  // let subtitle ='';

  if (main && main.type === 'collapse') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
        <Link to="#">{main.title}</Link>
      </ListGroup.Item>
    );
  }
  if (item && item.type === 'item') {
    title = item.title;

    if (title === 'Settings') {
      // Don't render breadcrumbContent for Settings page
      breadcrumbContent = null;
    } else {
      breadcrumbContent = (
        <div className="page-header pb-3">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-title">
                  <h5 className="m-b-10">{mainContent}</h5>
                </div>
                <Row className='d-flex justify-content-around'>
                  <Col md={6} sm={12} xs={12}>
                    <div className="dashheading">
                      <Link className={title == "Dashboard" ? "title" : location.pathname.toLowerCase().includes("list") ? "tab" : "tab active"} to={`/app/${title}`} >{title != "Dashboard" ? "Dashboard": title}</Link>
                      {title != "Dashboard" &&
                        <span>
                          <Link className={location.pathname.toLowerCase().includes("list") ? "tab active" : "tab"} to={`/app/${title}List`} >{title} List</Link>
                        </span>
                      }
                    </div> 
                  </Col>
                  <Col md={6} sm={12} xs={12} className='d-flex justify-content-end' style={{paddingRight:'18px'}}>
                    <div className="row days-filter float-end" style={{marginRight:'15px' }}>
                      <div className="col-md-12" style={{ padding:0 }}>
                        <button className={`days ${selectedDate == "1D" ? "active": ""}`} onClick={()=>setSelectedDate("1D")}>1D</button>
                        <button className={`days ${selectedDate == "7D" ? "active": ""}`} onClick={()=>setSelectedDate("7D")}>7D</button>
                        <button className={`days ${selectedDate == "14D" ? "active": ""}`} onClick={()=>setSelectedDate("14D")}>14D</button>
                        <button className={`days ${selectedDate == "30D" ? "active": ""}`} onClick={()=>setSelectedDate("30D")}>30D</button>
                        <button className={`days`}>
                          <DateRange />
                        </button>
                      </div>
                    </div>
                  
                  <Col md={2} sm={7} xs={7} style={{ padding: 2, textAlign: 'end',justifyContent:'end',display:'flex', width:'160px',marginRight:'15px'  }}
                      >
                    {/* <FormControl variant="outlined" sx={{ minWidth: 210, height: 50, }}>
                      <InputLabel style={{ color: '#1565C0', marginTop: -10 }} id="demo-simple-select-autowidth-label">
                        Select Client
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth-label"
                        inputProps={{ 'aria-label': 'Without label' }}
                        input={<OutlinedInput />}
                        displayEmpty
                        className="select"
                        onChange={(val)=>setValue(val.target.value)}
                        value={value}
                        style={{ fontSize: 16, color: '#1565C0', width: 190, border: '1px solid #1565C0', height: 48,borderRadius:'8px',padding:'8px 16px' }}
                      >
                        <MenuItem disabled value="">
                          Select Client
                        </MenuItem>
                        <MenuItem value={10}>All</MenuItem>
                        <MenuItem value={20}>KSCCL-WATER-SUPPLY-OTAA</MenuItem>
                        <MenuItem value={30}>TEST_ABP_01</MenuItem>
                      </Select>
                    </FormControl> */}
                    <div className="form-group selectcustom">
                      <select className="form-control">
                        <option>Select Client</option>
                        <option>All</option>
                        <option>KSCCL-WATER ..</option>
                        <option>TEST_ABP_01</option>
                      </select>
                    </div>
                  </Col>
                  <Col md={1} sm={4} xs={4} style={{ textAlign: 'end', width: '100px', padding: 2 }}>
                    <button
                      style={{
                        background: 'transparent',
                        color: '#1565C0',
                        border: '1px solid #1565C0',
                        paddingLeft: 10,
                        paddingRight: 10,
                        height: 48,
                        width:103,
                        borderRadius:'8px'
                      }}
                      className="filter"
                      aria-describedby={id}
                      onClick={handleOpen}
                    >
                      <FilterAltOutlined style={{ color: '#1565C0' }} />
                      Filter
                    </button>
                    <Popover
                      id={id}
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                    >
                      <Typography sx={{ p: 2, width: 400 }}>
                        <Grid container>
                          <Grid item xs={10}>
                            <span className="intelfont">Filters</span>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            onClick={handleClose}
                            style={{
                              textAlign: 'right',
                              cursor: 'pointer'
                            }}
                          >
                            <span className="intelfont" style={{ fontWeight: 'bold', color: '#ccc' }}>
                              X
                            </span>
                          </Grid>
                        </Grid>
                        {/* <Search>
                          <SearchIconWrapper>
                            <SearchIcon />
                          </SearchIconWrapper>
                          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                        </Search> */}
                        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
                          <FormLabel className="intelfont" id="demo-radio-buttons-group-label">
                            Clients
                          </FormLabel>
                          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="water" name="radio-buttons-group">
                            <FormControlLabel value="water" control={<Radio />} label="KSCCL-WATER-SUPPLY-OTAA" />
                            <FormControlLabel value="test" control={<Radio />} label="TEST_ABP_01" />
                          </RadioGroup>
                        </FormControl>

                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">Zones</FormLabel>
                          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                            <FormControlLabel value="1" control={<Radio />} label="Zone 1" />
                            <FormControlLabel value="2" control={<Radio />} label="Zone 2" />
                            <FormControlLabel value="3" control={<Radio />} label="Zone 3" />
                            <FormControlLabel value="4" control={<Radio />} label="Zone 4" />
                          </RadioGroup>
                        </FormControl>
                        <Grid container style={{ marginTop: 10 }}>
                          <Grid item xs={5}>
                            <Button style={{ width: '100%', border: '1px solid #1565C0', textAlign: 'right' }}>Reset</Button>
                          </Grid>
                          <Grid item xs={5}>
                            <Button
                              style={{
                                width: '100%',
                                marginLeft: 30,
                                border: '1px solid #1565C0',
                                backgroundColor: '#1565C0',
                                color: '#fff',
                                textAlign: 'end'
                              }}
                            >
                              Apply
                            </Button>
                          </Grid>
                        </Grid>
                      </Typography>
                    </Popover>
                  </Col>
                </Col>
                </Row>

                {/* <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
                  <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                    <Link to="/">
                      <i className="feather icon-home" />
                    </Link>
                  </ListGroup.Item>
                  {/* {mainContent} 
                  {itemContent}
                </ListGroup> */}
              </div>
            </div>
          </div>
        </div>
      );
    }

    document.title = title + BASE_TITLE;
  }

  return <React.Fragment>{breadcrumbContent}</React.Fragment>;
};

export default Breadcrumb;
