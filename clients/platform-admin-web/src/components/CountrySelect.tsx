import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface CountryType {
  code3: string;
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376', code3: 'AND' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
    code3: 'ARE',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93', code3: 'AFG' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
    code3: 'ATG',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264', code3: 'AIA' },
  { code: 'AL', label: 'Albania', phone: '355', code3: 'ALB' },
  { code: 'AM', label: 'Armenia', phone: '374', code3: 'ARM' },
  { code: 'AO', label: 'Angola', phone: '244', code3: 'AGO' },
  { code: 'AQ', label: 'Antarctica', phone: '672', code3: 'ATA' },
  { code: 'AR', label: 'Argentina', phone: '54', code3: 'ARG' },
  { code: 'AS', label: 'American Samoa', phone: '1-684', code3: 'ASM' },
  { code: 'AT', label: 'Austria', phone: '43', code3: 'AUT' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    code3: 'AUS',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297', code3: 'ABW' },
  { code: 'AX', label: 'Alland Islands', phone: '358', code3: 'ALA' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994', code3: 'AZE' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
    code3: 'BIH',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246', code3: 'BRB' },
  { code: 'BD', label: 'Bangladesh', phone: '880', code3: 'BGD' },
  { code: 'BE', label: 'Belgium', phone: '32', code3: 'BEL' },
  { code: 'BF', label: 'Burkina Faso', phone: '226', code3: 'BFA' },
  { code: 'BG', label: 'Bulgaria', phone: '359', code3: 'BGR' },
  { code: 'BH', label: 'Bahrain', phone: '973', code3: 'BHR' },
  { code: 'BI', label: 'Burundi', phone: '257', code3: 'BDI' },
  { code: 'BJ', label: 'Benin', phone: '229', code3: 'BEN' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590', code3: 'BLM' },
  { code: 'BM', label: 'Bermuda', phone: '1-441', code3: 'BMU' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673', code3: 'BRN' },
  { code: 'BO', label: 'Bolivia', phone: '591', code3: 'BOL' },
  {
    code: 'BQ',
    label: 'Bonaire, Sint Eustatius and Saba',
    phone: '599',
    code3: 'BES',
  },
  { code: 'BR', label: 'Brazil', phone: '55', code3: 'BRA' },
  { code: 'BS', label: 'Bahamas', phone: '1-242', code3: 'BHS' },
  { code: 'BT', label: 'Bhutan', phone: '975', code3: 'BTN' },
  { code: 'BV', label: 'Bouvet Island', phone: '47', code3: 'BVT' },
  { code: 'BW', label: 'Botswana', phone: '267', code3: 'BWA' },
  { code: 'BY', label: 'Belarus', phone: '375', code3: 'BLR' },
  { code: 'BZ', label: 'Belize', phone: '501', code3: 'BLZ' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    code3: 'CAN',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
    code3: 'CCK',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
    code3: 'COD',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
    code3: 'CAF',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
    code3: 'COG',
  },
  { code: 'CH', label: 'Switzerland', phone: '41', code3: 'CHE' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225', code3: 'CIV' },
  { code: 'CK', label: 'Cook Islands', phone: '682', code3: 'COK' },
  { code: 'CL', label: 'Chile', phone: '56', code3: 'CHL' },
  { code: 'CM', label: 'Cameroon', phone: '237', code3: 'CMR' },
  { code: 'CN', label: 'China', phone: '86', code3: 'CHN' },
  { code: 'CO', label: 'Colombia', phone: '57', code3: 'COL' },
  { code: 'CR', label: 'Costa Rica', phone: '506', code3: 'CRI' },
  { code: 'CU', label: 'Cuba', phone: '53', code3: 'CUB' },
  { code: 'CV', label: 'Cape Verde', phone: '238', code3: 'CPV' },
  { code: 'CW', label: 'Curacao', phone: '599', code3: 'CUW' },
  { code: 'CX', label: 'Christmas Island', phone: '61', code3: 'CXR' },
  { code: 'CY', label: 'Cyprus', phone: '357', code3: 'CYP' },
  { code: 'CZ', label: 'Czech Republic', phone: '420', code3: 'CZE' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    code3: 'DEU',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253', code3: 'DJI' },
  { code: 'DK', label: 'Denmark', phone: '45', code3: 'DNK' },
  { code: 'DM', label: 'Dominica', phone: '1-767', code3: 'DMA' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
    code3: 'DOM',
  },
  { code: 'DZ', label: 'Algeria', phone: '213', code3: 'DZA' },
  { code: 'EC', label: 'Ecuador', phone: '593', code3: 'ECU' },
  { code: 'EE', label: 'Estonia', phone: '372', code3: 'EST' },
  { code: 'EG', label: 'Egypt', phone: '20', code3: 'EGY' },
  { code: 'EH', label: 'Western Sahara', phone: '212', code3: 'ESH' },
  { code: 'ER', label: 'Eritrea', phone: '291', code3: 'ERI' },
  { code: 'ES', label: 'Spain', phone: '34', code3: 'ESP' },
  { code: 'ET', label: 'Ethiopia', phone: '251', code3: 'ETH' },
  { code: 'FI', label: 'Finland', phone: '358', code3: 'FIN' },
  { code: 'FJ', label: 'Fiji', phone: '679', code3: 'FJI' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
    code3: 'FLK',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
    code3: 'FSM',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298', code3: 'FRO' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    code3: 'FRA',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241', code3: 'GAB' },
  { code: 'GB', label: 'United Kingdom', phone: '44', code3: 'GBR' },
  { code: 'GD', label: 'Grenada', phone: '1-473', code3: 'GRD' },
  { code: 'GE', label: 'Georgia', phone: '995', code3: 'GEO' },
  { code: 'GF', label: 'French Guiana', phone: '594', code3: 'GUF' },
  { code: 'GG', label: 'Guernsey', phone: '44', code3: 'GGY' },
  { code: 'GH', label: 'Ghana', phone: '233', code3: 'GHA' },
  { code: 'GI', label: 'Gibraltar', phone: '350', code3: 'GIB' },
  { code: 'GL', label: 'Greenland', phone: '299', code3: 'GRL' },
  { code: 'GM', label: 'Gambia', phone: '220', code3: 'GMB' },
  { code: 'GN', label: 'Guinea', phone: '224', code3: 'GIN' },
  { code: 'GP', label: 'Guadeloupe', phone: '590', code3: 'GLP' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240', code3: 'GNQ' },
  { code: 'GR', label: 'Greece', phone: '30', code3: 'GRC' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
    code3: 'SGS',
  },
  { code: 'GT', label: 'Guatemala', phone: '502', code3: 'GTM' },
  { code: 'GU', label: 'Guam', phone: '1-671', code3: 'GUM' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245', code3: 'GNB' },
  { code: 'GY', label: 'Guyana', phone: '592', code3: 'GUY' },
  { code: 'HK', label: 'Hong Kong', phone: '852', code3: 'HKG' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
    code3: 'HMD',
  },
  { code: 'HN', label: 'Honduras', phone: '504', code3: 'HND' },
  { code: 'HR', label: 'Croatia', phone: '385', code3: 'HRV' },
  { code: 'HT', label: 'Haiti', phone: '509', code3: 'HTI' },
  { code: 'HU', label: 'Hungary', phone: '36', code3: 'HUN' },
  { code: 'ID', label: 'Indonesia', phone: '62', code3: 'IDN' },
  { code: 'IE', label: 'Ireland', phone: '353', code3: 'IRL' },
  { code: 'IL', label: 'Israel', phone: '972', code3: 'ISR' },
  { code: 'IM', label: 'Isle of Man', phone: '44', code3: 'IMN' },
  { code: 'IN', label: 'India', phone: '91', code3: 'IND' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
    code3: 'IOT',
  },
  { code: 'IQ', label: 'Iraq', phone: '964', code3: 'IRQ' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
    code3: 'IRN',
  },
  { code: 'IS', label: 'Iceland', phone: '354', code3: 'ISL' },
  { code: 'IT', label: 'Italy', phone: '39', code3: 'ITA' },
  { code: 'JE', label: 'Jersey', phone: '44', code3: 'JEY' },
  { code: 'JM', label: 'Jamaica', phone: '1-876', code3: 'JAM' },
  { code: 'JO', label: 'Jordan', phone: '962', code3: 'JOR' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    code3: 'JPN',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254', code3: 'KEN' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996', code3: 'KGZ' },
  { code: 'KH', label: 'Cambodia', phone: '855', code3: 'KHM' },
  { code: 'KI', label: 'Kiribati', phone: '686', code3: 'KIR' },
  { code: 'KM', label: 'Comoros', phone: '269', code3: 'COM' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
    code3: 'KNA',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
    code3: 'PRK',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82', code3: 'KOR' },
  { code: 'KW', label: 'Kuwait', phone: '965', code3: 'KWT' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345', code3: 'CYM' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7', code3: 'KAZ' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
    code3: 'LAO',
  },
  { code: 'LB', label: 'Lebanon', phone: '961', code3: 'LBN' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758', code3: 'LCA' },
  { code: 'LI', label: 'Liechtenstein', phone: '423', code3: 'LIE' },
  { code: 'LK', label: 'Sri Lanka', phone: '94', code3: 'LKA' },
  { code: 'LR', label: 'Liberia', phone: '231', code3: 'LBR' },
  { code: 'LS', label: 'Lesotho', phone: '266', code3: 'LSO' },
  { code: 'LT', label: 'Lithuania', phone: '370', code3: 'LTU' },
  { code: 'LU', label: 'Luxembourg', phone: '352', code3: 'LUX' },
  { code: 'LV', label: 'Latvia', phone: '371', code3: 'LVA' },
  { code: 'LY', label: 'Libya', phone: '218', code3: 'LBY' },
  { code: 'MA', label: 'Morocco', phone: '212', code3: 'MAR' },
  { code: 'MC', label: 'Monaco', phone: '377', code3: 'MCO' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
    code3: 'MDA',
  },
  { code: 'ME', label: 'Montenegro', phone: '382', code3: 'MNE' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
    code3: 'MAF',
  },
  { code: 'MG', label: 'Madagascar', phone: '261', code3: 'MDG' },
  { code: 'MH', label: 'Marshall Islands', phone: '692', code3: 'MHL' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
    code3: 'MKD',
  },
  { code: 'ML', label: 'Mali', phone: '223', code3: 'MLI' },
  { code: 'MM', label: 'Myanmar', phone: '95', code3: 'MMR' },
  { code: 'MN', label: 'Mongolia', phone: '976', code3: 'MNG' },
  { code: 'MO', label: 'Macao', phone: '853', code3: 'MAC' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
    code3: 'MNP',
  },
  { code: 'MQ', label: 'Martinique', phone: '596', code3: 'MTQ' },
  { code: 'MR', label: 'Mauritania', phone: '222', code3: 'MRT' },
  { code: 'MS', label: 'Montserrat', phone: '1-664', code3: 'MSR' },
  { code: 'MT', label: 'Malta', phone: '356', code3: 'MLT' },
  { code: 'MU', label: 'Mauritius', phone: '230', code3: 'MUS' },
  { code: 'MV', label: 'Maldives', phone: '960', code3: 'MDV' },
  { code: 'MW', label: 'Malawi', phone: '265', code3: 'MWI' },
  { code: 'MX', label: 'Mexico', phone: '52', code3: 'MEX' },
  { code: 'MY', label: 'Malaysia', phone: '60', code3: 'MYS' },
  { code: 'MZ', label: 'Mozambique', phone: '258', code3: 'MOZ' },
  { code: 'NA', label: 'Namibia', phone: '264', code3: 'NAM' },
  { code: 'NC', label: 'New Caledonia', phone: '687', code3: 'NCL' },
  { code: 'NE', label: 'Niger', phone: '227', code3: 'NER' },
  { code: 'NF', label: 'Norfolk Island', phone: '672', code3: 'NFK' },
  { code: 'NG', label: 'Nigeria', phone: '234', code3: 'NGA' },
  { code: 'NI', label: 'Nicaragua', phone: '505', code3: 'NIC' },
  { code: 'NL', label: 'Netherlands', phone: '31', code3: 'NLD' },
  { code: 'NO', label: 'Norway', phone: '47', code3: 'NOR' },
  { code: 'NP', label: 'Nepal', phone: '977', code3: 'NPL' },
  { code: 'NR', label: 'Nauru', phone: '674', code3: 'NRU' },
  { code: 'NU', label: 'Niue', phone: '683', code3: 'NIU' },
  { code: 'NZ', label: 'New Zealand', phone: '64', code3: 'NZL' },
  { code: 'OM', label: 'Oman', phone: '968', code3: 'OMN' },
  { code: 'PA', label: 'Panama', phone: '507', code3: 'PAN' },
  { code: 'PE', label: 'Peru', phone: '51', code3: 'PER' },
  { code: 'PF', label: 'French Polynesia', phone: '689', code3: 'PYF' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675', code3: 'PNG' },
  { code: 'PH', label: 'Philippines', phone: '63', code3: 'PHL' },
  { code: 'PK', label: 'Pakistan', phone: '92', code3: 'PAK' },
  { code: 'PL', label: 'Poland', phone: '48', code3: 'POL' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
    code3: 'SPM',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870', code3: 'PCN' },
  { code: 'PR', label: 'Puerto Rico', phone: '1', code3: 'PRI' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
    code3: 'PSE',
  },
  { code: 'PT', label: 'Portugal', phone: '351', code3: 'PRT' },
  { code: 'PW', label: 'Palau', phone: '680', code3: 'PLW' },
  { code: 'PY', label: 'Paraguay', phone: '595', code3: 'PRY' },
  { code: 'QA', label: 'Qatar', phone: '974', code3: 'QAT' },
  { code: 'RE', label: 'Reunion', phone: '262', code3: 'REU' },
  { code: 'RO', label: 'Romania', phone: '40', code3: 'ROU' },
  { code: 'RS', label: 'Serbia', phone: '381', code3: 'SRB' },
  { code: 'RU', label: 'Russian Federation', phone: '7', code3: 'BRUSOL' },
  { code: 'RW', label: 'Rwanda', phone: '250', code3: 'RWA' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966', code3: 'SAU' },
  { code: 'SB', label: 'Solomon Islands', phone: '677', code3: 'SLB' },
  { code: 'SC', label: 'Seychelles', phone: '248', code3: 'SYC' },
  { code: 'SD', label: 'Sudan', phone: '249', code3: 'SDN' },
  { code: 'SE', label: 'Sweden', phone: '46', code3: 'SWE' },
  { code: 'SG', label: 'Singapore', phone: '65', code3: 'SGP' },
  { code: 'SH', label: 'Saint Helena', phone: '290', code3: 'SHN' },
  { code: 'SI', label: 'Slovenia', phone: '386', code3: 'SVN' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
    code3: 'SJM',
  },
  { code: 'SK', label: 'Slovakia', phone: '421', code3: 'SVK' },
  { code: 'SL', label: 'Sierra Leone', phone: '232', code3: 'SLE' },
  { code: 'SM', label: 'San Marino', phone: '378', code3: 'SMR' },
  { code: 'SN', label: 'Senegal', phone: '221', code3: 'SEN' },
  { code: 'SO', label: 'Somalia', phone: '252', code3: 'SOM' },
  { code: 'SR', label: 'Suriname', phone: '597', code3: 'SUR' },
  { code: 'SS', label: 'South Sudan', phone: '211', code3: 'SSD' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
    code3: 'STP',
  },
  { code: 'SV', label: 'El Salvador', phone: '503', code3: 'SLV' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
    code3: 'SXM',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
    code3: 'SYR',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268', code3: 'SWZ' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
    code3: 'TCA',
  },
  { code: 'TD', label: 'Chad', phone: '235', code3: 'TCD' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
    code3: 'ATF',
  },
  { code: 'TG', label: 'Togo', phone: '228', code3: 'TGO' },
  { code: 'TH', label: 'Thailand', phone: '66', code3: 'THA' },
  { code: 'TJ', label: 'Tajikistan', phone: '992', code3: 'TJK' },
  { code: 'TK', label: 'Tokelau', phone: '690', code3: 'TKL' },
  { code: 'TL', label: 'Timor-Leste', phone: '670', code3: 'TLS' },
  { code: 'TM', label: 'Turkmenistan', phone: '993', code3: 'TKM' },
  { code: 'TN', label: 'Tunisia', phone: '216', code3: 'TUN' },
  { code: 'TO', label: 'Tonga', phone: '676', code3: 'TON' },
  { code: 'TR', label: 'Turkey', phone: '90', code3: 'TUR' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
    code3: 'TTO',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688', code3: 'TUV' },
  {
    code: 'TW',
    label: 'Taiwan, Province of China',
    phone: '886',
    code3: 'TWN',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
    code3: 'TZA',
  },
  { code: 'UA', label: 'Ukraine', phone: '380', code3: 'UKR' },
  { code: 'UG', label: 'Uganda', phone: '256', code3: 'UGA' },
  {
    code: 'UM',
    label: 'United States Minor Outlying Islands (the)',
    phone: '001',
    code3: 'UMI',
  },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    code3: 'USA',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598', code3: 'URY' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998', code3: 'UZB' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
    code3: 'VAT',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
    code3: 'VCT',
  },
  { code: 'VE', label: 'Venezuela', phone: '58', code3: 'VEN' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
    code3: 'VGB',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
    code3: 'VIR',
  },
  { code: 'VN', label: 'Vietnam', phone: '84', code3: 'VNM' },
  { code: 'VU', label: 'Vanuatu', phone: '678', code3: 'VUT' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681', code3: 'WLF' },
  { code: 'WS', label: 'Samoa', phone: '685', code3: 'WSM' },
  { code: 'XK', label: 'Kosovo', phone: '383', code3: '' },
  { code: 'YE', label: 'Yemen', phone: '967', code3: 'YEM' },
  { code: 'YT', label: 'Mayotte', phone: '262', code3: 'MYT' },
  { code: 'ZA', label: 'South Africa', phone: '27', code3: 'ZAF' },
  { code: 'ZM', label: 'Zambia', phone: '260', code3: 'ZMB' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263', code3: 'ZWE' },
];

interface props {
  name: string;
  setFieldValue: any;
  value?: string;
  title: string;
  disabled: boolean;
  display: string;
}

export default function CountrySelect({
  name,
  setFieldValue,
  value,
  disabled,
  title,
  display,
}: props) {
  const [inputValue, setInputValue] = React.useState(value);
  React.useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(_, newInputValue, reason) => {
        if (reason === 'reset' && newInputValue) {
          setFieldValue(name, newInputValue);
        }

        if (reason === 'input') {
          setInputValue(newInputValue);
        }
      }}
      disabled={disabled}
      fullWidth
      id="country-select-demo"
      // sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={
        display === 'code' ? (option) => option.code3 : (option) => option.label
      }
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code3})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          required
          sx={{ marginTop: 3 }}
          {...params}
          label={title}
          // inputProps={{
          //   ...params.inputProps,
          //     autoComplete: 'new-password', // disable autocomplete and autofill
          // }}
        />
      )}
    />
  );
}
