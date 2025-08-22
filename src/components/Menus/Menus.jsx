/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../../Hooks/useOutSideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 20px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  list-style: none;
  margin: 0;
  padding: 5px;
  border: 1px solid rgba(62, 87, 129, 0.9);
  border-radius: 10px;
  background-color: var(--color-blue-800);
  box-shadow: var(--shadow-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  transition: all 0.2s;
  color: var(--color-grey-200);
  opacity: 0.8;

  @media (min-width: 600px) {
    font-size: 1rem;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  cursor: pointer;

  border-top: ${(props) =>
    props.$category === "log-out"
      ? "2px solid rgba(62, 87, 129, 0.9)"
      : "none"};

  &:hover {
    background-color: var(--color-blue-600);
    opacity: 1;
    text-decoration: ${(props) =>
      props.$category === "link" ? "underline" : "none"};
  }

  & svg {
    width: 1rem;
    height: 1rem;
    color: var(--color-grey-200);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id, type = "button", children }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation(); // stop the event flow from coming further
    // special tech: "closest("button")" --> find closest button to where click happened
    // getBoundingClientRect() ---> get the coordinates of "button" on the screen
    const rect = e.target.closest(type).getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x - 80,
      y: rect.y + rect.height,
    });
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <>
      {children ? (
        cloneElement(children, { onClick: handleClick })
      ) : (
        <StyledToggle onClick={handleClick}>
          <HiEllipsisVertical />
        </StyledToggle>
      )}
    </>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);
  // const ref = useOutsideClick(close);
  const ref = useOutsideClick(close, false); // by default true --> capturing mode

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, category, onClick, disabled = false }) {
  const { close } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton
        onClick={handleClick}
        $category={category}
        disabled={disabled}
      >
        <span>{children}</span>
        {icon}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
