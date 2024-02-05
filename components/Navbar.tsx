'use client';

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import { logout } from './auth/authentication';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout().then(result => {
      if(result.success) {
        router.push('/');
        window.location.reload();
      } else {
        console.log(result.error);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Navbar rounded className='py-8 shadow-sm'>
      <NavbarBrand href="https://github.com/ATErcan/todo-next">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TODO APP</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {user && <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user?.username}</span>
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </DropdownHeader>
          {/* <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem> */}
          {/* <DropdownDivider /> */}
          <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/todos">TODOS</NavbarLink>
        {
          user ? 
          <NavbarLink href="/add-todo">Add Todo</NavbarLink> :
          <>
            <NavbarLink href="/register">Register</NavbarLink>
            <NavbarLink href="/login">Login</NavbarLink>
          </>
        }
      </NavbarCollapse>
    </Navbar>
  );
}
