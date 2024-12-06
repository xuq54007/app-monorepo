let isInjected = false
import { h, render } from 'preact';
import { useState } from 'preact/hooks';



const fetchingStyle = {
  display: "flex",
  alignItems: "center",
  width: "184px",
  borderTopLeftRadius: "12px",
  borderBottomLeftRadius: "12px",
  padding: "8px",
  borderWidth: "1px",
  borderColor: "rgba(0, 0, 0, 0.13)",
  borderStyle: "solid",
  background: "rgba(255, 255, 255, 1)",
  boxShadow: "0px 8.57px 17.14px 0px rgba(0, 0, 0, 0.09)",
  transition: "transform 0.3s ease-in-out",
};

const logoStyle = {
  width: '28px',
  height: '28px'
};

const textStyle = {
  color: 'rgba(0, 0, 0, 0.61)',
  fontSize: '13px',
  marginLeft: '8px'
};

const container = document.createElement('div');

function IconButton({ isExpanded, onClick }: { isExpanded: boolean, onClick: () => void }) {
  const [showCloseButton, setIsShowCloseButton] = useState(false);
  return [
    h('div', {
      style: {
        ...fetchingStyle,
        position: 'relative',
        cursor: 'pointer'
      },
      onClick,
      onMouseEnter: () => setIsShowCloseButton(true),
      onMouseLeave: () => setIsShowCloseButton(false)
    }, [
      h('img', {
        src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
        style: logoStyle
      }),
      h('span', {
        style: textStyle
      }, "Fetching dApp info..."),
      h('div', {
        style: {
          position: 'absolute',
          left: '8px',
          bottom: '-24px',
          padding: '4px',
          background: '#fff',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: showCloseButton ? 1 : 0,
          transition: 'opacity 0.2s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        onClick: () => {
          container.remove();
          isInjected = false;
        }
      }, '×')
    ])
  ]
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

  return (
    h('div', {
      style: {
        position: 'fixed',
        zIndex: 999999,
        top: '20%',
        right: '-155px',
        transform: isExpanded ? 'translateX(-155px)' : 'translateX(0)'
      }
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

  document.body.appendChild(container);
  render(h(App, {}), container);
}

const BlackList = [
  /^localhost(:\d+)?$/,
  /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/
];

function isBlacklistedDomain() {
  const hostname = window.location.hostname;
  return BlackList.some(pattern => pattern.test(hostname));
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
