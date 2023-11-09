import React from 'react'
import { Grid } from "@material-ui/core";

import Delete from './delete'
import Edit from './edit'

const Topic = (props) => {
  const {index, item, complexityTypes, brain, topics, more} = props

  return (
    <div className="my-1 border-solid rounded border border-slate-400">
      <div className="flex justify-between p-3 border-solid border-b border-slate-400">
        <div className="font-bold">{item?.topic?.name}</div>
        <div>
          <Delete index={index} brain={item.brain} />
          <Edit item={item} index={index} complexityTypes={complexityTypes} brain={brain} topics={topics} more={more} />
        </div>
      </div>
      <Grid className="p-2" container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <div className="text-center py-2">Number</div>
              <div className="text-center p-2 border-solid rounded border border-slate-400">{item.number}</div>
            </Grid>
            <Grid item xs={9}>
              <div className="py-2">Complexity</div>
              <div className="p-2 border-solid rounded border border-slate-400">{item.complexity}</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className="text-center py-2">Min</div>
              <div className="text-center p-2 border-solid rounded border border-slate-400">{item.min}</div>
            </Grid>
            <Grid item xs={4}>
              <div className="text-center py-2">Avg</div>
              <div className="text-center p-2 border-solid rounded border border-slate-400">{item.avg}</div>
            </Grid>
            <Grid item xs={4}>
              <div className="text-center py-2">Max</div>
              <div className="text-center p-2 border-solid rounded border border-slate-400">{item.max}</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default Topic
