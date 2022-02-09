import React from 'react'

export default function MHIDotsLogo({ additionalClassNames }: { additionalClassNames?: string }): JSX.Element {
  return (
    <svg className={`mhi-with-text-logo ${additionalClassNames || ''}`} width="132" height="49" viewBox="0 0 132 49" xmlns="http://www.w3.org/2000/svg">
      <circle className="bottom-left" cx="11.2498" cy="34.4704" r="11.25" />
      <circle className="top-right" cx="30.7503" cy="14.9704" r="11.25" />
      <g>
        <g>
          <path
            className="more"
            d="M57.6253 14.6144V3.17181H57.6651L60.1909 14.6144H62.4184L64.9442 3.17181H64.984V14.6144H67.6093V0.281047H63.373L61.3245 10.3987H61.2847L59.2561 0.281047H55V14.6144H57.6253ZM74.1923 14.8352C75.2663 14.8352 76.1215 14.6613 76.7579 14.3133C77.3944 13.9653 77.8816 13.4635 78.2197 12.8077C78.5578 12.1519 78.7766 11.369 78.8761 10.459C78.9755 9.5489 79.0252 8.54516 79.0252 7.44774C79.0252 6.3637 78.9755 5.36331 78.8761 4.44656C78.7766 3.52981 78.5578 2.74355 78.2197 2.08778C77.8816 1.432 77.3944 0.920093 76.7579 0.552056C76.1215 0.184019 75.2663 0 74.1923 0C73.1184 0 72.2632 0.184019 71.6267 0.552056C70.9903 0.920093 70.503 1.432 70.1649 2.08778C69.8268 2.74355 69.6081 3.52981 69.5086 4.44656C69.4092 5.36331 69.3594 6.3637 69.3594 7.44774C69.3594 8.54516 69.4092 9.5489 69.5086 10.459C69.6081 11.369 69.8268 12.1519 70.1649 12.8077C70.503 13.4635 70.9903 13.9653 71.6267 14.3133C72.2632 14.6613 73.1184 14.8352 74.1923 14.8352ZM74.1923 12.7675C73.7681 12.7675 73.4266 12.6705 73.1681 12.4765C72.9095 12.2824 72.7107 11.9746 72.5714 11.553C72.4322 11.1315 72.3394 10.5827 72.293 9.9069C72.2466 9.23104 72.2234 8.41133 72.2234 7.44774C72.2234 6.48415 72.2466 5.66777 72.293 4.99862C72.3394 4.32946 72.4322 3.78075 72.5714 3.35249C72.7107 2.92422 72.9095 2.61306 73.1681 2.41901C73.4266 2.22495 73.7681 2.12792 74.1923 2.12792C74.6166 2.12792 74.958 2.22495 75.2166 2.41901C75.4751 2.61306 75.674 2.92422 75.8132 3.35249C75.9525 3.78075 76.0453 4.32946 76.0917 4.99862C76.1381 5.66777 76.1613 6.48415 76.1613 7.44774C76.1613 8.41133 76.1381 9.23104 76.0917 9.9069C76.0453 10.5827 75.9525 11.1315 75.8132 11.553C75.674 11.9746 75.4751 12.2824 75.2166 12.4765C74.958 12.6705 74.6166 12.7675 74.1923 12.7675ZM83.5797 14.6144V8.55185H85.1111C85.7077 8.55185 86.132 8.71245 86.3839 9.03364C86.6359 9.35484 86.7751 9.79648 86.8016 10.3586L86.8812 13.1088C86.8944 13.3899 86.9209 13.6609 86.9607 13.9218C87.0005 14.1828 87.0933 14.4137 87.2391 14.6144H90.3417V14.494C90.0766 14.3468 89.9042 14.0724 89.8246 13.6709C89.7716 13.2694 89.7318 12.6872 89.7053 11.9244C89.6921 11.5363 89.6788 11.185 89.6655 10.8705C89.6523 10.556 89.6324 10.2649 89.6059 9.99723C89.5263 9.19424 89.3208 8.61207 88.9893 8.25073C88.6579 7.88938 88.1341 7.65518 87.4181 7.54811V7.50796C88.2269 7.33398 88.8236 6.94252 89.2081 6.33359C89.5926 5.72465 89.7849 4.93839 89.7849 3.9748C89.7849 2.73017 89.4534 1.80338 88.7904 1.19445C88.1275 0.585514 87.1994 0.281047 86.0061 0.281047H80.7157V14.6144H83.5797ZM84.773 6.54437H83.5797V2.40897H84.9321C86.258 2.40897 86.9209 3.07144 86.9209 4.39637C86.9209 5.1726 86.7353 5.72465 86.3641 6.05254C85.9928 6.38043 85.4625 6.54437 84.773 6.54437ZM99.9081 14.6144V12.2456H94.6376V8.39125H99.4109V6.02243H94.6376V2.64987H99.7092V0.281047H91.7737V14.6144H99.9081Z"
          />
        </g>
        <g className="flipOutX">
          <path d="M6.22251 0.143639C6.29229 0.143639 6.34937 0.169175 6.39378 0.220246C6.44452 0.271318 6.46989 0.331965 6.46989 0.402189V10.7921C6.46989 11.8007 6.1464 12.6147 5.49941 13.2339C4.89682 13.7446 4.142 14 3.23495 14C2.30886 14 1.55721 13.7446 0.979998 13.2339C0.326666 12.6338 0 11.8199 0 10.7921V8.61833C0 8.54811 0.0253721 8.49065 0.0761164 8.44596C0.126861 8.39489 0.187119 8.36936 0.256893 8.36936H1.97903C2.0488 8.36936 2.10906 8.39489 2.1598 8.44596C2.21055 8.49065 2.23592 8.54811 2.23592 8.61833V10.7921C2.23592 11.2262 2.31521 11.5135 2.47378 11.6539C2.62601 11.788 2.87974 11.855 3.23495 11.855C3.57747 11.855 3.82485 11.788 3.97708 11.6539C4.15469 11.4943 4.24349 11.207 4.24349 10.7921V0.402189C4.24349 0.331965 4.26569 0.271318 4.31009 0.220246C4.36083 0.169175 4.42109 0.143639 4.49087 0.143639H6.22251Z"/>
          <path d="M13.5194 0.766074C14.1727 1.36617 14.4994 2.18331 14.4994 3.21751V10.7921C14.4994 11.8199 14.1727 12.6338 13.5194 13.2339C12.9422 13.7446 12.1905 14 11.2645 14C10.332 14 9.57722 13.7446 9 13.2339C8.35301 12.6402 8.02952 11.8263 8.02952 10.7921V3.21751C8.02952 2.17693 8.35301 1.35978 9 0.766074C9.57722 0.255358 10.332 0 11.2645 0C12.1905 0 12.9422 0.255358 13.5194 0.766074ZM12.2635 10.7921V3.21751C12.2635 2.77702 12.1779 2.48655 12.0066 2.3461C11.8671 2.21204 11.6197 2.14501 11.2645 2.14501C10.9219 2.14501 10.6746 2.21204 10.5223 2.3461C10.3447 2.5057 10.2559 2.79617 10.2559 3.21751V10.7921C10.2559 11.207 10.3447 11.4943 10.5223 11.6539C10.6746 11.788 10.9219 11.855 11.2645 11.855C11.607 11.855 11.8512 11.788 11.9971 11.6539C12.1747 11.5135 12.2635 11.2262 12.2635 10.7921Z"/>
          <path d="M18.0951 0.143639C18.1649 0.143639 18.222 0.169175 18.2664 0.220246C18.3172 0.271318 18.3425 0.331965 18.3425 0.402189V13.5978C18.3425 13.668 18.3172 13.7287 18.2664 13.7798C18.222 13.8308 18.1649 13.8564 18.0951 13.8564H16.3635C16.2937 13.8564 16.2335 13.8308 16.1827 13.7798C16.1383 13.7287 16.1161 13.668 16.1161 13.5978V0.402189C16.1161 0.331965 16.1383 0.271318 16.1827 0.220246C16.2335 0.169175 16.2937 0.143639 16.3635 0.143639H18.0951Z"/>
          <path d="M26.7526 0.143639C26.8224 0.143639 26.8795 0.169175 26.9239 0.220246C26.9746 0.271318 27 0.331965 27 0.402189V13.5978C27 13.668 26.9746 13.7287 26.9239 13.7798C26.8795 13.8308 26.8224 13.8564 26.7526 13.8564H25.8297C25.7346 13.8564 25.6616 13.8117 25.6109 13.7223L22.5567 7.77565C22.525 7.71819 22.4774 7.69904 22.414 7.71819C22.3506 7.73096 22.3188 7.76927 22.3188 7.83311V13.5978C22.3188 13.668 22.2935 13.7287 22.2427 13.7798C22.1983 13.8308 22.1412 13.8564 22.0715 13.8564H20.3398C20.27 13.8564 20.2098 13.8308 20.159 13.7798C20.1146 13.7287 20.0924 13.668 20.0924 13.5978V0.402189C20.0924 0.331965 20.1146 0.271318 20.159 0.220246C20.2098 0.169175 20.27 0.143639 20.3398 0.143639H21.2627C21.3706 0.143639 21.4467 0.191518 21.4911 0.287278L24.5357 6.4446C24.5548 6.4829 24.5833 6.50844 24.6214 6.5212C24.6594 6.52759 24.6943 6.51801 24.726 6.49248C24.7577 6.46694 24.7736 6.43183 24.7736 6.38714V0.402189C24.7736 0.331965 24.799 0.271318 24.8497 0.220246C24.9005 0.169175 24.9607 0.143639 25.0305 0.143639H26.7526Z"/>
        </g>

        <g className="flipOutXGlobal">
          <path d="M4.31316 5.42955C4.24615 5.42955 4.18827 5.4072 4.13954 5.36252C4.0908 5.31145 4.06643 5.2508 4.06643 5.18057V3.21751C4.06643 2.7834 3.98724 2.49293 3.82884 2.3461C3.68263 2.21204 3.442 2.14501 3.10694 2.14501C2.77797 2.14501 2.54038 2.21204 2.39417 2.3461C2.22359 2.5057 2.1383 2.79617 2.1383 3.21751V10.7921C2.1383 11.207 2.22359 11.4943 2.39417 11.6539C2.54038 11.788 2.77797 11.855 3.10694 11.855C3.442 11.855 3.68263 11.788 3.82884 11.6539C3.98724 11.5071 4.06643 11.2198 4.06643 10.7921V8.96306C4.06643 8.89284 4.04206 8.83219 3.99333 8.78112C3.95068 8.73005 3.89585 8.70451 3.82884 8.70451H3.29884C3.23182 8.70451 3.17395 8.68217 3.12521 8.63748C3.08257 8.58641 3.06125 8.52576 3.06125 8.45554V6.81806C3.06125 6.74783 3.08257 6.69038 3.12521 6.64569C3.17395 6.59462 3.23182 6.56908 3.29884 6.56908H5.96715C6.03416 6.56908 6.09203 6.59462 6.14077 6.64569C6.1895 6.69038 6.21387 6.74783 6.21387 6.81806V10.7921C6.21387 11.8199 5.90013 12.6338 5.27265 13.2339C4.71828 13.7446 3.99637 14 3.10694 14C2.22968 14 1.50473 13.7446 0.932081 13.2339C0.310694 12.6147 0 11.8007 0 10.7921V3.21751C0 2.20246 0.310694 1.38532 0.932081 0.766074C1.51082 0.255358 2.23578 0 3.10694 0C3.99637 0 4.71828 0.255358 5.27265 0.766074C5.90013 1.36617 6.21387 2.18331 6.21387 3.21751V5.18057C6.21387 5.2508 6.1895 5.31145 6.14077 5.36252C6.09203 5.4072 6.03416 5.42955 5.96715 5.42955H4.31316Z" fill="#FA759E"/>
          <path d="M13.2129 11.7114C13.2799 11.7114 13.3347 11.7369 13.3774 11.788C13.4261 11.839 13.4505 11.8997 13.4505 11.9699V13.5978C13.4505 13.668 13.4261 13.7287 13.3774 13.7798C13.3347 13.8308 13.2799 13.8564 13.2129 13.8564H8.0042C7.93719 13.8564 7.87931 13.8308 7.83058 13.7798C7.78793 13.7287 7.76661 13.668 7.76661 13.5978V0.402189C7.76661 0.331965 7.78793 0.271318 7.83058 0.220246C7.87931 0.169175 7.93719 0.143639 8.0042 0.143639H9.66732C9.73434 0.143639 9.78916 0.169175 9.83181 0.220246C9.88054 0.271318 9.90491 0.331965 9.90491 0.402189V11.4528C9.90491 11.523 9.92928 11.5837 9.97802 11.6347C10.0268 11.6858 10.0846 11.7114 10.1516 11.7114H13.2129Z" fill="#FA759E"/>
          <path d="M19.4169 0.766074C20.0444 1.36617 20.3581 2.18331 20.3581 3.21751V10.7921C20.3581 11.8199 20.0444 12.6338 19.4169 13.2339C18.8625 13.7446 18.1406 14 17.2512 14C16.3556 14 15.6307 13.7446 15.0763 13.2339C14.4549 12.6402 14.1442 11.8263 14.1442 10.7921V3.21751C14.1442 2.17693 14.4549 1.35978 15.0763 0.766074C15.6307 0.255358 16.3556 0 17.2512 0C18.1406 0 18.8625 0.255358 19.4169 0.766074ZM18.2107 10.7921V3.21751C18.2107 2.77702 18.1284 2.48655 17.9639 2.3461C17.8299 2.21204 17.5923 2.14501 17.2512 2.14501C16.9222 2.14501 16.6846 2.21204 16.5384 2.3461C16.3678 2.5057 16.2825 2.79617 16.2825 3.21751V10.7921C16.2825 11.207 16.3678 11.4943 16.5384 11.6539C16.6846 11.788 16.9222 11.855 17.2512 11.855C17.5801 11.855 17.8147 11.788 17.9548 11.6539C18.1254 11.5135 18.2107 11.2262 18.2107 10.7921Z" fill="#FA759E"/>
          <path d="M27.5764 7.13406C28.1004 7.62563 28.3623 8.34382 28.3623 9.28865V10.7155C28.3623 11.2645 28.2831 11.7177 28.1247 12.0752C27.9785 12.4902 27.7409 12.8413 27.412 13.1286C26.888 13.6138 26.1692 13.8564 25.2554 13.8564H22.1484C22.0814 13.8564 22.0235 13.8308 21.9748 13.7798C21.9322 13.7287 21.9108 13.668 21.9108 13.5978V0.402189C21.9108 0.331965 21.9322 0.271318 21.9748 0.220246C22.0235 0.169175 22.0814 0.143639 22.1484 0.143639H24.7436C25.2066 0.143639 25.6544 0.207478 26.0869 0.335157C26.5256 0.456452 26.8759 0.635203 27.1378 0.871409C27.4668 1.15869 27.7044 1.5098 27.8506 1.92476C28.009 2.30141 28.0882 2.76106 28.0882 3.30369V5.00821C28.0882 5.74875 27.9115 6.34245 27.5582 6.78933C27.4607 6.91701 27.4668 7.03192 27.5764 7.13406ZM24.0491 2.5472V5.82216C24.0491 5.89239 24.0735 5.95303 24.1223 6.0041C24.171 6.04879 24.2289 6.07114 24.2959 6.07114H24.7436C25.231 6.07114 25.5478 6.0041 25.694 5.87004C25.8646 5.69129 25.9499 5.40401 25.9499 5.00821V3.30369C25.9499 2.9015 25.8707 2.6238 25.7123 2.47059C25.5904 2.34929 25.2676 2.28865 24.7436 2.28865H24.2959C24.2289 2.28865 24.171 2.31418 24.1223 2.36525C24.0735 2.41632 24.0491 2.47697 24.0491 2.5472ZM26.224 10.7155V9.28865C26.224 8.8673 26.1387 8.57684 25.9681 8.41724C25.8219 8.28317 25.5843 8.21614 25.2554 8.21614H24.2959C24.2289 8.21614 24.171 8.24168 24.1223 8.29275C24.0735 8.34382 24.0491 8.40447 24.0491 8.47469V11.4528C24.0491 11.523 24.0735 11.5837 24.1223 11.6347C24.171 11.6858 24.2289 11.7114 24.2959 11.7114H25.2554C25.6087 11.7114 25.8524 11.6507 25.9864 11.5294C26.1448 11.3826 26.224 11.1113 26.224 10.7155Z" fill="#FA759E"/>
          <path d="M33.8079 0.354309L36.3117 13.5499C36.3239 13.6265 36.3056 13.6968 36.2569 13.7606C36.2142 13.8244 36.1533 13.8564 36.0741 13.8564H34.3927C34.3318 13.8564 34.2769 13.8372 34.2282 13.7989C34.1795 13.7606 34.1521 13.7095 34.146 13.6457L33.8535 11.7784C33.8353 11.6379 33.7561 11.5677 33.616 11.5677H31.8158C31.6756 11.5677 31.5964 11.6379 31.5782 11.7784L31.2766 13.6457C31.2583 13.7861 31.1791 13.8564 31.039 13.8564H29.3576C29.2784 13.8564 29.2145 13.8244 29.1657 13.7606C29.1231 13.6968 29.1079 13.6265 29.12 13.5499L31.6147 0.354309C31.6391 0.213862 31.7183 0.143639 31.8523 0.143639H33.5703C33.7043 0.143639 33.7835 0.213862 33.8079 0.354309ZM33.1591 9.42271C33.2322 9.42271 33.2931 9.39398 33.3418 9.33652C33.3905 9.27269 33.4088 9.20246 33.3966 9.12585L32.8301 5.50616C32.824 5.43593 32.7844 5.40082 32.7113 5.40082C32.6382 5.40082 32.5986 5.43593 32.5925 5.50616L32.0259 9.12585C32.0138 9.20246 32.032 9.27269 32.0808 9.33652C32.1295 9.39398 32.1904 9.42271 32.2635 9.42271H33.1591Z" fill="#FA759E"/>
          <path d="M42.7624 11.7114C42.8294 11.7114 42.8843 11.7369 42.9269 11.788C42.9756 11.839 43 11.8997 43 11.9699V13.5978C43 13.668 42.9756 13.7287 42.9269 13.7798C42.8843 13.8308 42.8294 13.8564 42.7624 13.8564H37.5537C37.4867 13.8564 37.4288 13.8308 37.3801 13.7798C37.3375 13.7287 37.3161 13.668 37.3161 13.5978V0.402189C37.3161 0.331965 37.3375 0.271318 37.3801 0.220246C37.4288 0.169175 37.4867 0.143639 37.5537 0.143639H39.2168C39.2839 0.143639 39.3387 0.169175 39.3813 0.220246C39.4301 0.271318 39.4544 0.331965 39.4544 0.402189V11.4528C39.4544 11.523 39.4788 11.5837 39.5275 11.6347C39.5763 11.6858 39.6342 11.7114 39.7012 11.7114H42.7624Z" fill="#FA759E"/>
      </g>
        <g className="flipOutXCommunity">
          <path d="M4.54523 5.42955C4.47461 5.42955 4.41362 5.4072 4.36227 5.36252C4.31091 5.31145 4.28523 5.2508 4.28523 5.18057V3.21751C4.28523 2.7834 4.20177 2.49293 4.03485 2.3461C3.88078 2.21204 3.6272 2.14501 3.27411 2.14501C2.92744 2.14501 2.67706 2.21204 2.52299 2.3461C2.34323 2.5057 2.25336 2.79617 2.25336 3.21751V10.7921C2.25336 11.207 2.34323 11.4943 2.52299 11.6539C2.67706 11.788 2.92744 11.855 3.27411 11.855C3.6272 11.855 3.88078 11.788 4.03485 11.6539C4.20177 11.5071 4.28523 11.2198 4.28523 10.7921V8.81943C4.28523 8.7492 4.31091 8.69175 4.36227 8.64706C4.41362 8.59599 4.47461 8.57045 4.54523 8.57045H6.28821C6.35883 8.57045 6.41982 8.59599 6.47118 8.64706C6.52253 8.69175 6.54821 8.7492 6.54821 8.81943V10.7921C6.54821 11.8199 6.21759 12.6338 5.55635 13.2339C4.97215 13.7446 4.2114 14 3.27411 14C2.34965 14 1.58569 13.7446 0.982232 13.2339C0.327411 12.6147 0 11.8007 0 10.7921V3.21751C0 2.20246 0.327411 1.38532 0.982232 0.766074C1.59211 0.255358 2.35607 0 3.27411 0C4.2114 0 4.97215 0.255358 5.55635 0.766074C6.21759 1.36617 6.54821 2.18331 6.54821 3.21751V5.18057C6.54821 5.2508 6.52253 5.31145 6.47118 5.36252C6.41982 5.4072 6.35883 5.42955 6.28821 5.42955H4.54523Z" fill="#164176"/>
          <path d="M13.4905 0.766074C14.1517 1.36617 14.4823 2.18331 14.4823 3.21751V10.7921C14.4823 11.8199 14.1517 12.6338 13.4905 13.2339C12.9063 13.7446 12.1455 14 11.2082 14C10.2645 14 9.50056 13.7446 8.91636 13.2339C8.26153 12.6402 7.93412 11.8263 7.93412 10.7921V3.21751C7.93412 2.17693 8.26153 1.35978 8.91636 0.766074C9.50056 0.255358 10.2645 0 11.2082 0C12.1455 0 12.9063 0.255358 13.4905 0.766074ZM12.2194 10.7921V3.21751C12.2194 2.77702 12.1327 2.48655 11.9593 2.3461C11.8181 2.21204 11.5677 2.14501 11.2082 2.14501C10.8616 2.14501 10.6112 2.21204 10.4571 2.3461C10.2774 2.5057 10.1875 2.79617 10.1875 3.21751V10.7921C10.1875 11.207 10.2774 11.4943 10.4571 11.6539C10.6112 11.788 10.8616 11.855 11.2082 11.855C11.5549 11.855 11.8021 11.788 11.9497 11.6539C12.1295 11.5135 12.2194 11.2262 12.2194 10.7921Z" fill="#164176"/>
          <path d="M25.4306 0.143639C25.5012 0.143639 25.5622 0.169175 25.6135 0.220246C25.6649 0.271318 25.6906 0.331965 25.6906 0.402189V13.5978C25.6906 13.668 25.6649 13.7287 25.6135 13.7798C25.5622 13.8308 25.5012 13.8564 25.4306 13.8564H23.6876C23.617 13.8564 23.556 13.8308 23.5046 13.7798C23.4533 13.7287 23.4276 13.668 23.4276 13.5978V8.30233C23.4276 8.2321 23.3923 8.19061 23.3217 8.17784C23.2575 8.15869 23.2125 8.18103 23.1868 8.24487L21.6365 11.4432C21.5915 11.539 21.5145 11.5869 21.4053 11.5869H20.4038C20.2947 11.5869 20.2177 11.539 20.1727 11.4432L18.6223 8.24487C18.5967 8.18103 18.5485 8.15869 18.4779 8.17784C18.4073 8.19061 18.372 8.2321 18.372 8.30233V13.5978C18.372 13.668 18.3463 13.7287 18.2949 13.7798C18.25 13.8308 18.1922 13.8564 18.1216 13.8564H16.369C16.2984 13.8564 16.2374 13.8308 16.186 13.7798C16.1411 13.7287 16.1186 13.668 16.1186 13.5978V0.402189C16.1186 0.331965 16.1411 0.271318 16.186 0.220246C16.2374 0.169175 16.2984 0.143639 16.369 0.143639H17.2838C17.393 0.143639 17.47 0.19471 17.5149 0.296854L20.789 7.41176C20.8147 7.45645 20.8532 7.4788 20.9046 7.4788C20.956 7.4788 20.9945 7.45645 21.0201 7.41176L24.2943 0.296854C24.3392 0.19471 24.4162 0.143639 24.5254 0.143639H25.4306Z" fill="#164176"/>
          <path d="M36.7736 0.143639C36.8442 0.143639 36.9052 0.169175 36.9566 0.220246C37.0079 0.271318 37.0336 0.331965 37.0336 0.402189V13.5978C37.0336 13.668 37.0079 13.7287 36.9566 13.7798C36.9052 13.8308 36.8442 13.8564 36.7736 13.8564H35.0306C34.96 13.8564 34.899 13.8308 34.8477 13.7798C34.7963 13.7287 34.7706 13.668 34.7706 13.5978V8.30233C34.7706 8.2321 34.7353 8.19061 34.6647 8.17784C34.6005 8.15869 34.5556 8.18103 34.5299 8.24487L32.9795 11.4432C32.9346 11.539 32.8575 11.5869 32.7484 11.5869H31.7469C31.6378 11.5869 31.5607 11.539 31.5158 11.4432L29.9654 8.24487C29.9397 8.18103 29.8916 8.15869 29.8209 8.17784C29.7503 8.19061 29.715 8.2321 29.715 8.30233V13.5978C29.715 13.668 29.6893 13.7287 29.638 13.7798C29.593 13.8308 29.5353 13.8564 29.4646 13.8564H27.712C27.6414 13.8564 27.5804 13.8308 27.5291 13.7798C27.4841 13.7287 27.4617 13.668 27.4617 13.5978V0.402189C27.4617 0.331965 27.4841 0.271318 27.5291 0.220246C27.5804 0.169175 27.6414 0.143639 27.712 0.143639H28.6269C28.736 0.143639 28.813 0.19471 28.858 0.296854L32.1321 7.41176C32.1578 7.45645 32.1963 7.4788 32.2476 7.4788C32.299 7.4788 32.3375 7.45645 32.3632 7.41176L35.6373 0.296854C35.6822 0.19471 35.7593 0.143639 35.8684 0.143639H36.7736Z" fill="#164176"/>
          <path d="M45.0351 0.143639C45.1058 0.143639 45.1668 0.169175 45.2181 0.220246C45.2695 0.271318 45.2951 0.331965 45.2951 0.402189V10.7921C45.2951 11.7943 44.9645 12.6083 44.3033 13.2339C43.6934 13.7446 42.9327 14 42.021 14C41.0773 14 40.3134 13.7446 39.7292 13.2339C39.0743 12.6402 38.7469 11.8263 38.7469 10.7921V0.402189C38.7469 0.331965 38.7694 0.271318 38.8143 0.220246C38.8657 0.169175 38.9267 0.143639 38.9973 0.143639H40.7499C40.8205 0.143639 40.8783 0.169175 40.9233 0.220246C40.9746 0.271318 41.0003 0.331965 41.0003 0.402189V10.7921C41.0003 11.2198 41.0837 11.5071 41.2507 11.6539C41.4047 11.788 41.6615 11.855 42.021 11.855C42.3677 11.855 42.6181 11.788 42.7722 11.6539C42.9455 11.5007 43.0322 11.2134 43.0322 10.7921V0.402189C43.0322 0.331965 43.0578 0.271318 43.1092 0.220246C43.1606 0.169175 43.2215 0.143639 43.2922 0.143639H45.0351Z" fill="#164176"/>
          <path d="M53.73 0.143639C53.8006 0.143639 53.8584 0.169175 53.9034 0.220246C53.9547 0.271318 53.9804 0.331965 53.9804 0.402189V13.5978C53.9804 13.668 53.9547 13.7287 53.9034 13.7798C53.8584 13.8308 53.8006 13.8564 53.73 13.8564H52.7959C52.6996 13.8564 52.6258 13.8117 52.5744 13.7223L49.4833 7.77565C49.4512 7.71819 49.4031 7.69904 49.3389 7.71819C49.2747 7.73096 49.2426 7.76927 49.2426 7.83311V13.5978C49.2426 13.668 49.2169 13.7287 49.1655 13.7798C49.1206 13.8308 49.0628 13.8564 48.9922 13.8564H47.2396C47.169 13.8564 47.108 13.8308 47.0566 13.7798C47.0117 13.7287 46.9892 13.668 46.9892 13.5978V0.402189C46.9892 0.331965 47.0117 0.271318 47.0566 0.220246C47.108 0.169175 47.169 0.143639 47.2396 0.143639H48.1737C48.2828 0.143639 48.3598 0.191518 48.4048 0.287278L51.4863 6.4446C51.5056 6.4829 51.5344 6.50844 51.573 6.5212C51.6115 6.52759 51.6468 6.51801 51.6789 6.49248C51.711 6.46694 51.727 6.43183 51.727 6.38714V0.402189C51.727 0.331965 51.7527 0.271318 51.8041 0.220246C51.8554 0.169175 51.9164 0.143639 51.987 0.143639H53.73Z" fill="#164176"/>
          <path d="M57.7352 0.143639C57.8058 0.143639 57.8636 0.169175 57.9085 0.220246C57.9599 0.271318 57.9856 0.331965 57.9856 0.402189V13.5978C57.9856 13.668 57.9599 13.7287 57.9085 13.7798C57.8636 13.8308 57.8058 13.8564 57.7352 13.8564H55.9826C55.912 13.8564 55.851 13.8308 55.7996 13.7798C55.7547 13.7287 55.7322 13.668 55.7322 13.5978V0.402189C55.7322 0.331965 55.7547 0.271318 55.7996 0.220246C55.851 0.169175 55.912 0.143639 55.9826 0.143639H57.7352Z" fill="#164176"/>
          <path d="M65.2553 0.143639C65.3259 0.143639 65.3869 0.169175 65.4382 0.220246C65.4896 0.271318 65.5153 0.331965 65.5153 0.402189V2.03967C65.5153 2.10989 65.4896 2.17054 65.4382 2.22161C65.3869 2.2663 65.3259 2.28865 65.2553 2.28865H63.6086C63.5379 2.28865 63.477 2.31418 63.4256 2.36525C63.3742 2.41632 63.3486 2.47697 63.3486 2.5472V13.5978C63.3486 13.668 63.3229 13.7287 63.2715 13.7798C63.2202 13.8308 63.1592 13.8564 63.0886 13.8564H61.3456C61.275 13.8564 61.214 13.8308 61.1626 13.7798C61.1177 13.7287 61.0952 13.668 61.0952 13.5978V2.5472C61.0952 2.47697 61.0695 2.41632 61.0182 2.36525C60.9668 2.31418 60.9058 2.28865 60.8352 2.28865H59.1789C59.1083 2.28865 59.0473 2.2663 58.9959 2.22161C58.951 2.17054 58.9285 2.10989 58.9285 2.03967V0.402189C58.9285 0.331965 58.951 0.271318 58.9959 0.220246C59.0473 0.169175 59.1083 0.143639 59.1789 0.143639H65.2553Z" fill="#164176"/>
          <path d="M72.7464 0.143639C72.8299 0.143639 72.8973 0.178751 72.9486 0.248974C73 0.312813 73.0128 0.386229 72.9872 0.46922L70.4449 9.01094C70.4385 9.02371 70.4353 9.04606 70.4353 9.07798V13.5978C70.4353 13.668 70.4096 13.7287 70.3582 13.7798C70.3069 13.8308 70.2459 13.8564 70.1753 13.8564H68.413C68.3424 13.8564 68.2814 13.8308 68.2301 13.7798C68.1787 13.7287 68.153 13.668 68.153 13.5978V9.07798C68.153 9.04606 68.1498 9.02371 68.1434 9.01094L65.6204 0.46922C65.5947 0.386229 65.6076 0.312813 65.6589 0.248974C65.7103 0.178751 65.7777 0.143639 65.8612 0.143639H67.7101C67.8385 0.143639 67.9187 0.207478 67.9508 0.335157L69.1642 4.66347C69.1834 4.72731 69.2252 4.75923 69.2893 4.75923C69.3535 4.75923 69.3953 4.72731 69.4145 4.66347L70.6568 0.325581C70.6889 0.204286 70.7691 0.143639 70.8975 0.143639H72.7464Z" fill="#164176"/>
        </g>
      </g>
      <path
        className="human"
        d="M57.8689 31.5752V25.3203H61.216V31.5752H64.0849V17.4868H61.216V22.8735H57.8689V17.4868H55V31.5752H57.8689ZM70.4404 31.7922C71.0248 31.7922 71.5893 31.733 72.1338 31.6147C72.6784 31.4963 73.1632 31.2661 73.5882 30.9241C74.0133 30.582 74.3519 30.1183 74.6043 29.533C74.8567 28.9476 74.9828 28.2077 74.9828 27.3132V17.4868H72.1139V27.3132C72.1139 27.6683 72.0907 27.9939 72.0442 28.2899C71.9977 28.5859 71.9114 28.8424 71.7852 29.0594C71.659 29.2765 71.4897 29.4475 71.2772 29.5724C71.0646 29.6974 70.7857 29.7599 70.4404 29.7599C70.1083 29.7599 69.8327 29.6974 69.6136 29.5724C69.3944 29.4475 69.2218 29.2765 69.0956 29.0594C68.9694 28.8424 68.8831 28.5859 68.8366 28.2899C68.7901 27.9939 68.7668 27.6683 68.7668 27.3132V17.4868H65.8979V27.3132C65.8979 28.2603 66.0241 29.0298 66.2765 29.6218C66.5288 30.2137 66.8675 30.6708 67.2925 30.9931C67.7176 31.3154 68.2024 31.5292 68.7469 31.6344C69.2915 31.7396 69.856 31.7922 70.4404 31.7922ZM79.4855 31.5752V20.3282H79.5253L82.0555 31.5752H84.2869L86.8172 20.3282H86.857V31.5752H89.4868V17.4868H85.2432L83.1912 27.4316H83.1513L81.1192 17.4868H76.8556V31.5752H79.4855ZM93.5312 31.5752L94.1887 28.5957H97.9741L98.6315 31.5752H101.62L97.8545 17.4868H94.3082L90.5428 31.5752H93.5312ZM97.476 26.2674H94.6868L96.0615 19.9335H96.1013L97.476 26.2674ZM105.246 31.5752V21.7094H105.286L108.792 31.5752H112.06V17.4868H109.43V27.1356H109.39L105.923 17.4868H102.616V31.5752H105.246Z"
      />
      <path
        className="internet"
        d="M58.3801 48.7493V34.4438H55.5283V48.7493H58.3801ZM63.1132 48.7493V38.7315H63.1528L66.6382 48.7493H69.8861V34.4438H67.272V44.2413H67.2324L63.7865 34.4438H60.4991V48.7493H63.1132ZM77.055 48.7493V36.808H80.1444V34.4438H71.1139V36.808H74.2033V48.7493H77.055ZM89.472 48.7493V46.3851H84.224V42.5382H88.9769V40.174H84.224V36.808H89.2739V34.4438H81.3722V48.7493H89.472ZM93.7496 48.7493V42.6985H95.2745C95.8686 42.6985 96.2911 42.8588 96.5419 43.1794C96.7928 43.4999 96.9314 43.9407 96.9578 44.5017L97.037 47.2466C97.0502 47.5271 97.0766 47.7976 97.1162 48.058C97.1558 48.3185 97.2483 48.5489 97.3935 48.7493H100.483V48.6291C100.219 48.4821 100.047 48.2083 99.968 47.8076C99.9152 47.4069 99.8756 46.8258 99.8492 46.0645C99.836 45.6771 99.8228 45.3265 99.8096 45.0126C99.7964 44.6987 99.7765 44.4082 99.7501 44.1411C99.6709 43.3397 99.4663 42.7586 99.1362 42.398C98.8062 42.0373 98.2847 41.8036 97.5717 41.6967V41.6567C98.3771 41.483 98.9712 41.0923 99.3541 40.4846C99.7369 39.8768 99.9284 39.0921 99.9284 38.1304C99.9284 36.8882 99.5983 35.9632 98.9382 35.3555C98.2781 34.7477 97.3539 34.4438 96.1657 34.4438H90.8979V48.7493H93.7496ZM94.9378 40.695H93.7496V36.5676H95.0963C96.4165 36.5676 97.0766 37.2288 97.0766 38.5511C97.0766 39.3259 96.8918 39.8768 96.5221 40.2041C96.1525 40.5313 95.6244 40.695 94.9378 40.695ZM104.523 48.7493V38.7315H104.562L108.048 48.7493H111.296V34.4438H108.682V44.2413H108.642L105.196 34.4438H101.909V48.7493H104.523ZM121.376 48.7493V46.3851H116.128V42.5382H120.881V40.174H116.128V36.808H121.178V34.4438H113.276V48.7493H121.376ZM127.99 48.7493V36.808H131.08V34.4438H122.049V36.808H125.139V48.7493H127.99Z"
      />
    </svg>
  )
}
