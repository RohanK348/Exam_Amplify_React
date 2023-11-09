import React, {useState, useReducer} from 'react'
import {initialState, reducer} from './reducer'
import Profile from './profile'
import Settings from './settings'
import Options from './options'
import Finish from './finish'
import '../../css/components/steps.css'

const Index = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [openTab, setOpenTab] = useState(0)

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <div className="flex flex-wrap flex-col w-full tabs">
          <div className="flex flex-col lg:flex-wrap lg:flex-row w-full mb-8">
            {state.map((tab, key) => (
              <div
                key={key}
                className="flex w-full lg:w-1/4 items-center justify-center">
                <button
                  disabled={tab.disabled}
                  onClick={() => {
                    setOpenTab(tab.index)
                  }}
                  className={`btn btn-default btn-block ${
                    openTab === tab.index
                      ? 'bg-blue-500 text-white'
                      : tab.valid
                      ? 'bg-green-500 text-white'
                      : ''
                  }`}
                  type="button">
                  {tab.title}
                </button>
              </div>
            ))}
          </div>
          <div className={`tab-content ${openTab === 0 ? 'block' : 'hidden'}`}>
            <Profile
              index={0}
              isLast={false}
              dispatch={dispatch}
              setOpenTab={setOpenTab}
            />
          </div>
          <div className={`tab-content ${openTab === 1 ? 'block' : 'hidden'}`}>
            <Settings
              index={1}
              isLast={false}
              dispatch={dispatch}
              setOpenTab={setOpenTab}
            />
          </div>
          <div className={`tab-content ${openTab === 2 ? 'block' : 'hidden'}`}>
            <Options
              index={2}
              isLast={false}
              dispatch={dispatch}
              setOpenTab={setOpenTab}
            />
          </div>
          <div className={`tab-content ${openTab === 3 ? 'block' : 'hidden'}`}>
            <Finish
              index={3}
              isLast={true}
              dispatch={dispatch}
              setOpenTab={setOpenTab}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
