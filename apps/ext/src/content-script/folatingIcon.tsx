let isInjected = false
import { h, render } from 'preact';
import { useMemo, useState } from 'preact/hooks';

const logoStyle = {
  width: "28px",
  height: "28px",
};

const textStyle = {
  color: "rgba(0, 0, 0, 0.61)",
  fontSize: "13px",
  marginLeft: "8px",
};

function IconButton({ isExpanded, onClick }: { isExpanded: boolean, onClick: () => void }) {
  const [showCloseButton, setIsShowCloseButton] = useState(false);
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
        },
        onClick,
        onMouseEnter: () => setIsShowCloseButton(true),
        onMouseLeave: () => setIsShowCloseButton(false),
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
            bottom: "-20px",
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
            console.log("here");
          },
        }),
      ]
    ),
  ];
}

function SecurityInfo({ securityInfo }: { securityInfo: {} }) {
  return h('div', {
    style: {
      display: 'flex',
      flexDirection: "column",
      width: '234px',
      height: '153px',
      borderTopLeftRadius: '12px',
      borderBottomLeftRadius: '12px',
      padding: '8px',
      background: 'rgba(255, 255, 255, 1)',
      boxShadow: '0px 8.57px 17.14px 0px rgba(0, 0, 0, 0.09)',
      transition: 'transform 0.3s ease-in-out',
    }
  }, [
    h('div', {
      style: {
        display: 'flex',
        flexDirection: "column",
        gap: '8px'
      }
    }, [
      h('div', {
        style: {
          alignItems: 'center',
          justifyItems: 'space-between'
        }
      }, [
        h('span', {}, 'Uniswap'),
        h('span', {}, 'x')
      ]),
      h('div', {
        style: {
          alignItems: 'center',
          justifyItems: 'space-between'
        }
      }, [
        h('span', {}, 'Uniswap'),
        h('span', {}, 'x')
      ]),
      h('div', {
        style: {
          alignItems: 'center',
          justifyItems: 'space-between'
        }
      }, [
        h('span', {}, 'Uniswap'),
        h('span', {}, 'x')
      ]),
      h('div', {
        style: {
          alignItems: 'center',
          justifyItems: 'space-between'
        }
      }, [
        h('span', {}, 'Uniswap'),
        h('span', {}, 'x')
      ])
    ]),
    h('div', {}, 'Powered by')
  ])
}


function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [securityInfo, setSecurityInfo] = useState<{} | null>(null);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setTimeout(() => {
      setSecurityInfo({})
    }, 1500)
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
      style: {
        position: "fixed",
        zIndex: 999999,
        top: "20%",
        right: "-156px",
        background: "rgba(255, 255, 255, 1)",
        borderWidth: "0.33px",
        borderColor: "rgba(0, 0, 0, 0.13)",
        padding: "8px",
        borderStyle: "solid",
        boxShadow: "0px 8.57px 17.14px 0px rgba(0, 0, 0, 0.09)",
        transition: "transform 0.3s ease-in-out",
        transform: isExpanded ? "translateX(-156px)" : "translateX(0)",
        ...borderStyle,
      },
    },
      securityInfo ? h(SecurityInfo, { securityInfo }) : h(IconButton, { onClick: handleClick, isExpanded })
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
  render(h(App, {}), document.body);
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
