import React from "react";
import { useState, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { MdAddCircleOutline } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import Card from "./Card";
import { useCardStore } from "../zustand/cardStore";

export default function CardList(props) {
  const storeCards = useCardStore((state) => state.cardsData);
  const storeEditPanel = useCardStore((state) => state.editPanel);
  const storeTrigEditCard = useCardStore((state) => state.trigEditCard);
  const storeFilteredCards = useCardStore((state) => state.filteredCards);

  const [boardCards, setBoardCards] = useState([]);

  var newCard = {
    id: (storeCards.boards.length + 1).toString(),
    content: "",
    label: "1",
    stats: props.stats,
    show: true,
    keySwitch: 1,
  };

  const handleEdit = () => {
    storeTrigEditCard(newCard);
  };

  //selects only the category card
  const fetchBoardCards = (stats) => {
    var res = storeFilteredCards.filter(function (c) {
      return c.stats === stats;
    });
    setBoardCards(res);
  };

  useEffect(() => {
    fetchBoardCards(props.stats);
  }, [storeFilteredCards, storeCards, storeEditPanel]);

  return (
    <Droppable droppableId={props.stats} key={props.stats}>
      {(provided, snapshot) => {
        return (
          <div className="container self-start w-[100%] h-100% flex flex-col">
            <div className="pt-3 items-center justify-center flex flex-col">
              <p className="pb-2 text-2xl text-[#737373] font-medium antialiased ">
                {props.title}
              </p>
              <span className="w-[80%] p-0.5  bg-gray-300 rounded-lg" />
              <Tooltip content="Add card" placement="left-start">
                <div
                  className="mt-2 max-w-fit rounded-md p-1 hover:bg-gray-300 hover:cursor-pointer"
                  onClick={handleEdit}
                >
                  <MdAddCircleOutline size="24px" color="#737373" />
                </div>
              </Tooltip>
            </div>

            {/* body */}

            <div {...provided.droppableProps} ref={provided.innerRef}>
              {boardCards.map((c, index) => {
                return (
                  <Draggable key={c.id} draggableId={c.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Card
                            id={c.id}
                            label={c.label}
                            stats={c.stats}
                            content={c.content}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}
