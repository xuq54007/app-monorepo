let isInjected = false
import { h, render } from 'preact';
import { useMemo, useState, useEffect, useRef } from 'preact/hooks';

const logoStyle = {
  width: "28px",
  height: "28px",
};

const textStyle = {
  color: "rgba(0, 0, 0, 0.61)",
  fontSize: "13px",
  marginLeft: "8px",
};

const containerId = 'onekey-floating-widget';

const useOutsideClick = (ref: any, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);
};


function CloseDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef()
  useOutsideClick(dialogRef, onClose)
  return h(
    "div",
    {
      style: {
        background: "rgba(255, 255, 255, 1)",
        padding: "14px",
        position: "absolute",
        right: "134px",
        border: "1px rgba(0, 0, 0, 0.13) solid",
        top: "60px",
        width: "170px",
        borderRadius: "15px",
      },
      ref: dialogRef,
    },
    [
      h(
        "div",
        {
          style: {
            color: "rgba(0, 0, 0, 1)",
            fontSize: "12px",
            fontWeight: "400",
          },
        },
        "Hide on this site"
      ),
      h(
        "div",
        {
          style: {
            marginTop: "4px",
            marginBottom: "8px",
            color: "rgba(0, 0, 0, 1)",
            fontSize: "12px",
            fontWeight: "400",
          },
        },
        "Disable"
      ),
      h(
        "div",
        {
          style: {
            color: "rgb(156, 156, 156)",
            fontSize: "10px",
            fontWeight: "400",
          },
        },
        "Can be re-enabled in settings."
      ),
    ]
  );
}

function IconButton({ isExpanded, onClick }: { isExpanded: boolean, onClick: () => void }) {
  const [showCloseButton, setIsShowCloseButton] = useState(false);
  const [showCloseDialog, setIsShowCloseDialog] = useState(false);
  return [
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          width: "184px",
          position: "relative",
          cursor: "pointer",
          padding: "8px",
        },
        onMouseEnter: () => {
          if (isExpanded || showCloseDialog) {
            return;
          }
          setIsShowCloseButton(true)
        },
        onMouseLeave: () => setIsShowCloseButton(false),
        onClick: () => {
          if (showCloseDialog) {
            return;
          }
          onClick();
        },
      },
      [
        h("img", {
          src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
          style: logoStyle,
        }),
        h(
          "span",
          {
            style: textStyle,
          },
          "Fetching dApp info..."
        ),
        h("div", {
          style: {
            position: "absolute",
            left: "0px",
            bottom: "-10px",
            opacity: showCloseButton ? 1 : 0,
          },
          children: h(
            "svg",
            {
              width: "15",
              height: "15",
              viewBox: "0 0 15 15",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            [
              h("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5ZM0.25 6.5C0.25 3.04822 3.04822 0.25 6.5 0.25C9.95178 0.25 12.75 3.04822 12.75 6.5C12.75 9.95178 9.95178 12.75 6.5 12.75C3.04822 12.75 0.25 9.95178 0.25 6.5ZM4.18306 4.18306C4.42714 3.93898 4.82286 3.93898 5.06694 4.18306L6.5 5.61612L7.93306 4.18306C8.17714 3.93898 8.57286 3.93898 8.81694 4.18306C9.06102 4.42714 9.06102 4.82286 8.81694 5.06694L7.38388 6.5L8.81694 7.93306C9.06102 8.17714 9.06102 8.57286 8.81694 8.81694C8.57286 9.06102 8.17714 9.06102 7.93306 8.81694L6.5 7.38388L5.06694 8.81694C4.82286 9.06102 4.42714 9.06102 4.18306 8.81694C3.93898 8.57286 3.93898 8.17714 4.18306 7.93306L5.61612 6.5L4.18306 5.06694C3.93898 4.82286 3.93898 4.42714 4.18306 4.18306Z",
                fill: "#C8C8C8",
              }),
            ]
          ),
          onClick: (event: MouseEvent) => {
            event.stopPropagation();
            setIsShowCloseButton(false);
            setIsShowCloseDialog(true);
          },
        }),
        !isExpanded && showCloseDialog ? h(CloseDialog, { onClose: () => { setIsShowCloseDialog(false); } }) : null,
      ]
    ),
  ];
}

function SecurityInfoRow({ title, children }: { title: string, children: any }) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 8px",
      },
    },
    [
      h(
        "span",
        {
          style: {
            color: "rgba(0, 0, 0, 0.61)",
            fontWeight: "500",
            fontSize: "11.2px",
          },
        },
        title
      ),
      children,
    ]
  );
}

function SecurityInfo({ securityInfo, onClose }: { securityInfo: {}, onClose: () => void }) {
  const viewRef = useRef()
  useOutsideClick(viewRef, onClose);
  return h(
    "div",
    {
      ref: viewRef,
      style: {
        display: "flex",
        flexDirection: "column",
        width: "234px",
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        paddingTop: "8px",
      },
    },
    [
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          },
        },
        [
          h(
            "div",
            {
              style: {
                padding: "0 8px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            },
            [
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                    color: "rgba(0, 0, 0, 0.88)",
                    fontSize: "13px",
                    fontWeight: "500",
                  },
                },
                [
                  h("img", {
                    src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
                    style: {
                      height: "24px",
                      width: "24px",
                    },
                  }),
                  "Uniswap",
                ]
              ),
              h(
                "div",
                {
                  width: "24",
                  height: "24",
                  cursor: "pointer",
                },
                h(
                  "svg",
                  {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                  },
                  [
                    h("path", {
                      "fill-rule": "evenodd",
                      "clip-rule": "evenodd",
                      d: "M7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z",
                      fill: "#BABABA",
                    }),
                  ]
                )
              ),
            ]
          ),
          h("div", {
            style: {
              background: "rgba(0, 0, 0, 0.13)",
              height: "0.33px",
              width: "100%",
            },
          }),
          h(SecurityInfoRow, {
            title: "Dapp listed by",
            children: [
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                  },
                },
                [
                  h("img", {
                    src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
                    style: {
                      width: "16px",
                      height: "16px",
                    },
                  }),
                  h("img", {
                    src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
                    style: {
                      width: "16px",
                      height: "16px",
                    },
                  }),
                  h("img", {
                    src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
                    style: {
                      width: "16px",
                      height: "16px",
                    },
                  }),
                ]
              ),
            ],
          }),
          h(SecurityInfoRow, {
            title: "Risk Detection",
            children: [
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "3.2px",
                  },
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        color: "rgba(0, 0, 0, 0.88)",
                        fontWeight: "500",
                        fontSize: "11.2px",
                      },
                    },
                    "Verified"
                  ),
                  h(
                    "svg",
                    {
                      width: "13",
                      height: "14",
                      viewBox: "0 0 13 14",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    [
                      h("path", {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M5.7827 2.03938C6.21439 1.54254 6.98582 1.54254 7.41751 2.03938L8.14191 2.87311C8.14557 2.87733 8.15115 2.87935 8.15666 2.87848L9.2475 2.70544C9.89755 2.60232 10.4885 3.09819 10.4998 3.75627L10.5188 4.86059C10.5189 4.86617 10.5219 4.8713 10.5267 4.87418L11.4735 5.4428C12.0378 5.78165 12.1718 6.54136 11.7574 7.05277L11.0622 7.91094C11.0586 7.91528 11.0576 7.92112 11.0594 7.9264L11.4193 8.97061C11.6337 9.59289 11.248 10.261 10.6019 10.3864L9.51762 10.5969C9.51214 10.5979 9.5076 10.6018 9.5056 10.607L9.11004 11.6382C8.87432 12.2527 8.14941 12.5166 7.57382 12.1973L6.60796 11.6616C6.60307 11.6589 6.59714 11.6589 6.59226 11.6616L5.62639 12.1973C5.05081 12.5166 4.3259 12.2527 4.09017 11.6382L3.69462 10.607C3.69262 10.6018 3.68807 10.5979 3.68259 10.5969L2.59836 10.3864C1.95224 10.261 1.56652 9.59289 1.78095 8.97061L2.14079 7.9264C2.14261 7.92112 2.14158 7.91528 2.13806 7.91094L1.44279 7.05277C1.02846 6.54137 1.16241 5.78165 1.72667 5.4428L2.67353 4.87418C2.67831 4.8713 2.68128 4.86617 2.68137 4.86059L2.70038 3.75628C2.71171 3.09819 3.30266 2.60232 3.95272 2.70544L5.04355 2.87848C5.04907 2.87935 5.05464 2.87733 5.0583 2.87311L5.7827 2.03938ZM8.31057 6.5772C8.51885 6.36893 8.51885 6.03124 8.31057 5.82296C8.10229 5.61468 7.76461 5.61468 7.55633 5.82296L6.06678 7.3125L5.6439 6.88962C5.43562 6.68134 5.09794 6.68134 4.88966 6.88962C4.68138 7.0979 4.68138 7.43559 4.88966 7.64387L5.5011 8.25531C5.81352 8.56773 6.32005 8.56773 6.63247 8.25531L8.31057 6.5772Z",
                        fill: "#006B3B",
                        "fill-opacity": "0.906",
                      }),
                    ]
                  ),
                  h(
                    "svg",
                    {
                      width: "13",
                      height: "14",
                      viewBox: "0 0 13 14",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    [
                      h("path", {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M5.15621 4.48971C5.36449 4.28143 5.70218 4.28143 5.91046 4.48971L7.66667 6.24592C8.08323 6.66247 8.08323 7.33785 7.66667 7.75441L5.91046 9.51062C5.70218 9.7189 5.36449 9.7189 5.15621 9.51062C4.94793 9.30234 4.94793 8.96465 5.15621 8.75637L6.91242 7.00016L5.15621 5.24395C4.94793 5.03567 4.94793 4.69799 5.15621 4.48971Z",
                        fill: "#006B3B",
                        "fill-opacity": "0.906",
                      }),
                    ]
                  ),
                ]
              ),
            ],
          }),

          h(SecurityInfoRow, {
            title: "Last Verified at",
            children: [
              h(
                "span",
                {
                  style: {
                    fontWeight: "500",
                    fontSize: "11.2px",
                    color: "rgba(0, 0, 0, 0.88)",
                  },
                },
                "2024-05-06",
              ),
            ],
          }),
        ]
      ),
      h(
        "div",
        {
          style: {
            marginTop: "8px",
            textAlign: "center",
            padding: "8px 0",
            background: "rgba(249, 249, 249, 1)",
            borderBottomLeftRadius: "12px",
          },
        },
        [
          h(
            "span",
            {
              style: {
                color: "rgba(0, 0, 0, 0.61)",
                fontWeight: "400",
                fontSize: "11.2px",
              },
            },
            "Powered by"
          ),
          h("img", {
            src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
            style: {
              width: "12.83px",
              height: "12.83px",
              marginLeft: "5.6px",
              marginRight: "4.2px",
              verticalAlign: "middle",
            },
          }),
          h(
            "span",
            {
              style: {
                color: "rgba(0, 0, 0, 0.88)",
                fontWeight: "600",
                fontSize: "11.2px",
              },
            },
            "OneKey"
          ),
        ]
      ),
    ]
  );
}


function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSecurityInfo, setIsShowSecurityInfo] = useState(false);
  const [securityInfo, setSecurityInfo] = useState<{} | null>(null);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setIsShowSecurityInfo(true);
    if (!securityInfo) {
      setTimeout(() => {
        setSecurityInfo({});
      }, 1500)
    }
  };

  const borderStyle = useMemo(() => {
    return isExpanded ? {
      borderTopLeftRadius: "12px",
      borderBottomLeftRadius: "12px",
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
    } : {
      boxShadow: "0px 8.57px 17.14px 0px rgba(0, 0, 0, 0.09)",
      transition: "transform 0.3s ease-in-out",
      borderRadius: "100px",
    };
  }, [isExpanded]);

  return (
    h('div', {
      id: containerId,
      style: {
          position: "fixed",
          zIndex: 999999,
          top: "20%",
          right: "-146px",
          background: "rgba(255, 255, 255, 1)",
          borderWidth: "0.33px",
          borderColor: "rgba(0, 0, 0, 0.13)",
          borderStyle: "solid",
          boxShadow: "0px 8.57px 17.14px 0px rgba(0, 0, 0, 0.09)",
          transition: "transform 0.3s ease-in-out",
          transform: isExpanded ? "translateX(-146px)" : "translateX(0)",
          ...borderStyle,
        },
      },
      showSecurityInfo && securityInfo ? h(SecurityInfo, { securityInfo, onClose: () => {
        setIsExpanded(false);
        setIsShowSecurityInfo(false);
      } }) : h(IconButton, { onClick: handleClick, isExpanded }),
    )
  )
}

function injectFloatingIcon() {
  if (isInjected) {
    return;
  }

  if (!document.body) {
    return;
  }
  isInjected = true;
  const div = document.createElement('div')
  document.body.appendChild(div)
  render(h(App, {}), document.body, div);
}

const BlackList = [
  /^localhost(:\d+)?$/,
  /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/
];

function isBlacklistedDomain() {
  const hostname = window.location.hostname;
  return !hostname || BlackList.some(pattern => pattern.test(hostname));
}

export function inject() {
  // setTimeout delay required
  setTimeout(() => {
    if (isBlacklistedDomain()) {
      return
    }
    globalThis.addEventListener('DOMContentLoaded', () => {
      injectFloatingIcon();
    });
    injectFloatingIcon();
  }, 2000);
}
