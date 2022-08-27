import React from "react";
import { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { useCardStore } from "../zustand/cardStore";
import { Switch } from "@material-tailwind/react";

export default function NavBar() {
  const storeCards = useCardStore((state) => state.cardsData);
  const storeSetFilter = useCardStore((state) => state.setFilter);
  const storeEditPanel = useCardStore((state) => state.editPanel);
  const [filter, setFilter] = useState("");
  const [labelFilter, setLabelFilter] = useState(["1", "2", "3"]);

  function filterByValue(array, string) {
    return array.filter(function (obj) {
      return obj.content.toLowerCase().includes(string.toLowerCase());
    });
  }

  function filterByLabel(array, labelArray) {
    return array.filter(function (obj) {
      for (var i = 0; i < labelArray.length; i++) {
        if (obj.label.includes(labelArray[i])) {
          return obj;
        }
      }
    });
  }

  const handleFilter = (event) => {
    setFilter(event);
  };

  const handleSwitch = (event) => {
    var newFilter = labelFilter;
    if (labelFilter.includes(event)) {
      newFilter = labelFilter.filter(function (e) {
        return e !== event;
      });
      setLabelFilter(newFilter);
    } else {
      setLabelFilter(newFilter.concat(event));
    }
  };

  useEffect(() => {
    if (filter === "" || filter === null) {
      storeSetFilter(filterByLabel(storeCards.boards, labelFilter));
    } else {
      storeSetFilter(
        filterByValue(filterByLabel(storeCards.boards, labelFilter), filter)
      );
    }
  }, [filter, labelFilter, storeCards, storeEditPanel]); //Remove "storeEditPanel" if you wish to keep cards that had its label changed while label filtering

  return (
    <div>
      <nav className="p-3 bg-[#787db6]  w-[100%] ">
        <div className="flex justify-center items-center">
          <div className="">
            <p className="font-extrabold text-3xl text-[#F5F5F5]">Your Board</p>
          </div>{" "}
          {/* search bar */}
          <form className="ml-5 w-[33%]">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <ImSearch color="#737373" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block px-4 py-3 pl-10 w-full text-sm text-[#737373] bg-[#F5F5F5] rounded-lg focus:ring-0 focus:outline-none "
                placeholder="Search..."
                onChange={(event) => handleFilter(event.target.value)}
                required
              />
            </div>
          </form>
          {/* label search */}
          <div className="flex ml-3 items-center">
            <div className="ml-4">
              <Switch
                id="1"
                color="blue"
                ripple={false}
                defaultChecked
                onChange={(event) => handleSwitch(event.target.id)}
              />
            </div>
            <div className="ml-7">
              <Switch
                id="2"
                color="amber"
                ripple={false}
                defaultChecked
                onChange={(event) => handleSwitch(event.target.id)}
              />
            </div>
            <div className="ml-7">
              <Switch
                id="3"
                color="red"
                ripple={false}
                defaultChecked
                onChange={(event) => handleSwitch(event.target.id)}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
