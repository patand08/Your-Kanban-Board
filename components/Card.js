import React from "react";
import { MdEditNote } from "react-icons/md";
import { Tooltip } from "@material-tailwind/react";
import Label from "./Label";
import { useCardStore } from "../zustand/cardStore";

export default function Card(props) {
  const storeTrigEditCard = useCardStore((state) => state.trigEditCard);

  var editCard = {
    id: "0",
    content: "",
    label: "1",
    stats: "",
    show: true,
    keySwitch: 2,
  };

  const handleEdit = () => {
    editCard.id = props.id;
    editCard.content = props.content;
    editCard.stats = props.stats;
    editCard.label = props.label;
    storeTrigEditCard(editCard);
  };

  return (
    <div className="container my-5">
      <div className="px-5 py-3 bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="relative flex justify-between mb-2">
          <div className="p-1">
            <Label label={props.label} />
          </div>
          <Tooltip content="Edit" placement="right">
            <div
              className="rounded-md p-1 hover:bg-gray-200 hover:cursor-pointer"
              onClick={handleEdit}
            >
              <MdEditNote size="24px" color="#737373" />
            </div>
          </Tooltip>
        </div>
        {/* card body */}
        <div className="my-2 px-1">
          <p className="font-normal text-[#737373] break-words display-linebreak">
            {props.content}
          </p>
        </div>
      </div>
    </div>
  );
}
