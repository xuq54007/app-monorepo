let isInjected = false
import { h, render } from 'preact';
import { useState } from 'preact/hooks';



const fetchingStyle = {
  display: 'flex', 
  alignItems: 'center',
  width: '184px',
  borderTopLeftRadius: '12px',
  borderBottomLeftRadius: '12px',
  padding: '8px',
  background: 'rgba(255, 255, 255, 1)',
  boxShadow: '0px 8.57px 17.14px 0px rgba(0, 0, 0, 0.09)',
  transition: 'transform 0.3s ease-in-out',
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
function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    h('div', {
      style: {
        position: 'fixed',
        top: '20%',
        right: '-140px', 
        cursor: 'pointer'
      }
    }, [
      h('div', {
        style: {
          ...fetchingStyle,
          transform: isExpanded ? 'translateX(-140px)' : 'translateX(0)'
        },
        onClick: handleClick
      }, [
        h('img', {
          src: "https://asset.onekey-asset.com/app-monorepo/bb7a4e71aba56b405faf9278776d57d73b829708/favicon.png",
          style: logoStyle
        }),
        h('span', {
          style: textStyle
        }, "Fetching dApp info...")
      ])
    ])
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

  const container = document.createElement('div');
  document.body.appendChild(container);
  render(h(App, {}), container);
}

export function inject() {
  // setTimeout delay required
  setTimeout(() => {
    globalThis.addEventListener('DOMContentLoaded', () => {
      injectFloatingIcon();
    });
    injectFloatingIcon();
  }, 2000);
}
