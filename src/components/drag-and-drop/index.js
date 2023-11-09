import React, {useState} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {reorder, move, getItemStyle, getListStyle} from './functions'
import {Item1} from './items'
import Title from './title'
import items from '../../json/drag-and-drop.json'

const DragAndDrop = () => {

  items = items.map(item => {
    item['content'] = <Item1 key={item.id} {...item} />
    return item
  })

  const initialState = {
    first: items.filter(item => item.category === 'todo'),
    second: items.filter(item => item.category === 'inProgress'),
    third: items.filter(item => item.category === 'codeReview'),
    fourth: items.filter(item => item.category === 'done')
  }

  const id2List = {
    droppable1: 'first',
    droppable2: 'second',
    droppable3: 'third',
    droppable4: 'fourth'
  }
  const getList = id => state[id2List[id]]
  const [state, setItems] = useState(initialState)

  const onDragEnd = result => {
    const {source, destination} = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      )

      let newState = {items}

      if (source.droppableId === 'droppable1') {
        newState = {first: items}
      }
      if (source.droppableId === 'droppable2') {
        newState = {second: items}
      }
      if (source.droppableId === 'droppable3') {
        newState = {third: items}
      }
      if (source.droppableId === 'droppable4') {
        newState = {fourth: items}
      }

      setItems({...state, ...newState})
    } else {
      const newState = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      )

      let replacedState = Object.keys(newState).map(key => {
        const newKey = id2List[key] || key
        return {[newKey]: newState[key]}
      }).reduce((a, b) => Object.assign({}, a, b));

      setItems({...state, ...replacedState})
    }
  }

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row w-full space-x-2">
          <div className="w-1/4">
            <Title title="To do" total={state.first.length} />
            <Droppable droppableId="droppable1">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="w-full space-y-2"
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {state.first.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          className="p-0 m-0 select-none"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="w-1/4">
            <Title title="In progress" total={state.second.length} />
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="w-full space-y-2"
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {state.second.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          className="p-0 m-0 select-none"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="w-1/4">
            <Title title="Code review" total={state.third.length} />
            <Droppable droppableId="droppable3">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="w-full space-y-2"
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {state.third.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          className="p-0 m-0 select-none"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="w-1/4">
            <Title title="Done" total={state.fourth.length} />
            <Droppable droppableId="droppable4">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="w-full space-y-2"
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {state.fourth.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          className="p-0 m-0 select-none"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default DragAndDrop
