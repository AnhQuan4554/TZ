import {
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import type { FC } from 'react';
import { TymlezLogo } from '@tymlez/frontend-libs';
import TymLezQR from '../../../../public/images/TymLezQR.png';

interface Props {
  openPreview: boolean;
  closePreview: () => void;
  handleExportPdf: () => void;
  loading: boolean;
}

export const PreviewReport: FC<Props> = ({
  openPreview,
  closePreview,
  handleExportPdf,
  loading,
}) => {
  const data = {
    input: [
      {
        'Upstream and Inputs': [
          {
            name: 'Compressison',
            energy: [
              {
                name: 'Electricity',
                value: 1.475,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
            ],
          },
          {
            name: 'Electrolyser',
            energy: [
              {
                name: 'Electricity',
                value: 78.4941666667,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
            ],
          },
          {
            name: 'Gas Purification',
            energy: [
              {
                name: 'Electricity',
                value: 0.1583333333,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
            ],
          },
          {
            name: 'Water Treatment',
            energy: [
              {
                name: 'Electricity',
                value: 0.1583333333,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
              {
                name: 'Water',
                value: 44.0666666667,
                unit: '(L/h)',
              },
            ],
          },
        ],
      },
      {
        'Upstream and Inputs': [
          {
            name: 'Compressison',
            energy: [
              {
                name: 'Electricity',
                value: 1.475,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
            ],
          },
          {
            name: 'Electrolyser',
            energy: [
              {
                name: 'Electricity',
                value: 78.4941666667,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
            ],
          },
          {
            name: 'Gas Purification',
            energy: [
              {
                name: 'Electricity',
                value: 0.1583333333,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
            ],
          },
          {
            name: 'Water Treatment',
            energy: [
              {
                name: 'Electricity',
                value: 0.1583333333,
                unit: 'kWh',
              },
              {
                name: 'Solar',
                value: 0,
                unit: 'kWh',
              },
              {
                name: 'Water',
                value: 44.0666666667,
                unit: '(L/h)',
              },
            ],
          },
        ],
      },
    ],
    output: [
      {
        Production: [
          {
            name: 'Compressison',
            energy: [
              {
                name: 'Electricity',
                value: 1.4271666667,
                unit: '(kg)',
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <Dialog open={openPreview} onClose={closePreview}>
      <Grid id="pdf" sx={{ p: 3 }}>
        <Grid
          sx={{
            display: 'flex',
            // padding: '12px',
            justifyContent: 'space-between',
            borderBottom: '1px solid #D3ECB9',
          }}
        >
          <Grid>
            <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>
              Guarantee of Origin Certificate
            </Typography>
          </Grid>
          <Grid>
            <TymlezLogo />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 1,
          }}
        >
          <Grid item xs={5} md={5} lg={5}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                border: ' 1px solid #ECECEC',
                padding: '12px 14px 39px 12px',
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>Carbon Intensity</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '28px' }}>
                48.97 t
              </Typography>
              <Typography sx={{ fontWeight: 400, fontSize: '13px' }}>
                CO2eq produced
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={7} md={7} lg={7}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                padding: '12px 13px 12px 12px',
                border: ' 1px solid #ECECEC',
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                Batch production details
              </Typography>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1,
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>
                  Quantity:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#5C6A82 ',
                  }}
                >
                  1 Tonne
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1,
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>
                  Renewable energy:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#5C6A82 ',
                  }}
                >
                  22,150 kWh
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1,
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>
                  Grid energy:
                </Typography>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#5C6A82 ',
                  }}
                >
                  39,018 kWh
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 1 }} spacing={2}>
          <Grid item xs={7} md={7} lg={7}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                border: ' 1px solid #ECECEC',
                padding: '12px 12px 16px 12px',
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                Certificate details
              </Typography>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>
                  Certificate ID:
                </Typography>
                <Typography sx={{ fontSize: '13px', maxWidth: '180px' }}>
                  d8ef810a-aad1-4ad2-98e0-d0603e091e9b
                </Typography>
              </Grid>

              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>
                  Batch ID:
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#92D050 ' }}>
                  1675220642.902655102
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>
                  Batch production dates:
                </Typography>
                <Typography sx={{ fontSize: '13px', maxWidth: '80px' }}>
                  12/02/2022- 12/02/2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} md={5} lg={5}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                border: ' 1px solid #ECECEC',
                padding: '12px 13px 8px 12px',
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>Trust Chain</Typography>
              <img
                src={TymLezQR.src}
                alt="TymlezQR"
                style={{ display: 'block', margin: 'auto', marginTop: '8px' }}
              />
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                Scan to view certificate on TYMLEZ Trust Chain
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            mt: 2,
            border: ' 1px solid #ECECEC',
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Product stage</Typography>
          <Grid
            sx={{
              borderLeft: '2px solid #A8D973',
              height: '100%',
              // overflowY: 'scroll',
            }}
          >
            <Grid
              container
              sx={{
                px: 2,
              }}
            >
              <Grid item xs={4} md={4} lg={4} />
              <Grid
                item
                xs={8}
                md={8}
                lg={8}
                sx={{ fontSize: '13px', fontWeight: 700 }}
              >
                Input
              </Grid>
            </Grid>
            {data.input.map((items, dataInputIndex) => {
              return (
                <Grid
                  key={`data-input-${dataInputIndex}`}
                  container
                  sx={{
                    pl: 1,
                  }}
                >
                  <Grid
                    item
                    xs={4}
                    md={4}
                    lg={4}
                    sx={{ fontSize: '14px', fontWeight: 700 }}
                  >
                    {Object.keys(items)}
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    {Object.values(items).map((item) => {
                      return item.map((value, inputValueIndex) => {
                        return (
                          <React.Fragment
                            key={`input-value-${inputValueIndex}`}
                          >
                            <Grid
                              item
                              xs={5}
                              md={5}
                              lg={5}
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Typography
                                sx={{ fontSize: '14px', fontWeight: 700 }}
                              >
                                {value.name}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={7}
                              md={7}
                              lg={7}
                              sx={{ marginBottom: 1 }}
                            >
                              {value.energy.map((energy, energyIndex) => {
                                return (
                                  <Grid
                                    key={`input-energy-${energyIndex}`}
                                    container
                                  >
                                    <Grid item xs={12}>
                                      <Grid
                                        sx={{
                                          justifyContent: 'space-between',
                                          display: 'flex',
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: '13px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          {energy.name}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: '13px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          {energy.value} {energy.unit}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </React.Fragment>
                        );
                      });
                    })}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            sx={{
              borderLeft: '2px solid #A8D973',
              height: '100%',
              mt: 2,
            }}
          >
            <Grid
              container
              sx={{
                padding: '0 16px',
              }}
            >
              <Grid item xs={4} md={4} lg={4} />
              <Grid
                item
                xs={8}
                md={8}
                lg={8}
                sx={{ fontSize: '13px', fontWeight: 700 }}
              >
                Output
              </Grid>
            </Grid>
            {data.output.map((items, dataOutputIndex) => {
              return (
                <Grid
                  key={`data-output-${dataOutputIndex}`}
                  container
                  sx={{
                    pl: 1,
                  }}
                >
                  <Grid
                    item
                    xs={4}
                    md={4}
                    lg={4}
                    sx={{ fontSize: '14px', fontWeight: 700 }}
                  >
                    {Object.keys(items)}
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    {Object.values(items).map((item) => {
                      return item.map((value, dataOutputValueIndex) => {
                        return (
                          <React.Fragment
                            key={`data-output-value-${dataOutputValueIndex}`}
                          >
                            <Grid
                              item
                              xs={5}
                              md={5}
                              lg={5}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                sx={{ fontSize: '14px', fontWeight: 700 }}
                              >
                                {value.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={7} md={7} lg={7}>
                              {value.energy.map(
                                (output, dataOutputEnergyIndex) => {
                                  return (
                                    <Grid
                                      key={`data-output-energy-${dataOutputEnergyIndex}`}
                                      container
                                    >
                                      <Grid item xs={12}>
                                        <Grid
                                          sx={{
                                            justifyContent: 'space-between',
                                            display: 'flex',
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: '13px',
                                              fontWeight: 400,
                                            }}
                                          >
                                            {output.name}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: '13px',
                                              fontWeight: 400,
                                            }}
                                          >
                                            {output.value} {output.unit}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  );
                                },
                              )}
                            </Grid>
                          </React.Fragment>
                        );
                      });
                    })}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, background: '#7fef0a' }} />
      </Grid>
      <Grid
        sx={{
          marginLeft: 'auto',
          mr: 3,
          mb: 3,
        }}
      >
        <Button
          sx={{
            // backgroundColor: '#FCFFF9',
            color: '#5C6A82',
            fontWeight: 700,
            fontSize: '13px',
            // border: '1px solid #92D050',
            borderRadius: '4px',
            mr: 3,
          }}
          onClick={closePreview}
        >
          Cancel
        </Button>
        {loading ? (
          <Button
            sx={{
              background: '#A8D973',
              color: '#3A5320',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            <img
              src="../icons/other/Print.svg"
              alt="Icon Print"
              style={{ marginRight: '8px' }}
            />
            <CircularProgress
              size={20}
              variant="indeterminate"
              color="inherit"
            />
          </Button>
        ) : (
          <Button
            sx={{
              background: '#A8D973',
              color: '#3A5320',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '13px',
            }}
            onClick={handleExportPdf}
          >
            <img
              src="../icons/other/Print.svg"
              alt="Icon Print"
              style={{ marginRight: '8px' }}
            />
            Export to PDF
          </Button>
        )}
      </Grid>
    </Dialog>
  );
};
