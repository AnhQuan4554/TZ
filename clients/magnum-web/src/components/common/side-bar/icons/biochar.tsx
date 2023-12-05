import * as React from 'react';

const BioChar = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M22.8847 15.3532C22.7626 14.7205 22.3655 14.1668 21.8089 13.847C21.6868 13.2144 21.2896 12.6607 20.733 12.3408C20.611 11.708 20.2136 11.1541 19.6568 10.8343C19.5346 10.2016 19.1375 9.64782 18.581 9.32808C18.4589 8.69532 18.0617 8.14163 17.5051 7.82185C17.3831 7.1895 16.9863 6.63605 16.4303 6.31613C16.2367 5.29402 15.3369 4.51875 14.2594 4.51875C13.1819 4.51875 12.2821 5.29407 12.0885 6.31608C11.5325 6.63596 11.1357 7.18941 11.0136 7.8218C10.457 8.14158 10.0599 8.69527 9.93778 9.32803C9.38124 9.64782 8.98411 10.2016 8.862 10.8342C8.30517 11.1541 7.90782 11.7079 7.78571 12.3407C7.22916 12.6606 6.83199 13.2144 6.70988 13.8469C6.15324 14.1668 5.75611 14.7204 5.63405 15.3532C4.95919 15.7409 4.51875 16.4725 4.51875 17.2718C4.51875 18.4901 5.50992 19.4812 6.72816 19.4812H21.7906C23.0088 19.4812 24 18.4901 24 17.2718C24 16.4726 23.5596 15.741 22.8847 15.3532V15.3532Z" />
    <path d="M21.7906 19.4813C23.0088 19.4813 24 18.4901 24 17.2719C24 16.4726 23.5596 15.741 22.8847 15.3532C22.7626 14.7205 22.3655 14.1668 21.8089 13.847C21.6868 13.2144 21.2896 12.6607 20.733 12.3408C20.611 11.708 20.2136 11.1541 19.6568 10.8343C19.5346 10.2016 19.1375 9.64781 18.581 9.32808C18.4589 8.69531 18.0617 8.14163 17.5051 7.82185C17.3831 7.1895 16.9863 6.63605 16.4303 6.31613C16.2367 5.29402 15.3369 4.51875 14.2594 4.51875V19.4813H21.7906Z" />
    <path d="M16.1422 14.209C15.7538 14.209 15.439 13.8946 15.439 13.5062C15.439 13.1181 15.5902 12.7521 15.8647 12.4769C16.1401 12.2014 16.5057 12.05 16.8945 12.05C17.2829 12.05 17.598 12.3648 17.598 12.7531C17.598 13.1415 17.2837 13.4563 16.8953 13.4563C16.8813 13.4563 16.869 13.4613 16.8597 13.4706C16.8508 13.4795 16.8453 13.4925 16.8453 13.5055C16.8453 13.8938 16.5305 14.209 16.1422 14.209Z" />
    <path d="M13.5063 12.7031C13.118 12.7031 12.8032 12.3883 12.8032 12C12.8032 11.9724 12.7807 11.95 12.7531 11.95C12.3648 11.95 12.05 11.6352 12.05 11.2469C12.05 10.8586 12.3648 10.5437 12.7531 10.5437C13.5562 10.5437 14.2094 11.197 14.2094 12C14.2094 12.3883 13.8946 12.7031 13.5063 12.7031Z" />
    <path d="M18.7781 16.845C18.3898 16.845 18.075 16.5305 18.075 16.1422V16.1415C18.075 16.1282 18.0699 16.1158 18.0607 16.1066C18.0514 16.0973 18.039 16.0922 18.0258 16.0922C17.6375 16.0922 17.3223 15.7774 17.3223 15.3891C17.3223 15.0008 17.6367 14.6859 18.025 14.6859C18.4146 14.6859 18.7801 14.8373 19.055 15.1122C19.3298 15.387 19.4813 15.7525 19.4813 16.1415C19.4813 16.5298 19.1664 16.845 18.7781 16.845V16.845Z" />
    <path d="M13.1297 16.845C12.7414 16.845 12.4266 16.5305 12.4266 16.1422V16.1415C12.4266 16.1282 12.4215 16.1158 12.4123 16.1066C12.403 16.0973 12.3906 16.0922 12.3773 16.0922C11.989 16.0922 11.6738 15.7774 11.6738 15.3891C11.6738 15.0008 11.9883 14.6859 12.3766 14.6859C12.7662 14.6859 13.1317 14.8373 13.4066 15.1122C13.6815 15.387 13.8329 15.7525 13.8329 16.1415C13.8328 16.5298 13.518 16.845 13.1297 16.845V16.845Z" />
    <path d="M5.22188 19.4813C4.83357 19.4813 4.51875 19.1664 4.51875 18.7781V16.1418C4.51875 14.8024 5.03218 11.3086 8.61239 9.51844L9.42652 9.11161C9.64449 9.00282 9.90328 9.01454 10.1104 9.14265C10.3177 9.27075 10.4438 9.49707 10.4438 9.74068V14.2594C10.4438 17.1428 8.1105 19.4813 5.22188 19.4813V19.4813Z" />
    <path d="M5.22188 19.4813C2.34253 19.4813 0 17.1387 0 14.2594V11.2469C0 11.0033 0.126094 10.777 0.333328 10.6488C0.540563 10.5207 0.799312 10.509 1.01728 10.6178L1.83136 11.0246C5.41083 12.8145 5.925 16.3073 5.925 17.6481V18.7781C5.925 19.1664 5.61023 19.4813 5.22188 19.4813V19.4813Z" />
  </svg>
);

export default BioChar;
