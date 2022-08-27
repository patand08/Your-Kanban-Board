import React from "react";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CardList from "./CardList";
import { useCardStore } from "../zustand/cardStore";
import fetchCards from "./../api/fetchMockData";
import EditCard from "./EditCard";
import { PulseLoader } from "react-spinners";

export default function Board() {
  const storeCards = useCardStore((state) => state.cardsData);
  const storeSetCards = useCardStore((state) => state.setCards);
  const storeEditPanel = useCardStore((state) => state.editPanel);
  const storeColumns = useCardStore((state) => state.columns);
  const storeFilteredCards = useCardStore((state) => state.filteredCards);

  const [init, setInit] = useState(true);
  const [colTrack, setColTrack] = useState(storeColumns);
  const [load, setLoad] = useState(false);

  //drag
  const trackColumns = () => {
    var newTrack = storeColumns;
    newTrack.map((e) => {
      e.items = [];
      storeFilteredCards.map((c) => {
        if (c.stats === e.stats) {
          e.items.push(c.id);
        }
      });
    });
    setColTrack(newTrack);
  };

  const onDragEnd = (result, colTrack) => {
    if (!result.destination) return;
    trackColumns();
    const { source, destination } = result;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    if (source.droppableId !== destination.droppableId) {
      setLoad(true);
      //Get the cards ids
      const sourceColumn = colTrack.filter(function (obj) {
        return obj.stats.includes(source.droppableId);
      });
      const destColumn = colTrack.filter(function (obj) {
        return obj.stats.includes(destination.droppableId);
      });
      const cutThis = sourceColumn[0].items[source.index];
      const insertAfter = destColumn[0].items[destination.index - 1];
      //isolate and modify the card
      var removed = storeCards.boards.filter((e) => e.id === cutThis);
      removed[0].stats = destination.droppableId;
      //inset back into array
      var allCards = storeCards.boards.filter((e) => e.id !== cutThis);
      var globalIndex = allCards.findIndex((a) => a.id === insertAfter);
      allCards.splice(globalIndex + 1, 0, removed[0]);
      //replace old order
      var newCards = {
        boards: allCards,
      };
      storeSetCards(newCards);
    } else {
      const column = colTrack.filter(function (obj) {
        return obj.stats.includes(source.droppableId);
      });
      const cutThis = column[0].items[source.index];
      const insertAfter = column[0].items[destination.index];
      //isolate and modify the card
      var removed = storeCards.boards.filter((e) => e.id === cutThis);
      removed[0].stats = destination.droppableId;
      //inset back into array
      var allCards = storeCards.boards.filter((e) => e.id !== cutThis);
      var globalIndex = allCards.findIndex((a) => a.id === insertAfter);
      allCards.splice(globalIndex + 1, 0, removed[0]);
      //replace old order
      var newCards = {
        boards: allCards,
      };
      storeSetCards(newCards);
      setLoad(false);
    }
  };

  useEffect(() => {
    if (init) {
      storeSetCards(fetchCards);
      setInit(false);
    }
    setLoad(false);
  }, [storeCards, colTrack]);

  return (
    <DragDropContext onDragEnd={(res) => onDragEnd(res, colTrack)}>
      <div className="flex justify-center my-2">
        {load && <PulseLoader color="#737373" size={16} />}
        {!load && <div className="mt-5" />}
      </div>
      <div className="flex items-center justify-center min-h-screen max-h-fit bg-scroll ">
        {storeEditPanel.show === true && <EditCard />}

        <div className="justify-center self-start flex min-w-full ">
          <div className="w-full grid mx-5 mb-5 px-5 grid-cols-5 gap-4 bg-[#F5F5F5] min-h-screen max-h-fit content-start rounded-md">
            {storeColumns.map(({ title, stats, id }) => {
              return (
                <CardList key={stats} title={title} stats={stats} id={id} />
              );
            })}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
