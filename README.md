# Your Kanban Board

###### Next.js, Tailwindcss, Zustand, react-beautiful-dnd

**Vercel:** https://your-kanban-board-53zssmkcx-patrux08.vercel.app/

## The challenge

```
- Create a responsive page containing a board that handles multiple
cards and multiple statuses.
- We should be able to:
- Drag&drop the cards between the statuses.
- Filter the cards.
- Search the cards.
- Inline card edition.
- Add new cards.
```

## The approach

The code simulates (fetchMockData.js) a DB that holds all kanban cards.
It's assumed that the "DB" have only one table, in which the status of the task (doing, done, backlog...) is defined by a field **"stats"**.
I also assumed that no card should be truly deleted. Deleted cards are marked as "_delete_" and are not fetched by the app.
Other fields include: Id, content and priority.

The whole app is a single page application that fetches the data, display the cards and allows you to drag, create, edit and delete cards.
You can move cards around by dragging them, or use the edit menu to change its status, content or priority.
The deletion is also made via edit menu.

###### Filters

**Search bar** dynamically show cards that contain the inputted text.
The **switches** allows to set which priority flags are displayed. The colors match with the priority tags colors.

###### Oopsies

This is my first time using a Drag & Drop React lib. What made it even harder was finding out they are not optimized to work with Next.js.
A warning will always be displayed on the console, I tried many approaches to fix it, but the non-optimization was hard to beat and was taking too much of my time.
Trying to move cards while filtering may cause some bugs in the react-beautiful-dnd functions. The data is not affected, as it can still be edited via edit panel.
