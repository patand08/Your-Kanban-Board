import React from "react";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
import { useCardStore } from "../zustand/cardStore";

export default function EditCard() {
  const storeCards = useCardStore((state) => state.cardsData);
  const storeSetCards = useCardStore((state) => state.setCards);
  const storeTrigEditCard = useCardStore((state) => state.trigEditCard);
  const storeEditPanel = useCardStore((state) => state.editPanel);
  const storeCloseEdit = useCardStore((state) => state.closeEdit);
  const storeAddCard = useCardStore((state) => state.addCard);

  const [labelOption, setLabelOption] = useState(storeEditPanel.label);
  const [status, setStatus] = useState(storeEditPanel.stats);
  const [editContent, setEditContent] = useState(storeEditPanel.content);
  const [valid, setValid] = useState(true);
  const [forceReload, setForceReload] = useState(true);

  const handleClose = () => {
    storeCloseEdit();
  };

  const handleSubmit = async () => {
    if (storeEditPanel.keySwitch === 1) {
      var newCard = {
        id: (storeCards.boards.length + 1).toString(),
        content: editContent,
        label: labelOption,
        stats: status,
      };
      storeAddCard(newCard);
    } else if (storeEditPanel.keySwitch === 2) {
      var editing = storeCards;
      for (var i = 0; i < editing.boards.length; i++) {
        if (editing.boards[i].id === storeEditPanel.id) {
          editing.boards[i].content = editContent;
          editing.boards[i].label = labelOption;
          editing.boards[i].stats = status;
        }
      }
      storeSetCards(editing);
    } else if (storeEditPanel.keySwitch === 3) {
      var deleting = storeCards;
      for (var i = 0; i < deleting.boards.length; i++) {
        if (deleting.boards[i].id === storeEditPanel.id) {
          deleting.boards[i].stats = "deleted";
        }
      }
      storeSetCards(deleting);
    }
    storeCloseEdit();
  };

  /* prepare removal */
  const setRemoval = () => {
    var deleteCard = storeEditPanel;
    deleteCard.keySwitch = 3;
    storeTrigEditCard(deleteCard);
    setForceReload(!forceReload);
  };

  /* validate  */
  const handleContentChange = (txt) => {
    setEditContent(txt);
  };

  const handleStatus = (sts) => {
    setStatus(sts);
  };

  const handleOption = (num) => {
    setLabelOption(num);
  };

  const setKeySwitch = (num) => {
    if (num === 1) {
      return "Add a card";
    } else if (num === 2) {
      return "Edit card";
    } else {
      return "Delete card?";
    }
  };

  useEffect(() => {
    if (editContent.length >= 5 && editContent.length <= 240) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [editContent, labelOption, forceReload]);

  return (
    <div className="absolute">
      <div className="fixed right-0 top-0 left-0 bottom-0 bg-black/40 z-[20]" />
      <div className="mt-[-10rem] z-[40]">
        <Card className="w-96 z-[40]">
          <div className="flex mt-5 justify-center items-center">
            {/* close */}
            <div className="absolute top-0 right-0 mr-2 mt-2">
              <div
                className="rounded-md p-1 hover:bg-gray-200 hover:cursor-pointer"
                onClick={handleClose}
              >
                <MdOutlineClose size="24px" color="#737373" />
              </div>
            </div>

            <h3 className="text-2xl text-gray-800 font-medium antialiased">
              {setKeySwitch(storeEditPanel.keySwitch)}
            </h3>
          </div>
          <CardBody className="flex flex-col gap-4">
            {storeEditPanel.keySwitch !== 3 && (
              <>
                <div className="flex justify-between relative">
                  <div className="max-w-fit">
                    <label
                      htmlFor="label"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      Priority:
                    </label>
                    <select
                      value={labelOption}
                      onChange={(e) => handleOption(e.target.value)}
                      id="label"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value={"1"}>Low</option>
                      <option value={"2"}>Medium</option>
                      <option value={"3"}>High</option>
                    </select>
                    <label
                      htmlFor="label"
                      className="block mt-4 mb-1 text-sm font-medium text-gray-900"
                    >
                      Status:
                    </label>
                    <select
                      value={status}
                      onChange={(e) => handleStatus(e.target.value)}
                      id="label"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value={"backlog"}>Backlog</option>
                      <option value={"doing"}>Doing</option>
                      <option value={"review"}>To Review</option>
                      <option value={"done"}>Done</option>
                      <option value={"cancel"}>Cancelled</option>
                    </select>
                  </div>
                  <div className="flex flex-col text-sm items-end text-gray-900 ">
                    <p className="font-medium">Characters: </p>
                    <p className="font-medium">{240 - editContent.length}</p>
                    {/* delete */}
                    <div className="absolute bottom-0">
                      <Tooltip content="Delete" placement="left">
                        <div
                          className="rounded-md p-1 hover:bg-gray-200 hover:cursor-pointer"
                          onClick={setRemoval}
                        >
                          <IoTrashBinSharp size="24px" color="#737373" />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full items-start gap-4">
                  <label
                    htmlFor="cardContent"
                    className="block -mb-3 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Card content:
                  </label>
                  <textarea
                    id="cardContent"
                    value={editContent}
                    rows="4"
                    className={
                      "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md " +
                      (valid
                        ? "  border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        : " border-2 border-red-500  focus:outline-none focus:ring focus:border-0 focus:ring-red-700 focus:border-red-700")
                    }
                    onChange={(e) => handleContentChange(e.target.value)}
                  />
                </div>
              </>
            )}
            {storeEditPanel.keySwitch === 3 && (
              <div className="flex flex-col justify-center items-center text-lg font-medium text-gray-700 break-words">
                <p>Deleting a card can not be undone.</p>
                <p>Are you sure?</p>
              </div>
            )}
          </CardBody>
          <CardFooter className=" flex pt-0 mx-5 justify-between">
            <Button variant="outlined" className="w-2/5" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="filled"
              className="w-2/5"
              disabled={!valid}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
