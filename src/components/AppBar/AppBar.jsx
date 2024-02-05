import {
  Navbar,
  Typography,
  Button,
  Input,
  Badge,
} from "@material-tailwind/react";

import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../context/UserContext";
import { MdOutlineFavorite } from "react-icons/md";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../context/CartContext";
import { FavContext } from "../../context/WishlistContext";
import { FaGear } from "react-icons/fa6";

import { ProductContext } from "../../context/ProductsContext";

const AppBar = () => {
  const { token, setToken } = useContext(userContext);
  const { cartNumber, setCartNumber } = useContext(CartContext);
  const { NumberOfFav, setNumberOfFav } = useContext(FavContext);
  const { searchQuery, setSearchQuery } = useContext(ProductContext);

  const { name } = jwtDecode(token);
  const navigate = useNavigate();

  function logOut() {
    setCartNumber(0);
    setNumberOfFav(0);
    setToken(null);
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <Navbar
        variant="gradient"
        className=" fixed top-0  z-50 bg-white px-[0px] py-3 min-w-full">
          <div className="sm:container px-5">





<div className="flex  md:hidden flex-wrap items-center justify-between gap-y-4 text-white">

      <Typography
            onClick={() => {
              navigate("/");
            }}
            as="a"
            href="#"
            variant="h6"
            className=" cursor-pointer py-1.5   text-blueColor xsm:text-[20px] sm:text-[25px]">
            Shopping <span className="text-yellowColor">Hup</span>
          </Typography>

          <div className=" flex items-center gap-2 md:mr-4  ">
            <NavLink to="/wishlist"className="">
              <Badge
                id="favIconNumber"
                className="bg-yellowColor "
                size="sm"
                content={NumberOfFav}>
                <Button
                size="sm"
                  // onClick={() => navigate("/wishlist")}
                  className="bg-transparent">
                  <MdOutlineFavorite className="text-blueColor text-[20px]" />
                </Button>
              </Badge>
            </NavLink>
            <NavLink to= "/cart" className="">
              <Badge
                id="cartIconNumber"
                className="bg-yellowColor"
                size="sm"
                content={cartNumber}>
                <Button
                 size="sm"
                  // onClick={() => navigate("/cart")}
                  className="bg-transparent">
                  <TiShoppingCart className="text-blueColor text-[20px]" />
                </Button>
              </Badge>
            </NavLink>

            <Menu>
              <MenuHandler className="bg-blueColor text-yellowColor rounded-full w-[10px]  h-[40px] flex items-center justify-center">
                <Button className="text-[10px]">
                  {token && name?.split("").slice(0, 1).join("")}
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem className="text-capitalize">{token && name}</MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/settings" className="flex gap-1">
                    Edite Information <FaGear className="fa-spin" />
                  </Link>
                </MenuItem>

                <hr className="my-3" />
                <MenuItem onClick={logOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </div>


          <div className="relative flex w-full gap-2 md:w-max ">
            <Input
              type="search"
              label="Search By Title..."
              className="pr-20"
              containerProps={{
                className: "min-w-[320px] text-blueColor",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute  top-1 right-1 rounded  ">
              Search
            </Button>
          </div>

</div>




       
        {/* ************************************************************************* */}
        <div className="md:flex  flex-wrap items-center justify-between gap-y-4 text-white hidden">

          <Typography
            onClick={() => {
              navigate("/");
            }}
            as="a"
            href="#"
            variant="h6"
            className=" cursor-pointer py-1.5   text-blueColor text-[25px]">
            Shopping <span className="text-yellowColor">Hup</span>
          </Typography>
          {/* ************************************************************************* */}

          <div className="relative flex w-full gap-2 md:w-max ">
            <Input
              type="search"
              label="Search By Title..."
              className="pr-20"
              containerProps={{
                className: "min-w-[320px] text-blueColor",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute  top-1 right-1 rounded  ">
              Search
            </Button>
          </div>
          {/* ************************************************************************* */}
          <div className=" flex gap-1 md:mr-4 ">
            <NavLink to="/wishlist" className="mx-2">
              <Badge
                id="favIconNumber"
                className="bg-yellowColor "
                content={NumberOfFav}>
                <Button
                  // onClick={() => navigate("/wishlist")}
                  className="bg-transparent">
                  <MdOutlineFavorite className="text-blueColor text-[20px]" />
                </Button>
              </Badge>
            </NavLink>
            <NavLink to= "/cart"className="mx-2">
              <Badge
                id="cartIconNumber"
                className="bg-yellowColor"
                content={cartNumber}>
                <Button
                  // onClick={() => navigate("/cart")}
                  className="bg-transparent">
                  <TiShoppingCart className="text-blueColor text-[20px]" />
                </Button>
              </Badge>
            </NavLink>

            <Menu>
              <MenuHandler className="bg-blueColor text-yellowColor rounded-full w-[40px]  h-[40px] flex items-center justify-center">
                <Button className="text-[30px]">
                  {token && name?.split("").slice(0, 1).join("")}
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem className="text-capitalize">{token && name}</MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="/settings" className="flex gap-1">
                    Edite Information <FaGear className="fa-spin" />
                  </Link>
                </MenuItem>

                <hr className="my-3" />
                <MenuItem onClick={logOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
          
        </div>


















        </div>
      </Navbar>
    </>
  );
};

export default AppBar;
